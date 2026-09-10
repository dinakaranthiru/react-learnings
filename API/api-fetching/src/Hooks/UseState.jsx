import React, { useState } from "react";

const USE_CASES = [
  { title: "Counter Values", icon: "🔢", desc: "Numeric tallies and score trackers" },
  { title: "Form Inputs", icon: "📝", desc: "Controlled inputs, selects, and checkboxes" },
  { title: "API Response Data", icon: "🌐", desc: "Cached network payloads and loading states" },
  { title: "Show / Hide Toggle", icon: "👁️", desc: "Modals, accordions, and dropdown menus" },
  { title: "Theme Switching", icon: "🎨", desc: "Light, dark, and system color mode flags" },
  { title: "User Information", icon: "👤", desc: "Active sessions and profile preferences" },
];

const UseState = () => {
  const [count, setCount] = useState(0);

  function Inc() {
    setCount(count + 1);
  }

  function Dec() {
    if (count > 0) {
      setCount(count - 1);
    } else {
      setCount(0);
    }
  }

  function Reset() {
    setCount(0);
  }

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-emerald">React Core Hook</span>
            <span className="stat-pill">Syntax: const [state, setState] = useState(initial)</span>
          </div>
          <h1 className="demo-title">useState Hook Masterclass</h1>
          <p className="demo-desc">
            The fundamental React hook that enables functional components to preserve and update stateful data across renders.
          </p>
        </div>

        {/* Interactive Demo Area */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.7)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "28px",
            marginBottom: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.82rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Live State Demo
          </span>
          <div
            style={{
              fontSize: "3.8rem",
              fontWeight: "800",
              color: "#10b981",
              fontFamily: "monospace",
              margin: "12px 0 20px",
              textShadow: "0 0 25px rgba(16, 185, 129, 0.35)",
            }}
          >
            {count}
          </div>

          <div className="flex-center" style={{ gap: "12px", flexWrap: "wrap" }}>
            <button
              className="btn btn-secondary"
              onClick={Dec}
              disabled={count <= 0}
              style={{ minWidth: "80px", fontSize: "1.1rem" }}
            >
              −
            </button>
            <button className="btn btn-secondary" onClick={Reset}>
              Reset
            </button>
            <button
              className="btn btn-success"
              onClick={Inc}
              style={{ minWidth: "80px", fontSize: "1.1rem" }}
            >
              +
            </button>
          </div>
        </div>

        {/* Use Cases Grid */}
        <div>
          <h3 style={{ fontSize: "1rem", color: "#f8fafc", marginBottom: "14px", fontWeight: "600" }}>
            💡 Primary Real-World Use Cases
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "12px",
            }}
          >
            {USE_CASES.map((uc, i) => (
              <div
                key={i}
                style={{
                  padding: "14px",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.06)",
                  borderRadius: "12px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <span>{uc.icon}</span>
                  <strong style={{ fontSize: "0.88rem", color: "#e2e8f0" }}>{uc.title}</strong>
                </div>
                <p style={{ margin: 0, fontSize: "0.78rem", color: "#94a3b8", lineHeight: "1.4" }}>
                  {uc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseState;