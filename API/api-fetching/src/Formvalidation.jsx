import React, { useState } from "react";

const Formvalidation = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [submittedEmails, setSubmittedEmails] = useState([
    "alex.dev@gmail.com",
    "jordan.code@gmail.com",
  ]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setError("");
    setSuccess("");

    if (email.split("@").length !== 2 || !email.endsWith("@gmail.com")) {
      setError("Please enter a valid Gmail address (must end with @gmail.com).");
      return;
    }

    const normalized = email.trim().toLowerCase();
    const alreadySubmitted = submittedEmails.includes(normalized);
    if (alreadySubmitted) {
      setError("This email has already been registered in the system.");
      return;
    }

    setSubmittedEmails((prev) => [...prev, normalized]);
    setSuccess(`Successfully registered ${normalized}!`);
    setEmail("");
  };

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "540px", margin: "0 auto" }}>
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">Forms &amp; Controlled Inputs</span>
            <span className="stat-pill">Validation &amp; Error Handling</span>
          </div>
          <h1 className="demo-title">Form Validation</h1>
          <p className="demo-desc">
            Enforces strict email formatting rules, checks for duplicates, and provides real-time status feedback.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ marginBottom: "24px" }}>
          <div style={{ marginBottom: "14px" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.82rem",
                color: "#94a3b8",
                fontWeight: "600",
                marginBottom: "6px",
              }}
            >
              Gmail Address
            </label>
            <input
              type="text"
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError("");
              }}
              value={email}
              placeholder="e.g. developer@gmail.com"
              className="modern-input"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", padding: "11px" }}
          >
            Submit Application
          </button>
        </form>

        {error && (
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(244, 63, 94, 0.12)",
              border: "1px solid rgba(244, 63, 94, 0.3)",
              borderRadius: "10px",
              color: "#fda4af",
              fontSize: "0.86rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div
            style={{
              padding: "12px 16px",
              background: "rgba(16, 185, 129, 0.12)",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "10px",
              color: "#6ee7b7",
              fontSize: "0.86rem",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "20px",
            }}
          >
            <span>✓</span>
            <span>{success}</span>
          </div>
        )}

        {/* Registered Emails History */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.6)",
            border: "1px solid rgba(255, 255, 255, 0.06)",
            borderRadius: "14px",
            padding: "16px",
          }}
        >
          <div className="flex-between" style={{ marginBottom: "12px" }}>
            <span style={{ fontSize: "0.85rem", color: "#94a3b8", fontWeight: "600" }}>
              Registered Directory
            </span>
            <span className="stat-pill">{submittedEmails.length} Emails</span>
          </div>

          <div className="modern-list">
            {submittedEmails.map((item, index) => (
              <div
                key={index}
                className="modern-list-item"
                style={{ padding: "8px 14px", fontSize: "0.86rem" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#38bdf8" }}>✉️</span>
                  <span style={{ color: "#f1f5f9" }}>{item}</span>
                </div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    color: "#34d399",
                    background: "rgba(16, 185, 129, 0.1)",
                    padding: "2px 8px",
                    borderRadius: "9999px",
                  }}
                >
                  Verified
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Formvalidation;
