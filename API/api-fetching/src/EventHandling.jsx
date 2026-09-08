import React, { useState } from "react";

const EventHandling = () => {
  const [typedValue, setTypedValue] = useState("");
  const [lastAction, setLastAction] = useState(null);

  function handleClick() {
    setLastAction("Button was clicked!");
    alert("Button was clicked!");
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setTypedValue(val);
    console.log("User typed:", val);
  }

  function deleteUser(id) {
    setLastAction(`Deleted user with ID: #${id}`);
    console.log(`Deleting user with ID: ${id}`);
  }

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-emerald">React Events</span>
            <span className="stat-pill">Synthetic Event System</span>
          </div>
          <h1 className="demo-title">Event Handling Playground</h1>
          <p className="demo-desc">
            Demonstrating React's synthetic event dispatcher for inputs, click actions, and parameterized handlers.
          </p>
        </div>

        {/* Live Event Output Bar */}
        {lastAction && (
          <div
            style={{
              padding: "12px 18px",
              background: "rgba(56, 189, 248, 0.12)",
              border: "1px solid rgba(56, 189, 248, 0.25)",
              borderRadius: "12px",
              color: "#7dd3fc",
              fontSize: "0.88rem",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>⚡ Recent Event:</span>
            <strong>{lastAction}</strong>
          </div>
        )}

        {/* 3 Event Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Card 1: Input Change */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "18px",
            }}
          >
            <div style={{ marginBottom: "10px" }}>
              <strong style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
                1. onChange Event
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                Captures real-time keyboard inputs from event target.
              </p>
            </div>
            <input
              type="text"
              placeholder="Type something to see live output..."
              onChange={handleInputChange}
              className="modern-input"
              style={{ marginBottom: "10px" }}
            />
            <div style={{ fontSize: "0.84rem", color: "#64748b" }}>
              Live Value:{" "}
              <strong style={{ color: typedValue ? "#38bdf8" : "#475569" }}>
                {typedValue || "(Waiting for input...)"}
              </strong>
            </div>
          </div>

          {/* Card 2: Click Event */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <strong style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
                2. onClick Event
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                Executes standard callback on pointer click.
              </p>
            </div>
            <button className="btn btn-primary" onClick={handleClick}>
              👆 Trigger Click Alert
            </button>
          </div>

          {/* Card 3: Parameterized Event */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "18px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div>
              <strong style={{ fontSize: "0.95rem", color: "#f8fafc" }}>
                3. Parameterized Handler
              </strong>
              <p style={{ margin: "2px 0 0", fontSize: "0.82rem", color: "#94a3b8" }}>
                Calls handler with specific arguments: <code>deleteUser(42)</code>.
              </p>
            </div>
            <button className="btn btn-danger" onClick={() => deleteUser(42)}>
              🗑️ Delete User #42
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventHandling;