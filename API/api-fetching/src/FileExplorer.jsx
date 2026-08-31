import React, { useState, memo, useCallback } from "react";

// 1. Mock Data Structure to test the UI locally
const mockFileData = [
  {
    id: "1",
    name: "src",
    type: "folder",
    children: [
      { id: "2", name: "components", type: "folder", children: [{ id: "3", name: "Button.jsx", type: "file" }] },
      { id: "4", name: "App.jsx", type: "file" },
    ],
  },
  { id: "5", name: "package.json", type: "file" },
];

// Recursive Node Component (Performance optimized)
const TreeNode = memo(({ node, expanded, toggle }) => {
  const isFolder = node.type === "folder";
  const isOpen = expanded.has(node.id);

  return (
    <div style={{ marginLeft: "20px", fontFamily: "sans-serif", marginVertical: "5px" }}>
      <div
        style={{ cursor: isFolder ? "pointer" : "default", userSelect: "none" }}
        onClick={() => isFolder && toggle(node.id)}
      >
        {isFolder ? (isOpen ? "📂" : "📁") : "📄"} {node.name}
      </div>

      {isFolder && isOpen && node.children?.map(child => (
        <TreeNode 
          key={child.id} 
          node={child} 
          expanded={expanded} 
          toggle={toggle} 
        />
      ))}
    </div>
  );
});

// Root Component
// 2. Defaulting to mockFileData so it displays immediately if no props are passed
function FileExplorer({ data = mockFileData }) {
  const [expanded, setExpanded] = useState(new Set());

  // 3. Wrapped in useCallback to maintain reference identity across renders
  const toggle = useCallback((id) => {
    setExpanded(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, []);

  return (
    <div>
      {data.map(node => (
        <TreeNode 
          key={node.id}
          node={node}
          expanded={expanded}
          toggle={toggle}
        />
      ))}
    </div>
  );
}

export default FileExplorer;
