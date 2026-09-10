import React, { useState, useEffect } from "react";

// Todo Input Component
function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = (e) => {
    e?.preventDefault();
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <form onSubmit={handleAdd} style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="modern-input"
        style={{ flex: 1 }}
      />
      <button type="submit" className="btn btn-primary" style={{ whiteSpace: "nowrap" }}>
        + Add Task
      </button>
    </form>
  );
}

// Todo Item Component
function TodoItem({ todo, toggleComplete, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const saveEdit = (e) => {
    e?.preventDefault();
    if (newText.trim()) {
      editTodo(todo.id, newText.trim());
      setIsEditing(false);
    }
  };

  const cancelEdit = () => {
    setNewText(todo.text);
    setIsEditing(false);
  };

  return (
    <li
      className="modern-list-item"
      style={{
        background: todo.completed ? "rgba(255, 255, 255, 0.02)" : "rgba(255, 255, 255, 0.04)",
        borderColor: todo.completed ? "rgba(255, 255, 255, 0.04)" : "rgba(255, 255, 255, 0.08)",
      }}
    >
      {isEditing ? (
        <form onSubmit={saveEdit} style={{ display: "flex", gap: "8px", width: "100%" }}>
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="modern-input"
            style={{ flex: 1, padding: "6px 12px", fontSize: "0.88rem" }}
            autoFocus
          />
          <button type="submit" className="btn btn-success btn-sm">
            Save
          </button>
          <button type="button" onClick={cancelEdit} className="btn btn-secondary btn-sm">
            Cancel
          </button>
        </form>
      ) : (
        <>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
              style={{
                width: "18px",
                height: "18px",
                accentColor: "#38bdf8",
                cursor: "pointer",
              }}
            />
            <span
              style={{
                fontSize: "0.92rem",
                color: todo.completed ? "#64748b" : "#f1f5f9",
                textDecoration: todo.completed ? "line-through" : "none",
                transition: "color 0.2s ease",
              }}
            >
              {todo.text}
            </span>
          </div>

          <div style={{ display: "flex", gap: "6px" }}>
            <button
              onClick={() => setIsEditing(true)}
              className="btn btn-secondary btn-sm"
              title="Edit Task"
            >
              ✏️
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="btn btn-danger btn-sm"
              title="Delete Task"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </li>
  );
}

// Filter Buttons Component
function FilterButtons({ filter, setFilter, counts }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        background: "rgba(15, 23, 42, 0.6)",
        padding: "4px",
        borderRadius: "12px",
        border: "1px solid rgba(255, 255, 255, 0.06)",
        marginTop: "20px",
      }}
    >
      {[
        { id: "all", label: "All", count: counts.all },
        { id: "active", label: "Active", count: counts.active },
        { id: "completed", label: "Completed", count: counts.completed },
      ].map((f) => {
        const isActive = filter === f.id;
        return (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            style={{
              flex: 1,
              padding: "8px 12px",
              borderRadius: "8px",
              border: "none",
              background: isActive ? "var(--primary-gradient)" : "transparent",
              color: isActive ? "#ffffff" : "#94a3b8",
              fontSize: "0.82rem",
              fontWeight: isActive ? "600" : "500",
              cursor: "pointer",
              transition: "all 0.2s ease",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
            }}
          >
            <span>{f.label}</span>
            <span
              style={{
                fontSize: "0.72rem",
                padding: "2px 6px",
                borderRadius: "9999px",
                background: isActive ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.08)",
              }}
            >
              {f.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

// Main Todo App
function Todo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved
      ? JSON.parse(saved)
      : [
          { id: "1", text: "Master React useState & useEffect hooks", completed: true },
          { id: "2", text: "Explore modern glassmorphism design system", completed: false },
          { id: "3", text: "Build high performance React web apps", completed: false },
        ];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) =>
    setTodos([...todos, { id: Date.now().toString(), text, completed: false }]);

  const toggleComplete = (id) =>
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

  const editTodo = (id, newText) =>
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
    );

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const filteredTodos = todos.filter((todo) =>
    filter === "all" ? true : filter === "active" ? !todo.completed : todo.completed
  );

  const counts = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  return (
    <div className="demo-container">
      <div className="demo-card" style={{ maxWidth: "560px", margin: "0 auto" }}>
        <div className="demo-header">
          <div className="demo-badge-row">
            <span className="demo-badge demo-badge-emerald">Local Storage State</span>
            <span className="stat-pill">💾 Auto-saved</span>
          </div>
          <h1 className="demo-title">Task Planner</h1>
          <p className="demo-desc">
            Interactive task organizer with persistence, status filters, and inline editing.
          </p>
        </div>

        <TodoInput addTodo={addTodo} />

        {filteredTodos.length > 0 ? (
          <ul className="modern-list">
            {filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                editTodo={editTodo}
                deleteTodo={deleteTodo}
              />
            ))}
          </ul>
        ) : (
          <div className="modern-empty-state">
            <div className="modern-empty-state-icon">📋</div>
            <p>No {filter !== "all" ? filter : ""} tasks found</p>
          </div>
        )}

        <FilterButtons filter={filter} setFilter={setFilter} counts={counts} />
      </div>
    </div>
  );
}

export default Todo;
