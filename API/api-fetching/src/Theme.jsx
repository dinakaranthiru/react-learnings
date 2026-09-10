import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

function Theme() {
  const [theme, setTheme] = useState("dark");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="demo-container">
        <div className="demo-card">
          <div className="demo-header">
            <div className="demo-badge-row">
              <span className="demo-badge demo-badge-emerald">React Context API</span>
              <span className="stat-pill">createContext &amp; useContext</span>
            </div>
            <h1 className="demo-title">Theme Context Switcher</h1>
            <p className="demo-desc">
              Shares dynamic styling state deeply across the React tree without prop drilling.
            </p>
          </div>

          <Child />
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

function Child() {
  const { theme, setTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div
      style={{
        background: isDark ? "#090d16" : "#ffffff",
        color: isDark ? "#f8fafc" : "#0f172a",
        border: `1px solid ${isDark ? "rgba(255, 255, 255, 0.12)" : "#e2e8f0"}`,
        borderRadius: "16px",
        padding: "32px 24px",
        textAlign: "center",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: isDark
          ? "0 10px 30px rgba(0,0,0,0.5)"
          : "0 10px 30px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>
        {isDark ? "🌙" : "☀️"}
      </div>

      <h2 style={{ margin: "0 0 6px", fontSize: "1.4rem", fontWeight: "700" }}>
        {isDark ? "Dark Theme Active" : "Light Theme Active"}
      </h2>

      <p
        style={{
          margin: "0 0 24px",
          fontSize: "0.92rem",
          color: isDark ? "#94a3b8" : "#64748b",
          maxWidth: "400px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        This container consumes the active theme token directly from{" "}
        <code>ThemeContext</code> via the <code>useContext</code> hook.
      </p>

      <button
        className="btn"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        style={{
          background: isDark
            ? "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)"
            : "linear-gradient(135deg, #1e293b 0%, #0f172a 100%)",
          color: isDark ? "#0f172a" : "#ffffff",
          padding: "10px 24px",
          fontWeight: "700",
          boxShadow: isDark
            ? "0 4px 14px rgba(251, 191, 36, 0.3)"
            : "0 4px 14px rgba(15, 23, 42, 0.3)",
        }}
      >
        {isDark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
      </button>
    </div>
  );
}

export default Theme;