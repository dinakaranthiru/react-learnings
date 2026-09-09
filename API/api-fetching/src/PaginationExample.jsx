import React, { useState } from "react";

const PaginationExample = () => {
  const data = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    role: i % 3 === 0 ? "Frontend Dev" : i % 2 === 0 ? "Backend Dev" : "UI/UX Designer",
    status: i % 4 === 0 ? "Offline" : "Active",
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = data.slice(indexOfFirst, indexOfLast);

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">Data Handling</span>
            <span className="stat-pill">
              Showing {indexOfFirst + 1}–{Math.min(indexOfLast, data.length)} of {data.length} records
            </span>
          </div>
          <h1 className="demo-title">Client-Side Pagination</h1>
          <p className="demo-desc">
            Splits massive datasets into bite-sized, navigable pages with controlled slice indices.
          </p>
        </div>

        {/* User Card List */}
        <div className="modern-list" style={{ marginBottom: "24px" }}>
          {currentItems.map((user) => (
            <div key={user.id} className="modern-list-item">
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "10px",
                    background: "rgba(56, 189, 248, 0.12)",
                    border: "1px solid rgba(56, 189, 248, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "700",
                    color: "#38bdf8",
                    fontSize: "0.85rem",
                  }}
                >
                  #{user.id}
                </div>
                <div>
                  <div style={{ fontWeight: "600", color: "#f8fafc" }}>{user.name}</div>
                  <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{user.role}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "0.76rem",
                    padding: "3px 8px",
                    borderRadius: "9999px",
                    background: user.status === "Active" ? "rgba(16, 185, 129, 0.12)" : "rgba(148, 163, 184, 0.12)",
                    color: user.status === "Active" ? "#34d399" : "#94a3b8",
                    border: `1px solid ${user.status === "Active" ? "rgba(16, 185, 129, 0.25)" : "rgba(148, 163, 184, 0.2)"}`,
                  }}
                >
                  <span
                    style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      backgroundColor: user.status === "Active" ? "#10b981" : "#64748b",
                    }}
                  />
                  {user.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination Navigation Bar */}
        <div className="flex-between" style={{ flexWrap: "wrap", gap: "12px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "18px" }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage((prev) => prev - 1)}
            disabled={currentPage === 1}
          >
            ← Previous
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
            {[...Array(totalPages)].map((_, i) => {
              const pageNum = i + 1;
              const isActive = currentPage === pageNum;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "8px",
                    border: isActive ? "none" : "1px solid rgba(255, 255, 255, 0.1)",
                    background: isActive ? "var(--primary-gradient)" : "rgba(255, 255, 255, 0.04)",
                    color: isActive ? "#ffffff" : "#94a3b8",
                    fontWeight: isActive ? "700" : "500",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontSize: "0.85rem",
                  }}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            className="btn btn-secondary btn-sm"
            onClick={() => setCurrentPage((prev) => prev + 1)}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationExample;