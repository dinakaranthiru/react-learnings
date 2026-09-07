import React, { useState, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

const NAV_ITEMS = [
  { path: "/", label: "Home", category: "all", icon: "🏠" },
  { path: "/usestate", label: "useState", category: "hooks", icon: "⚛️" },
  { path: "/useEffect", label: "useEffect", category: "hooks", icon: "🔄" },
  { path: "/props", label: "Props", category: "hooks", icon: "🧩" },
  { path: "/counter", label: "Counter", category: "ui", icon: "🔢" },
  { path: "/toggle", label: "Toggle", category: "ui", icon: "🔘" },
  { path: "/tabs", label: "Tabs", category: "ui", icon: "🗂️" },
  { path: "/theme", label: "Theme", category: "ui", icon: "🎨" },
  { path: "/stopwatch", label: "Stopwatch", category: "ui", icon: "⏱️" },
  { path: "/file", label: "File Explorer", category: "ui", icon: "📁" },
  { path: "/form", label: "Form", category: "forms", icon: "📝" },
  { path: "/event", label: "Event", category: "forms", icon: "⚡" },
  { path: "/search", label: "Search", category: "forms", icon: "🔍" },
  { path: "/filter", label: "Filter", category: "forms", icon: "🎛️" },
  { path: "/debounce", label: "Debounce", category: "forms", icon: "⏳" },
  { path: "/api", label: "API", category: "data", icon: "🌐" },
  { path: "/pagination", label: "Pagination", category: "data", icon: "📑" },
  { path: "/todo", label: "Todo", category: "data", icon: "✅" },
  { path: "/cart", label: "Cart", category: "data", icon: "🛒" },
  { path: "/learn", label: "Learn", category: "data", icon: "💡" },
];

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "hooks", label: "Hooks" },
  { id: "ui", label: "UI & State" },
  { id: "forms", label: "Forms & Events" },
  { id: "data", label: "Data & API" },
];

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollRef = useRef(null);

  // Filter items by category & search query
  const filteredItems = NAV_ITEMS.filter((item) => {
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch =
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.path.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <header className="modern-navbar-wrapper">
      {/* Animated gradient top edge */}
      <div className="nav-accent-bar" />

      {/* Main Top Header */}
      <div className="nav-primary-row">
        {/* Brand */}
        <Link to="/" className="nav-brand">
          <div className="nav-brand-icon">
            <svg
              width="22"
              height="22"
              viewBox="-11.5 -10.23174 23 20.46348"
              fill="currentColor"
            >
              <circle cx="0" cy="0" r="2.05" fill="#38bdf8" />
              <g stroke="#38bdf8" strokeWidth="1" fill="none">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
              </g>
            </svg>
          </div>
          <div className="nav-brand-text-container">
            <span className="nav-brand-title">ReactLab</span>
            <span className="nav-brand-subtitle">Interactive Demos</span>
          </div>
        </Link>

        {/* Center Controls: Search + Categories */}
        <div className="nav-center-controls">
          <div className="nav-search-wrapper">
            <span className="nav-search-icon">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search topics (e.g. Hooks, API, Props)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="nav-search-input"
            />
            {searchQuery && (
              <button
                className="nav-search-clear"
                onClick={() => setSearchQuery("")}
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          <div className="nav-category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                className={`category-pill-btn ${
                  selectedCategory === cat.id ? "active" : ""
                }`}
                onClick={() => setSelectedCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Right Stats & Mobile Toggle */}
        <div className="nav-right-actions">
          <div className="nav-badge-count">
            <span className="nav-badge-dot" />
            <span>{NAV_ITEMS.length} Demos</span>
          </div>

          <button
            className="nav-mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Sub Bar: Horizontal Scrollable Chips */}
      <div className="nav-scroll-container">
        <button
          className="nav-scroll-btn left"
          onClick={() => scroll("left")}
          aria-label="Scroll left"
        >
          ‹
        </button>

        <div className="nav-links-track" ref={scrollRef}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `nav-link-pill ${isActive ? "active" : ""}`
                }
              >
                <span className="nav-link-icon">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))
          ) : (
            <div className="nav-empty-search">
              No matching demos found for "{searchQuery}"
            </div>
          )}
        </div>

        <button
          className="nav-scroll-btn right"
          onClick={() => scroll("right")}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>

      {/* Mobile Drawer (Visible on smaller screens when toggled) */}
      <div className={`nav-mobile-drawer ${mobileMenuOpen ? "open" : ""}`}>
        <div style={{ marginBottom: "12px" }}>
          <input
            type="text"
            placeholder="Search all demos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="nav-search-input"
            style={{ width: "100%", boxSizing: "border-box" }}
          />
        </div>

        <div className="mobile-grid">
          {filteredItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              onClick={() => setMobileMenuOpen(false)}
              className={({ isActive }) =>
                `mobile-nav-link ${isActive ? "active" : ""}`
              }
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;