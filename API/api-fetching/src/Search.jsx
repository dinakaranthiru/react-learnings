import React, { useState, useEffect, useRef, useCallback } from "react";

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

export default function Search({ fetchResults, debounceTime = 300, throttleTime = 200 }) {
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

  const handleChange = e => {
    const value = e.target.value;
    setQuery(value);
    setPage(1);
    debouncedSearch(value, 1);
  };

  // Infinite scroll
  const handleScroll = useThrottle(() => {
    if (!hasMore || isLoading) return;
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
    <div style={{ maxWidth: "600px", margin: "auto" }}>
      <input 
        type="text" 
        value={query} 
        onChange={handleChange} 
        placeholder="Search..." 
        style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
      />
      <ul>
        {results.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
      {isLoading && <p>Loading...</p>}
      {!hasMore && <p>No more results</p>}
    </div>
  );
}

