import React, { useState } from "react";

const TAB_DATA = [
  {
    id: "Tab1",
    label: "Overview",
    icon: "📌",
    title: "Component Architecture",
    description:
      "Tabs allow users to navigate between related views within the same context without leaving the page or refreshing state.",
    points: [
      "Dynamic component rendering based on active state",
      "Memory efficient layout reduction",
      "Seamless keyboard & accessible touch interaction",
    ],
  },
  {
    id: "Tab2",
    label: "Code Structure",
    icon: "💻",
    title: "Declarative State Handling",
    description:
      "React manages the active tab index through state variables, conditionally displaying the respective markup block.",
    points: [
      "Pure declarative conditional expressions",
      "Separation of concerns between trigger and container",
      "Easily expandable data array architecture",
    ],
  },
  {
    id: "Tab3",
    label: "Analytics",
    icon: "📊",
    title: "Usage Metrics",
    description:
      "Real-time analytics regarding user engagement with secondary UI panes.",
    points: [
      "99.4% User task completion rate",
      "Instant 0ms latency client-side switching",
      "Zero network payload overhead",
    ],
  },
];

function Tabs() {
  const [activeTab, setActiveTab] = useState("Tab1");

  const currentTab = TAB_DATA.find((t) => t.id === activeTab) || TAB_DATA[0];

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-purple">UI Patterns</span>
            <span className="stat-pill">Segmented Navigation</span>
          </div>
          <h1 className="demo-title">Tabbed Interface</h1>
          <p className="demo-desc">
            Organizing multi-section views into a single, clean switchable workspace.
          </p>
        </div>

        {/* Segmented Control Bar */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            background: "rgba(15, 23, 42, 0.7)",
            padding: "6px",
            borderRadius: "14px",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            marginBottom: "24px",
          }}
        >
          {TAB_DATA.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: isActive ? "var(--primary-gradient)" : "transparent",
                  color: isActive ? "#ffffff" : "#94a3b8",
                  fontWeight: isActive ? "600" : "500",
                  fontSize: "0.88rem",
                  cursor: "pointer",
                  transition: "all 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: isActive ? "0 4px 14px rgba(56, 189, 248, 0.3)" : "none",
                }}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Tab Panel Content */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.55)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "16px",
            padding: "28px",
            animation: "pageEntrance 0.25s ease-out forwards",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
            <span style={{ fontSize: "1.4rem" }}>{currentTab.icon}</span>
            <h2 style={{ margin: 0, fontSize: "1.25rem", color: "#f8fafc" }}>
              {currentTab.title}
            </h2>
          </div>

          <p style={{ color: "#94a3b8", fontSize: "0.92rem", lineHeight: 1.6, marginBottom: "20px" }}>
            {currentTab.description}
          </p>

          <div style={{ borderTop: "1px solid rgba(255, 255, 255, 0.06)", paddingTop: "18px" }}>
            <h4 style={{ margin: "0 0 12px", fontSize: "0.85rem", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Key Highlights
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {currentTab.points.map((pt, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#cbd5e1", fontSize: "0.88rem" }}>
                  <span style={{ color: "#10b981", fontSize: "0.85rem" }}>✓</span>
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tabs;