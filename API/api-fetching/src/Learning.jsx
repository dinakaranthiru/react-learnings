import React, { useEffect, useState } from "react";

const Learning = () => {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

  async function getAdvice() {
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos");
      const data = await res.json();
      const randomIndex = Math.floor(Math.random() * data.length);
      setAdvice(data[randomIndex].title);
      setCount((c) => c + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">Async State & Effects</span>
            <span className="stat-pill">✨ Random Generator</span>
          </div>
          <h1 className="demo-title">Daily Inspiration Hub</h1>
          <p className="demo-desc">
            Fetches dynamic recommendations from an external API with asynchronous state updates.
          </p>
        </div>

        <div
          style={{
            background: "rgba(15, 23, 42, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "32px 24px",
            margin: "24px 0",
            textAlign: "center",
            position: "relative",
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: "2.5rem",
              lineHeight: 1,
              opacity: 0.3,
              marginBottom: "8px",
            }}
          >
            “
          </span>
          <p
            style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#f8fafc",
              margin: "0 0 12px",
              maxWidth: "540px",
              lineHeight: 1.4,
              fontStyle: "italic",
            }}
          >
            {loading ? "Discovering inspiring advice..." : advice || "Click the button below to generate advice."}
          </p>
          <span
            style={{
              fontSize: "2.5rem",
              lineHeight: 1,
              opacity: 0.3,
              marginTop: "-8px",
            }}
          >
            ”
          </span>
        </div>

        <div className="flex-between" style={{ flexWrap: "wrap", gap: "16px" }}>
          <div className="stat-pill" style={{ padding: "8px 16px" }}>
            <span>📖 You have read</span>
            <strong style={{ color: "#38bdf8", fontSize: "0.95rem" }}>
              {count}
            </strong>
            <span>{count === 1 ? "piece" : "pieces"} of advice</span>
          </div>

          <button
            className="btn btn-primary"
            onClick={getAdvice}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "🎲 Get New Advice"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Learning;