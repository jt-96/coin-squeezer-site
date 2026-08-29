import { useState, useRef } from "react";
import CardContent from "./components/card-content/card-content.component";
import { fetchProducts } from "./service/dataService";
import { useQuery } from "@tanstack/react-query";

export default function App() {

  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const products = data ?? [];

  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<"idle" | "exit-left" | "exit-right">(
    "idle",
  );
  const transitioning = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const navigate = (dir: "next" | "prev") => {
    if (transitioning.current || products.length === 0) return;
    transitioning.current = true;
    setPhase(dir === "next" ? "exit-left" : "exit-right");

    setTimeout(() => {
      setIndex((prev) =>
        dir === "next"
          ? (prev + 1) % products.length
          : (prev - 1 + products.length) % products.length,
      );
      setPhase("idle");
      setTimeout(() => {
        transitioning.current = false;
      }, 350);
    }, 260);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) navigate("next");
    else if (diff < -40) navigate("prev");
    touchStartX.current = null;
  };

  const product = products[index];
  const nextProduct = products[(index + 1) % products.length];

  const parsePrice = (v?: string | number | Number) => {
    if (v === undefined || v === null) return Number.POSITIVE_INFINITY;
    if (typeof v === "number") return v;
    if (typeof v === "object" && v instanceof Number) return Number(v.valueOf());
    return Number(String(v).replace(/[$,]/g, ""));
  };

  const priceColor = (
    product: (typeof products)[0],
    v: string | number | Number | undefined,
  ) => {
    const prices = [
      product.price_vea,
      product.price_mas,
      product.price_carrefour,
    ]
      .filter((p) => p !== undefined && p !== null)
      .map((p) => parsePrice(p as string | number | Number));

    const min = prices.length ? Math.min(...prices) : Number.POSITIVE_INFINITY;
    return parsePrice(v) === min ? "#4ecca3" : "#c8cfe8";
  };

  const currentAnimClass =
    phase === "exit-left"
      ? "card-exit"
      : phase === "exit-right"
        ? "card-exit-right"
        : "";

  const nextEnterClass = phase === "idle" ? "card-pop" : "";

  if (isPending) return 'Loading...'

  return (
    // Main Container
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0d1120",
        display: "flex",
        flexDirection: "column",
        fontFamily: "system-ui, -apple-system, sans-serif",
        color: "#fff",
      }}
    >
      {/* Header */}
      <header
        style={{
          textAlign: "center",
          padding: "20px 0 18px",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          fontSize: "15px",
          fontWeight: 600,
          letterSpacing: "0.01em",
          color: "#e8eaf0",
        }}
      >
        <span style={{ marginRight: "6px", color: "#4ecca3" }}>%</span>
        CoinSqueezer
      </header>

      {/* Main */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
          paddingTop: "80px",
          paddingBottom: "80px",
        }}
      >
        <div className="relative">
          {/* Next card behind */}
          <div
            className="py-15"
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#1e2740",
              borderRadius: "18px",
              transform: "translateX(25px) scale(0.96)",
              transformOrigin: "left center",
              opacity: 0.6,
              zIndex: 0,
            }}
          >
            {/* Card goes here */}
            <CardContent
              product={nextProduct}
              priceColor={(v) => priceColor(nextProduct, v)}
            />
          </div>

          {/* Currently selected card */}

          <div
            key={index}
            className={`${currentAnimClass || nextEnterClass} py-15`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{
              position: "relative",
              backgroundColor: "#1e2740",
              borderRadius: "18px",
              zIndex: 1,
              cursor: "grab",
            }}
          >
            {/* Card content goes here */}
            <CardContent
              product={product}
              priceColor={(v) => priceColor(product, v)}
            />
          </div>

          {/* Arrow button */}
          <button
            onClick={() => navigate("next")}
            style={{
              position: "absolute",
              right: "45%",
              top: "100%",
              transform: "translateY(-50%)",
              width: "42px",
              height: "42px",
              borderRadius: "12px",
              backgroundColor: "#1a2238",
              border: "1px solid rgba(255,255,255,0.1)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#c8cfe8",
              zIndex: 2,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#212c45")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#1a2238")
            }
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </main>
    </div>
  );
}
