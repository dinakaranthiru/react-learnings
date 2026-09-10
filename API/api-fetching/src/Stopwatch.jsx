import React, { useState, useRef, useEffect } from "react";

function Stopwatch() {
  const [time, setTime] = useState(0); // in milliseconds
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const start = () => setIsRunning(true);
  const stop = () => setIsRunning(false);
  const reset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return {
      min: String(minutes).padStart(2, "0"),
      sec: String(seconds).padStart(2, "0"),
      ms: String(centiseconds).padStart(2, "0"),
    };
  };

  const formatted = formatTime(time);

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div className="demo-header" style={{ textAlign: "center", alignItems: "center" }}>
          <div className="demo-badge-row">
            <span className="demo-badge">useRef & setInterval</span>
            {isRunning && (
              <span className="stat-pill" style={{ color: "#34d399", borderColor: "rgba(16, 185, 129, 0.3)" }}>
                ● Active Timer
              </span>
            )}
          </div>
          <h1 className="demo-title">Precision Stopwatch</h1>
          <p className="demo-desc">
            High-precision timer leveraging interval refs to prevent stale closure re-renders.
          </p>
        </div>

        {/* Stopwatch Display */}
        <div
          style={{
            background: "rgba(15, 23, 42, 0.75)",
            border: "1px solid rgba(255, 255, 255, 0.08)",
            borderRadius: "20px",
            padding: "36px 20px",
            margin: "24px 0",
            textAlign: "center",
            display: "flex",
            alignItems: "baseline",
            justifyContent: "center",
            gap: "4px",
            boxShadow: "inset 0 2px 10px rgba(0,0,0,0.5)",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "4.2rem",
              fontWeight: "800",
              color: "#38bdf8",
              lineHeight: 1,
              textShadow: "0 0 25px rgba(56, 189, 248, 0.45)",
            }}
          >
            {formatted.min}:{formatted.sec}
          </div>
          <span
            style={{
              fontFamily: "monospace",
              fontSize: "1.8rem",
              fontWeight: "700",
              color: "#94a3b8",
              lineHeight: 1,
            }}
          >
            .{formatted.ms}
          </span>
        </div>

        {/* Controls */}
        <div className="flex-center" style={{ gap: "12px", flexWrap: "wrap" }}>
          {!isRunning ? (
            <button
              className="btn btn-success"
              onClick={start}
              style={{ minWidth: "110px", padding: "11px 22px", fontSize: "0.95rem" }}
            >
              ▶ Start
            </button>
          ) : (
            <button
              className="btn btn-danger"
              onClick={stop}
              style={{ minWidth: "110px", padding: "11px 22px", fontSize: "0.95rem" }}
            >
              ⏸ Pause
            </button>
          )}

          <button
            className="btn btn-secondary"
            onClick={reset}
            style={{ minWidth: "110px", padding: "11px 22px", fontSize: "0.95rem" }}
          >
            🔄 Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default Stopwatch;