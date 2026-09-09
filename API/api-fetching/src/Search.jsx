import React, { useState, useEffect, useRef } from "react";

// Utility: Debounce
function useDebounce(fn, delay) {
  const timeoutRef = useRef(null);
  return (...args) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => fn(...args), delay);
  };
}

// Utility: Throttle
function useThrottle(fn, limit) {
  const lastRun = useRef(Date.now());
  return (...args) => {
    if (Date.now() - lastRun.current >= limit) {
      fn(...args);
      lastRun.current = Date.now();
    }
  };
}

// Fallback search mock provider so component works independently
const defaultFetchResults = async (q, page) => {
  await new Promise((r) => setTimeout(r, 300));
  const topics = [
    "React Server Components",
    "Virtual DOM reconciliation",
    "useMemo and useCallback optimization",
    "Concurrent Mode and Suspense",
    "TypeScript generics with React Props",
    "Custom Hooks composition",
    "State machines with XState",
    "CSS Modules vs Tailwind CSS",
    "Micro-frontends architecture",
    "Web Workers in React applications",
    "Zustand lightweight state store",
    "Next.js App Router conventions",
  ];
  const matched = topics.filter((t) => t.toLowerCase().includes(q.toLowerCase()));
  const pageSize = 4;
  const start = (page - 1) * pageSize;
  const items = matched.slice(start, start + pageSize);
  return {
    items: items.length > 0 ? items : [`Custom result for "${q}" (Page ${page})`],
    hasMore: start + pageSize < Math.max(matched.length, 8),
  };
};

export default function Search({
  fetchResults = defaultFetchResults,
  debounceTime = 300,
  throttleTime = 200,
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Debounced search
  const debouncedSearch = useDebounce(async (q, p = 1) => {
    if (!q.trim()) {
      setResults([]);
      setHasMore(false);
      return;
    }
    setIsLoading(true);
    const res = await fetchResults(q, p);
    setResults(p === 1 ? res.items : [...results, ...res.items]);
    setHasMore(res.hasMore);
    setIsLoading(false);
  }, debounceTime);

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    debouncedSearch(value, 1);
  };

  // Infinite scroll
  const handleScroll = useThrottle(() => {
    if (!hasMore || isLoading || !query.trim()) return;
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      const nextPage = page + 1;
      setPage(nextPage);
      debouncedSearch(query, nextPage);
    }
  }, throttleTime);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [query, page, hasMore, isLoading]);

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-emerald">Advanced Patterns</span>
            <span className="stat-pill">Debounce ({debounceTime}ms) &amp; Throttle ({throttleTime}ms)</span>
          </div>
          <h1 className="demo-title">Infinite Scroll Search</h1>
          <p className="demo-desc">
            Combines debounced input capture with throttled window scroll detection for smooth infinite pagination.
          </p>
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative", marginBottom: "20px" }}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            placeholder="Type to search topics (e.g. React, Hook, State)..."
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
        </div>

        {/* Results List */}
        {results.length > 0 ? (
          <div className="modern-list" style={{ marginBottom: "20px" }}>
            {results.map((item, i) => (
              <div key={i} className="modern-list-item">
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.2rem" }}>📄</span>
                  <span style={{ color: "#f8fafc", fontSize: "0.92rem", fontWeight: "500" }}>
                    {item}
                  </span>
                </div>
                <span className="stat-pill">Index #{i + 1}</span>
              </div>
            ))}
          </div>
        ) : query ? (
          !isLoading && (
            <div className="modern-empty-state">
              <div className="modern-empty-state-icon">🔍</div>
              <p>No results found for "{query}".</p>
            </div>
          )
        ) : (
          <div className="modern-empty-state">
            <div className="modern-empty-state-icon">⚡</div>
            <p>Type a search query above. As you scroll down, additional pages load automatically.</p>
          </div>
        )}

        {isLoading && (
          <div style={{ textAlign: "center", padding: "12px", color: "#38bdf8", fontSize: "0.88rem" }}>
            Loading additional results...
          </div>
        )}

        {!hasMore && results.length > 0 && (
          <div style={{ textAlign: "center", padding: "12px", color: "#64748b", fontSize: "0.82rem" }}>
            ✓ All results loaded for this query.
          </div>
        )}
      </div>
    </div>
  );
}
