import React from "react";

const Exampleprops = (props) => {
  const initials = props.name
    ? props.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "520px", margin: "0 auto" }}>
        <div className="demo-header" style={{ textAlign: "center", alignItems: "center" }}>
          <span className="demo-badge demo-badge-purple">Props Example</span>
          <h1 className="demo-title">Props Passing Demo</h1>
          <p className="demo-desc">
            Demonstrating structured prop transmission to a functional component.
          </p>
        </div>

        {/* Profile Card */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.65)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            margin: "20px 0",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: "72px",
              height: "72px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.6rem",
              fontWeight: "700",
              color: "#ffffff",
              boxShadow: "0 0 20px rgba(56, 189, 248, 0.35)",
              marginBottom: "16px",
            }}
          >
            {initials}
          </div>

          <h2 style={{ margin: "0 0 4px", fontSize: "1.4rem", color: "#f8fafc" }}>
            {props.name}
          </h2>
          <span
            style={{
              fontSize: "0.8rem",
              color: "#a855f7",
              background: "rgba(168, 85, 247, 0.1)",
              border: "1px solid rgba(168, 85, 247, 0.2)",
              padding: "3px 10px",
              borderRadius: "9999px",
              marginBottom: "20px",
            }}
          >
            Community Contributor
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "12px",
              width: "100%",
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Name</div>
              <strong style={{ fontSize: "1rem", color: "#f1f5f9" }}>{props.name}</strong>
            </div>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.06)",
                borderRadius: "10px",
                padding: "12px",
              }}
            >
              <div style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Age</div>
              <strong style={{ fontSize: "1rem", color: "#f1f5f9" }}>{props.age} yrs</strong>
            </div>
          </div>
        </div>

        {/* Code Snippet Box */}
        <div
          style={{
            background: "rgba(10, 15, 29, 0.8)",
            borderRadius: "10px",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            padding: "12px 16px",
            fontFamily: "monospace",
            fontSize: "0.82rem",
            color: "#94a3b8",
          }}
        >
          <span style={{ color: "#ec4899" }}>&lt;</span>
          <span style={{ color: "#38bdf8" }}>Exampleprops</span>{" "}
          <span style={{ color: "#a855f7" }}>name</span>=
          <span style={{ color: "#34d399" }}>"{props.name}"</span>{" "}
          <span style={{ color: "#a855f7" }}>age</span>=
          <span style={{ color: "#fbbf24" }}>&#123;{props.age}&#125;</span>{" "}
          <span style={{ color: "#ec4899" }}>/&gt;</span>
        </div>
      </div>
    </div>
  );
};

export default Exampleprops;