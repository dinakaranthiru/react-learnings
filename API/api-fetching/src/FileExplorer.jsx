import React, { useState, memo, useCallback } from "react";

// Mock Data Structure
const mockFileData = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      {
        id: "2",
        name: "components",
        type: "folder",
        children: [
          { id: "3", name: "Navbar.jsx", type: "file", size: "9.1 KB" },
          { id: "4", name: "Navbar.css", type: "file", size: "8.9 KB" },
          { id: "5", name: "Counter.jsx", type: "file", size: "1.4 KB" },
        ],
      },
      {
        id: "6",
        name: "hooks",
        type: "folder",
        children: [
          { id: "7", name: "UseState.jsx", type: "file", size: "2.1 KB" },
          { id: "8", name: "USEEFFECT.jsx", type: "file", size: "4.8 KB" },
        ],
      },
      { id: "9", name: "App.jsx", type: "file", size: "3.2 KB" },
      { id: "10", name: "index.css", type: "file", size: "4.5 KB" },
    ],
  },
  { id: "11", name: "package.json", type: "file", size: "0.6 KB" },
  { id: "12", name: "vite.config.js", type: "file", size: "0.4 KB" },
];

function getFileIcon(filename) {
  if (filename.endsWith(".jsx") || filename.endsWith(".js")) return "⚛️";
  if (filename.endsWith(".json")) return "📦";
  if (filename.endsWith(".css")) return "🎨";
  return "📄";
}

// Recursive Node Component
const TreeNode = memo(({ node, expanded, toggle, selectedId, onSelect, depth = 0 }) => {
  const isFolder = node.type === "folder";
  const isOpen = expanded.has(node.id);
  const isSelected = selectedId === node.id;

  return (
    <div style={{ marginLeft: depth > 0 ? "16px" : "0" }}>
      <div
        onClick={() => {
          if (isFolder) toggle(node.id);
          onSelect(node);
        }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "6px 10px",
          borderRadius: "8px",
          cursor: "pointer",
          userSelect: "none",
          transition: "background-color 0.15s ease",
          background: isSelected
            ? "rgba(56, 189, 248, 0.15)"
            : "transparent",
          color: isSelected ? "#38bdf8" : "#cbd5e1",
          fontSize: "0.88rem",
          margin: "2px 0",
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.04)";
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.backgroundColor = "transparent";
        }}
      >
        {isFolder ? (
          <span
            style={{
              display: "inline-block",
              width: "16px",
              fontSize: "0.75rem",
              color: "#64748b",
              transform: isOpen ? "rotate(90deg)" : "none",
              transition: "transform 0.15s ease",
            }}
          >
            ▶
          </span>
        ) : (
          <span style={{ width: "16px" }} />
        )}

        <span>{isFolder ? (isOpen ? "📂" : "📁") : getFileIcon(node.name)}</span>

        <span style={{ fontWeight: isFolder ? "600" : "400" }}>{node.name}</span>

        {node.size && (
          <span style={{ marginLeft: "auto", fontSize: "0.75rem", color: "#64748b" }}>
            {node.size}
          </span>
        )}
      </div>

      {isFolder &&
        isOpen &&
        node.children?.map((child) => (
          <TreeNode
            key={child.id}
            node={child}
            expanded={expanded}
            toggle={toggle}
            selectedId={selectedId}
            onSelect={onSelect}
            depth={depth + 1}
          />
        ))}
    </div>
  );
});

function FileExplorer({ data = mockFileData }) {
  const [expanded, setExpanded] = useState(new Set(["1", "2"]));
  const [selectedFile, setSelectedFile] = useState(null);

  const toggle = useCallback((id) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  const handleSelect = (node) => {
    setSelectedFile(node);
  };

  return (
    <div className="demo-container">
      <div className="demo-card">
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge">Recursive Tree Component</span>
            <span className="stat-pill">Memoized with useCallback</span>
          </div>
          <h1 className="demo-title">File Explorer Tree</h1>
          <p className="demo-desc">
            Visualizes nested hierarchical tree structures with recursive components and collapsible branches.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {/* Tree View Box */}
          <div
            style={{
              background: "rgba(10, 15, 29, 0.7)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "16px",
              maxHeight: "380px",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                fontSize: "0.75rem",
                color: "#64748b",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontWeight: "600",
                marginBottom: "10px",
              }}
            >
              Workspace Explorer
            </div>

            {data.map((node) => (
              <TreeNode
                key={node.id}
                node={node}
                expanded={expanded}
                toggle={toggle}
                selectedId={selectedFile?.id}
                onSelect={handleSelect}
              />
            ))}
          </div>

          {/* Details / Preview Pane */}
          <div
            style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "14px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {selectedFile ? (
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
                  <span style={{ fontSize: "1.8rem" }}>
                    {selectedFile.type === "folder" ? "📁" : getFileIcon(selectedFile.name)}
                  </span>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "1.1rem", color: "#f8fafc" }}>
                      {selectedFile.name}
                    </h3>
                    <span style={{ fontSize: "0.8rem", color: "#38bdf8" }}>
                      Type: {selectedFile.type.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    background: "rgba(255, 255, 255, 0.03)",
                    padding: "12px",
                    borderRadius: "8px",
                    fontSize: "0.84rem",
                    color: "#94a3b8",
                    lineHeight: "1.6",
                  }}
                >
                  <div><strong>Node ID:</strong> #{selectedFile.id}</div>
                  {selectedFile.size && <div><strong>File Size:</strong> {selectedFile.size}</div>}
                  <div>
                    <strong>Status:</strong>{" "}
                    {selectedFile.type === "folder"
                      ? expanded.has(selectedFile.id) ? "Expanded" : "Collapsed"
                      : "Ready to edit"}
                  </div>
                </div>
              </div>
            ) : (
              <div className="modern-empty-state">
                <div className="modern-empty-state-icon">🖱️</div>
                <p>Click any file or folder in the tree to inspect details.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileExplorer;
