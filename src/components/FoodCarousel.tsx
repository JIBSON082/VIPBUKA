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

  // Auto-advance every 4 seconds
  useEffect(() => {
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next]);

  const dish = dishes[current];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      {/* ── FOOD BLOCK ── */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "center",
          marginBottom: "2.5rem",
        }}
        className="food-grid"
      >
        {/* LEFT — Image */}
        <div style={{ position: "relative", borderRadius: "4px", overflow: "hidden", aspectRatio: "4/3" }}>
          <img
            key={dish.id}
            src={dish.image}
            alt={dish.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              opacity: animating ? 0 : 1,
              transform: animating
                ? direction === "next" ? "translateX(20px)" : "translateX(-20px)"
                : "translateX(0)",
              transition: "opacity 0.4s ease, transform 0.4s ease",
              display: "block",
            }}
          />

          {/* Arrows over image */}
          <button
            onClick={prev}
            aria-label="Previous dish"
            style={{
              position: "absolute",
              left: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(17,20,17,0.7)",
              border: "1px solid rgba(42,107,60,0.3)",
              borderRadius: "2px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F9F6F1",
              transition: "background 0.2s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 1L3 7L9 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <button
            onClick={next}
            aria-label="Next dish"
            style={{
              position: "absolute",
              right: "12px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(17,20,17,0.7)",
              border: "1px solid rgba(42,107,60,0.3)",
              borderRadius: "2px",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#F9F6F1",
              transition: "background 0.2s ease",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 1L11 7L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          {/* Dot indicators */}
          <div style={{
            position: "absolute",
            bottom: "12px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "6px",
          }}>
            {dishes.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? "next" : "prev")}
                aria-label={`Go to dish ${i + 1}`}
                style={{
                  width: i === current ? "20px" : "6px",
                  height: "6px",
                  borderRadius: "3px",
                  background: i === current ? "#E8900A" : "rgba(249,246,241,0.4)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT — Details */}
        <div
          style={{
            opacity: animating ? 0 : 1,
            transform: animating
              ? direction === "next" ? "translateY(10px)" : "translateY(-10px)"
              : "translateY(0)",
            transition: "opacity 0.4s ease, transform 0.4s ease",
          }}
        >
          <div style={{
            fontSize: "0.65rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#E8900A",
            marginBottom: "0.75rem",
            fontFamily: "'DM Sans', sans-serif",
          }}>
            {`${String(current + 1).padStart(2, "0")} / ${String(dishes.length).padStart(2, "0")}`}
          </div>

          <h3 style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 600,
            color: "#F9F6F1",
            lineHeight: 1.2,
            marginBottom: "1rem",
          }}>
            {dish.name}
          </h3>

          <div style={{
            width: "32px",
            height: "2px",
            background: "#E8900A",
            marginBottom: "1rem",
          }} />

          <p style={{
            fontSize: "0.85rem",
            color: "rgba(249,246,241,0.65)",
            lineHeight: 1.7,
            marginBottom: "1.25rem",
            maxWidth: "280px",
          }}>
            {dish.description}
          </p>

          <div style={{
            fontFamily: "'Fraunces', serif",
            fontSize: "1.5rem",
            fontWeight: 600,
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
            border: "1px solid rgba(249,246,241,0.3)",
            textDecoration: "none",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = "#F9F6F1")}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(249,246,241,0.3)")}
        >
          Explore Menu
        </a>

        {/* Place an Order — dropdown */}
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
              transition: "background 0.3s ease",
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

          {/* Dropdown */}
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
          .food-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}

