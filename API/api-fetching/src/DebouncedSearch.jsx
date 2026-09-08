import React, { useState, useEffect } from "react";

function DebouncedSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  // API call on debounced value
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const controller = new AbortController();
    setLoading(true);

    fetch(`https://jsonplaceholder.typicode.com/users?q=${debouncedQuery}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") setLoading(false);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "600px", margin: "0 auto" }}>
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-emerald">Performance Optimization</span>
            <span className="stat-pill">⏱️ 500ms Delay + AbortController</span>
          </div>
          <h1 className="demo-title">Debounced API Search</h1>
          <p className="demo-desc">
            Prevents overwhelming network requests by postponing API calls until typing pauses.
          </p>
        </div>

        {/* Input */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type user name (e.g. Leanne, Ervin, Clementine)..."
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
          {loading && (
            <span
              style={{
                position: "absolute",
                right: "14px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#38bdf8",
                fontSize: "0.85rem",
              }}
            >
              Searching...
            </span>
          )}
        </div>

        {/* Debounced status chip */}
        <div className="flex-between" style={{ marginBottom: "16px", fontSize: "0.82rem", color: "#94a3b8" }}>
          <span>
            Query: <strong style={{ color: "#f8fafc" }}>{query || '""'}</strong>
          </span>
          <span>
            Debounced Query:{" "}
            <strong style={{ color: "#38bdf8" }}>{debouncedQuery || '""'}</strong>
          </span>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="modern-list">
            {results.map((user) => (
              <div key={user.id} className="modern-list-item">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #38bdf8, #6366f1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "700",
                      color: "#fff",
                      fontSize: "0.85rem",
                    }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: "600", color: "#f8fafc", fontSize: "0.92rem" }}>
                      {user.name}
                    </div>
                    <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                      @{user.username} • {user.email}
                    </div>
                  </div>
                </div>

                <span
                  style={{
                    fontSize: "0.74rem",
                    padding: "3px 8px",
                    borderRadius: "9999px",
                    background: "rgba(56, 189, 248, 0.1)",
                    color: "#38bdf8",
                    border: "1px solid rgba(56, 189, 248, 0.2)",
                  }}
                >
                  Match
                </span>
              </div>
            ))}
          </div>
        ) : query ? (
          !loading && (
            <div className="modern-empty-state">
              <div className="modern-empty-state-icon">👤</div>
              <p>No matching users found for "{debouncedQuery}"</p>
            </div>
          )
        ) : (
          <div className="modern-empty-state">
            <div className="modern-empty-state-icon">⌨️</div>
            <p>Start typing above to trigger the debounced network lookup.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DebouncedSearch;