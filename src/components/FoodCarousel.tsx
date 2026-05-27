import { useState, useEffect, useCallback, useRef } from "react";

const dishes = [
  {
    id: 1,
    name: "Jollof Rice & Chicken",
    description: "Classic Nigerian party-style jollof rice served with grilled chicken. 750ml plate.",
    price: "From ₦3,250",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587823/bwbnvqxpsnrmr0cyaxetf70mf4_result_0_by0j7l.png",
  },
  {
    id: 2,
    name: "Fried Rice & Chicken",
    description: "Classic Nigerian-style fried rice served with grilled chicken. 750ml plate.",
    price: "From ₦3,250",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587823/p4keyvqxfxrmr0cyaxg9j4ktrg_result_0_ac6teb.png",
  },
  {
    id: 3,
    name: "Efo Riro & Swallow",
    description: "Authentic Nigerian efo riro, cooked with assorted meat and fish, served with your choice of swallow.",
    price: "From ₦2,850",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587824/1000522392_j1amdk.png",
  },
  {
    id: 4,
    name: "Beef Jollof Pasta",
    description: "Spaghetti cooked in a rich, thick tomato beef sauce with bold Nigerian seasoning.",
    price: "₦3,500",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587823/z4qzhancznrmy0cyaxka3nkzvg_result_0_lwudri.png",
  },
  {
    id: 5,
    name: "Egusi Soup & Swallow",
    description: "Rich Nigerian egusi soup with assorted meats and fresh vegetables. Served with your choice of swallow.",
    price: "From ₦2,850",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587824/vn9tdbskshrmy0cyaxd8cnf70g_result_0_texrlg.png",
  },
  {
    id: 6,
    name: "White Rice & Sauce",
    description: "Perfectly cooked white rice served with rich, flavorful Nigerian stew.",
    price: "₦2,500",
    image: "https://res.cloudinary.com/dx3k7hbnc/image/upload/v1779587822/1000522443_imgupscaler.ai_Sharpener_2K.png_rvblsh.png",
  },
];

const ORBIT_COUNT = dishes.length;

function getOrbitPosition(index: number, total: number, offsetAngle: number) {
  const angle = ((index / total) * 360 + offsetAngle + 90) * (Math.PI / 180);
  const rx = 45;
  const ry = 42;
  const x = 50 + rx * Math.cos(angle);
  const y = 50 + ry * Math.sin(angle);
  return { x, y };
}

export default function FoodCarousel() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const [orderOpen, setOrderOpen] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const autoRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentAngleRef = useRef(0);

  const animateToAngle = useCallback((from: number, to: number, onDone: () => void) => {
    const duration = 620;
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      const angle = from + (to - from) * eased;
      currentAngleRef.current = angle;
      setOrbitAngle(angle);
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(step);
      } else {
        onDone();
      }
    }
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(step);
  }, []);

  const goTo = useCallback((nextIndex: number, dir: "next" | "prev") => {
    if (isAnimating) return;
    setIsAnimating(true);
    const step = 360 / ORBIT_COUNT;
    const delta = dir === "next" ? -step : step;
    const newAngle = currentAngleRef.current + delta;
    animateToAngle(currentAngleRef.current, newAngle, () => {
      setCurrent(nextIndex);
      setIsAnimating(false);
    });
  }, [isAnimating, animateToAngle]);

  const next = useCallback(() => {
    goTo((current + 1) % dishes.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + dishes.length) % dishes.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    autoRef.current = setInterval(next, 4500);
    return () => { if (autoRef.current) clearInterval(autoRef.current); };
  }, [next]);

  useEffect(() => {
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, []);

  const dish = dishes[current];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── ORBITAL CAROUSEL ── */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "480px",
          margin: "0.6rem 0 auto",
          aspectRatio: "1 / 0.85",
        }}
      >
        {/* Dashed orbit ellipse */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <ellipse
            cx="50" cy="50"
            rx="45" ry="42"
            fill="none"
            stroke="rgba(232,144,10,0.2)"
            strokeWidth="0.4"
            strokeDasharray="1.8 1.4"
          />
        </svg>

        {/* Satellite dishes */}
        {dishes.map((d, i) => {
          const pos = getOrbitPosition(i, dishes.length, orbitAngle);
          const isActive = i === current;
          return (
            <button
              key={d.id}
              onClick={() => {
                if (!isActive && !isAnimating) {
                  const diff = (i - current + dishes.length) % dishes.length;
                  const dir = diff <= dishes.length / 2 ? "next" : "prev";
                  const steps = dir === "next" ? diff : dishes.length - diff;
                  const stepDeg = 360 / ORBIT_COUNT;
                  const delta = dir === "next" ? -stepDeg * steps : stepDeg * steps;
                  const newAngle = currentAngleRef.current + delta;
                  setIsAnimating(true);
                  animateToAngle(currentAngleRef.current, newAngle, () => {
                    setCurrent(i);
                    setIsAnimating(false);
                  });
                }
              }}
              aria-label={`View ${d.name}`}
              style={{
                position: "absolute",
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
                zIndex: isActive ? 3 : 2,
                background: "none",
                border: "none",
                padding: 0,
                cursor: isActive ? "default" : "pointer",
              }}
            >
              <div style={{
                width: isActive ? "clamp(100px, 20vw, 145px)" : "clamp(36px, 7.5vw, 54px)",
                height: isActive ? "clamp(100px, 20vw, 145px)" : "clamp(36px, 7.5vw, 54px)",
                borderRadius: "50%",
                overflow: "hidden",
                border: isActive ? "3px solid #E8900A" : "2px solid rgba(232,144,10,0.3)",
                boxShadow: isActive
                  ? "0 0 0 6px rgba(232,144,10,0.12), 0 12px 40px rgba(0,0,0,0.5)"
                  : "0 4px 16px rgba(0,0,0,0.4)",
                transition: "width 0.5s cubic-bezier(0.34,1.56,0.64,1), height 0.5s cubic-bezier(0.34,1.56,0.64,1), border 0.3s ease, box-shadow 0.3s ease",
                background: "#181f19",
              }}>
                <img
                  src={d.image}
                  alt={d.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    filter: isActive ? "none" : "brightness(0.6) saturate(0.75)",
                    transition: "filter 0.4s ease",
                  }}
                />
              </div>
            </button>
          );
        })}

        {/* Left arrow */}
        <button
          onClick={prev}
          aria-label="Previous dish"
          style={{
            position: "absolute",
            left: "-6px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(17,20,17,0.85)",
            border: "1px solid rgba(232,144,10,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#F9F6F1",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E8900A";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,144,10,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,144,10,0.3)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,20,17,0.85)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M7 1.5L3 5.5L7 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Right arrow */}
        <button
          onClick={next}
          aria-label="Next dish"
          style={{
            position: "absolute",
            right: "-6px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "rgba(17,20,17,0.85)",
            border: "1px solid rgba(232,144,10,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#F9F6F1",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "#E8900A";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(232,144,10,0.15)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(232,144,10,0.3)";
            (e.currentTarget as HTMLButtonElement).style.background = "rgba(17,20,17,0.85)";
          }}
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
            <path d="M4 1.5L8 5.5L4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* ── DISH DETAILS ── */}
      <div
        style={{
          textAlign: "center",
          maxWidth: "480px",
          margin: "3.4rem auto 0.75rem",
          opacity: isAnimating ? 0.4 : 1,
          transform: isAnimating ? "translateY(6px)" : "translateY(0)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {/* Counter */}
        <div style={{
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "#E8900A",
          marginBottom: "0.4rem",
        }}>
          {`${String(current + 1).padStart(2, "0")} / ${String(dishes.length).padStart(2, "0")}`}
        </div>

        {/* Name */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(1.3rem, 4vw, 1.9rem)",
          fontWeight: 700,
          color: "#F9F6F1",
          lineHeight: 1.2,
          marginBottom: "0.4rem",
        }}>
          {dish.name}
        </h3>

        {/* Divider */}
        <div style={{
          width: "28px",
          height: "2px",
          background: "#E8900A",
          margin: "0 auto 0.5rem",
        }} />

        {/* Description */}
        <p style={{
          fontSize: "0.8rem",
          color: "rgba(249,246,241,0.55)",
          lineHeight: 1.65,
          marginBottom: "0.5rem",
          padding: "0 1rem",
        }}>
          {dish.description}
        </p>

        {/* Price */}
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "1.4rem",
          fontWeight: 700,
          color: "#2A6B3C",
        }}>
          {dish.price}
        </div>
      </div>

      
     {/* ── CTAs ── */}
 {/* ── CTAs ── */}
      <div style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
      }}>

        <a
          href="#menu"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            color: "#F9F6F1",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "0.875rem 2rem",
            borderRadius: "2px",
            border: "1px solid rgba(249,246,241,0.25)",
            textDecoration: "none",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#F9F6F1")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.25)")}
        >
          Explore Menu
        </a>

        <div style={{ position: "relative" }}>
          <button
            onClick={() => setOrderOpen(!orderOpen)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              background: "#2A6B3C",
              color: "#F9F6F1",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              padding: "0.875rem 2rem",
              borderRadius: "2px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Place an Order
            <svg
              width="10" height="10" viewBox="0 0 10 10" fill="none"
              style={{ transform: orderOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.3s ease" }}
            >
              <path d="M1 3L5 7L9 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {orderOpen && (
            <div style={{
              position: "absolute",
              bottom: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#181f19",
              border: "1px solid rgba(42,107,60,0.25)",
              borderRadius: "2px",
              minWidth: "220px",
              overflow: "hidden",
              zIndex: 100,
              animation: "fadeUp 0.2s ease",
            }}>
              <a
                href="https://store.chowdeck.com/surulere/restaurants/vip-buka-idi-orodx93ut"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", padding: "0.875rem 1.25rem",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                  fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F9F6F1", textDecoration: "none",
                  borderBottom: "1px solid rgba(42,107,60,0.2)", transition: "background 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(42,107,60,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Order on Chowdeck
              </a>
              <a
                href="https://wa.me/2347059653297"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "block", padding: "0.875rem 1.25rem",
                  fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem",
                  fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: "#F9F6F1", textDecoration: "none", transition: "background 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(42,107,60,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Send us a Message
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}