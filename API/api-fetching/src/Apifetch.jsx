import React, { useEffect, useState } from "react";

const Apifetch = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user directory");
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error while loading data");
        setLoading(false);
      });
  }, []);

  return (
    <div className="demo-container-wide">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">REST API Integration</span>
            <span className="stat-pill">📡 jsonplaceholder.typicode.com</span>
            {!loading && !error && (
              <span className="stat-pill" style={{ color: "#10b981" }}>
                ✓ {data.length} Users Loaded
              </span>
            )}
          </div>
          <h1 className="demo-title">User Directory Fetcher</h1>
          <p className="demo-desc">
            Asynchronously consumes JSON endpoints with error handling, loading states, and structured table presentation.
          </p>
        </div>

        {loading && (
          <div className="modern-empty-state">
            <div style={{ fontSize: "1.8rem", marginBottom: "12px", animation: "spin 1s linear infinite" }}>
              ⏳
            </div>
            <p>Fetching user directory from remote API...</p>
          </div>
        )}

        {error && (
          <div
            style={{
              padding: "16px",
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              borderRadius: "12px",
              color: "#fda4af",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && (
          <div className="modern-table-container">
            <table className="modern-table">
              <thead>
                <tr>
                  <th style={{ width: "80px" }}>ID</th>
                  <th>User Profile</th>
                  <th>Email Address</th>
                  <th>Website / City</th>
                </tr>
              </thead>
              <tbody>
                {data.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <span
                        style={{
                          display: "inline-block",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: "rgba(255, 255, 255, 0.05)",
                          fontSize: "0.8rem",
                          fontWeight: "600",
                          color: "#94a3b8",
                        }}
                      >
                        #{user.id}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div
                          style={{
                            width: "34px",
                            height: "34px",
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
                          <div style={{ fontWeight: "600", color: "#f8fafc" }}>
                            {user.name}
                          </div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                            @{user.username || "user"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <a
                        href={`mailto:${user.email}`}
                        style={{
                          color: "#38bdf8",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          fontSize: "0.88rem",
                        }}
                      >
                        <span>✉️</span> {user.email}
                      </a>
                    </td>
                    <td>
                      <span style={{ fontSize: "0.85rem", color: "#94a3b8" }}>
                        {user.address?.city || user.website || "Remote"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Apifetch;
