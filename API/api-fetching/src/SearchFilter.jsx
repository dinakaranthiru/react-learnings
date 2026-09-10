import React, { useState } from "react";

const FRUIT_DATABASE = [
  { name: "Apple", icon: "🍎", category: "Pome" },
  { name: "Banana", icon: "🍌", category: "Tropical" },
  { name: "Grapes", icon: "🍇", category: "Berry" },
  { name: "Orange", icon: "🍊", category: "Citrus" },
  { name: "Fig", icon: "🫐", category: "Ficus" },
  { name: "Date", icon: "🌴", category: "Stone" },
  { name: "Guava", icon: "🍈", category: "Tropical" },
  { name: "Pineapple", icon: "🍍", category: "Bromeliad" },
];

const SearchFilter = () => {
  const [search, setSearch] = useState("");

  const filteredFruit = FRUIT_DATABASE.filter((fruit) =>
    fruit.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">Array Filtering</span>
            <span className="stat-pill">
              Showing {filteredFruit.length} of {FRUIT_DATABASE.length} fruits
            </span>
          </div>
          <h1 className="demo-title">Instant Search Filter</h1>
          <p className="demo-desc">
            Client-side array filtering utilizing native JavaScript substring matching.
          </p>
        </div>

        {/* Search Input */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter fruits (e.g. Apple, Orange)..."
            className="modern-input"
            style={{ paddingLeft: "38px" }}
          />
          <span
            style={{
              position: "absolute",
              left: "14px",
              top: "50%",
              transform: "translateY(-50%)",
              color: "#64748b",
            }}
          >
            🔍
          </span>
          {search && (
            <button
              onClick={() => setSearch("")}
              style={{
                position: "absolute",
                right: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "2px 6px",
              }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Results Grid */}
        {filteredFruit.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
              gap: "12px",
            }}
          >
            {filteredFruit.map((fruit, index) => (
              <div
                key={index}
                style={{
                  background: "rgba(15, 23, 42, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  padding: "16px 12px",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "6px" }}>{fruit.icon}</div>
                <strong style={{ fontSize: "0.92rem", color: "#f8fafc", display: "block" }}>
                  {fruit.name}
                </strong>
                <span style={{ fontSize: "0.74rem", color: "#64748b" }}>{fruit.category}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="modern-empty-state">
            <div className="modern-empty-state-icon">🔍</div>
            <p>No fruits found matching "{search}"</p>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => setSearch("")}
              style={{ marginTop: "10px" }}
            >
              Clear Filter
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;