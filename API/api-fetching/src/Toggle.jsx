import React, { useState } from "react";

function Toggle() {
  const [visible, setVisible] = useState(true);

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "520px", margin: "0 auto" }}>
        <div className="demo-header" style={{ textAlign: "center", alignItems: "center" }}>
          <div className="demo-badge-row">
            <span className="demo-badge">Conditional Rendering</span>
            <span
              className="stat-pill"
              style={{
                color: visible ? "#34d399" : "#94a3b8",
                borderColor: visible ? "rgba(16, 185, 129, 0.3)" : "rgba(255, 255, 255, 0.1)",
              }}
            >
              State: {visible ? "● Visible" : "○ Hidden"}
            </span>
          </div>
          <h1 className="demo-title">Visibility Toggle</h1>
          <p className="demo-desc">
            Demonstrating boolean state toggling to conditionally mount or unmount UI elements.
          </p>
        </div>

        {/* Toggle Control Button */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <button
            className={`btn ${visible ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setVisible(!visible)}
            style={{ padding: "10px 24px", fontSize: "0.95rem" }}
          >
            {visible ? "👁️ Hide Element" : "✨ Show Element"}
          </button>
        </div>

        {/* Conditionally Rendered Box */}
        {visible ? (
          <div
            style={{
              background: "rgba(15, 23, 42, 0.7)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: "16px",
              padding: "24px",
              textAlign: "center",
              animation: "pageEntrance 0.25s ease-out forwards",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.15)",
            }}
          >
            <div style={{ fontSize: "2rem", marginBottom: "8px" }}>🎉</div>
            <h3 style={{ margin: "0 0 6px", fontSize: "1.15rem", color: "#f8fafc" }}>
              Now You See Me!
            </h3>
            <p style={{ margin: 0, fontSize: "0.9rem", color: "#94a3b8", lineHeight: 1.5 }}>
              This entire card block is conditionally rendered in the DOM tree using short-circuit evaluation:{" "}
              <code style={{ color: "#38bdf8", background: "rgba(56, 189, 248, 0.1)", padding: "2px 6px", borderRadius: "4px" }}>
                visible &amp;&amp; &lt;Component /&gt;
              </code>.
            </p>
          </div>
        ) : (
          <div className="modern-empty-state" style={{ padding: "30px 20px" }}>
            <div className="modern-empty-state-icon">🙈</div>
            <p style={{ margin: 0 }}>The element is currently unmounted from the DOM tree.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Toggle;