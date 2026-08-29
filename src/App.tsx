import { useState, useRef } from "react";

const products = [
  {
    product_name: "Product A",
    priceVea: "$20,300.00",
    priceMas: "$17,299.00",
    priceCarrefour: "$16,500.00",
  },
  {
    product_name: "Product B",
    priceVea: "$10,200.00",
    priceMas: "$15,200.00",
    priceC: "$17,900.00",
  },
  {
    product_name: "Product C",
    priceVea: "$3000.00",
    priceMas: "$5899.99",
    priceCarrefour: "$2500.00",
  },
];

export default function App() {
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
        <div style={{ position: "relative", width: "340px" }}>
          {/* Next card behind */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#1e2740",
              borderRadius: "18px",
              transform: "translateX(28px) scale(0.96)",
              transformOrigin: "left center",
              opacity: 0.6,
              zIndex: 0,
            }}
          >
            {/* Card goes here */}
          </div>

          {/* Currently selected card */}

          <div
            style={{
              position: "relative",
              backgroundColor: "#1e2740",
              borderRadius: "18px",
              zIndex: 1,
              cursor: "grab",
            }}
          >
            {/* Card content goes here */}
          </div>

          {/* Arrow button */}
          <button
            style={{
              position: "absolute",
              right: "-60px",
              top: "50%",
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
