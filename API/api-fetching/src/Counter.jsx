import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  function decrement() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  }

  function reset() {
    setCount(0);
  }

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div className="demo-header" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="demo-badge">Interactive State</span>
          <h1 className="demo-title">Counter Component</h1>
          <p className="demo-desc">
            Standard React state control with boundary conditions (minimum value zero).
          </p>
        </div>

        {/* Counter Display Box */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "40px 20px",
            margin: "24px 0",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            boxShadow: "inset 0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
            Current Value
          </span>
          <div
            style={{
              fontSize: "4.5rem",
              fontWeight: "800",
              color: "#38bdf8",
              lineHeight: 1,
              fontFamily: "monospace",
              textShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
              transition: "transform 0.15s ease",
            }}
          >
            {count}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex-center" style={{ gap: "12px", flexWrap: "wrap" }}>
          <button
            className="btn btn-secondary"
            onClick={decrement}
            disabled={count <= 0}
            style={{ minWidth: "90px", fontSize: "1.2rem", padding: "10px 20px" }}
            title="Decrement"
          >
            −
          </button>
          <button
            className="btn btn-secondary"
            onClick={reset}
            style={{ minWidth: "90px" }}
            title="Reset to zero"
          >
            Reset
          </button>
          <button
            className="btn btn-primary"
            onClick={increment}
            style={{ minWidth: "90px", fontSize: "1.2rem", padding: "10px 20px" }}
            title="Increment"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
