import { useState, useEffect, useCallback } from "react";

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
    description: "Nigerian egusi soup made with ground melon seeds, leafy vegetables, and assorted ingredients. Served with your choice of swallow.",
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

export default function FoodCarousel() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [orderOpen, setOrderOpen] = useState(false);

  const goTo = useCallback((index: number, dir: "next" | "prev") => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 400);
  }, [animating]);

  const next = useCallback(() => {
    goTo((current + 1) % dishes.length, "next");
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo((current - 1 + dishes.length) % dishes.length, "prev");
  }, [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, 4500);
    return () => clearInterval(timer);
  }, [next]);

  const dish = dishes[current];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── MAIN BLOCK: Image Left · Details Right ── */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "0",
        borderRadius: "4px",
        overflow: "hidden",
        border: "1px solid rgba(42,107,60,0.15)",
        marginBottom: "2rem",
      }}
      className="carousel-grid"
      >

        {/* LEFT — Large Image */}
        <div style={{
          position: "relative",
          aspectRatio: "1 / 1",
          overflow: "hidden",
          background: "#181f19",
        }}>
          <img
            key={dish.id}
            src={dish.image}
            alt={dish.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "next" ? "scale(1.04)" : "scale(0.97)"
                : "scale(1)",
              transition: "opacity 0.45s ease, transform 0.45s ease",
              display: "block",
            }}
          />

          {/* Dark gradient overlay at bottom */}
          <div style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(17,20,17,0.7) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {/* Arrow buttons at bottom of image */}
          <div style={{
            position: "absolute",
            bottom: "14px",
            left: "14px",
            display: "flex",
            gap: "8px",
          }}>
            <button
              onClick={prev}
              aria-label="Previous dish"
              style={{
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(17,20,17,0.75)",
                border: "1px solid rgba(249,246,241,0.15)",
                borderRadius: "2px",
                cursor: "pointer",
                color: "#F9F6F1",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M8 1L3 6L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
            <button
              onClick={next}
              aria-label="Next dish"
              style={{
                width: "34px",
                height: "34px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(17,20,17,0.75)",
                border: "1px solid rgba(249,246,241,0.15)",
                borderRadius: "2px",
                cursor: "pointer",
                color: "#F9F6F1",
                transition: "border-color 0.2s ease",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M4 1L9 6L4 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Dot indicators bottom right */}
          <div style={{
            position: "absolute",
            bottom: "18px",
            right: "14px",
            display: "flex",
            gap: "5px",
            alignItems: "center",
          }}>
            {dishes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                aria-label={`Go to dish ${i + 1}`}
                style={{
                  width: i === current ? "18px" : "5px",
                  height: "5px",
                  borderRadius: "3px",
                  background: i === current ? "#E8900A" : "rgba(249,246,241,0.35)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Details Panel */}
        <div style={{
          background: "#181f19",
          padding: "2rem 1.75rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderLeft: "1px solid rgba(42,107,60,0.15)",
          opacity: animating ? 0 : 1,
          transform: animating
            ? direction === "next" ? "translateY(10px)" : "translateY(-10px)"
            : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.4s ease",
        }}>

          {/* Counter */}
          <div style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#E8900A",
            marginBottom: "1rem",
          }}>
            {`${String(current + 1).padStart(2, "0")} / ${String(dishes.length).padStart(2, "0")}`}
          </div>

          {/* Name */}
          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.2rem, 2.5vw, 1.6rem)",
            fontWeight: 700,
            color: "#F9F6F1",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}>
            {dish.name}
          </h3>

          {/* Divider */}
          <div style={{
            width: "28px",
            height: "2px",
            background: "#E8900A",
            marginBottom: "1rem",
          }} />

          {/* Description */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(249,246,241,0.55)",
            lineHeight: 1.7,
            marginBottom: "1.5rem",
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
      </div>

      {/* ── CTAs ── */}
      <div style={{
        display: "flex",
        gap: "1rem",
        flexWrap: "wrap",
        justifyContent: "center",
        position: "relative",
      }}>

        {/* Explore Menu */}
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

        {/* Place an Order */}
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
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              style={{
                transform: orderOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease",
              }}
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
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "0.875rem 1.25rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F9F6F1",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(42,107,60,0.2)",
                  transition: "background 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "rgba(42,107,60,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
              >
                Order on Chowdeck
              </a>
              <a
                href="https://wa.me/2347059653297"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  padding: "0.875rem 1.25rem",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#F9F6F1",
                  textDecoration: "none",
                  transition: "background 0.2s ease",
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
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 640px) {
          .carousel-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}