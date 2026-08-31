import React, { useState, useEffect } from "react";

// Todo Input Component
function TodoInput({ addTodo }) {
  const [text, setText] = useState("");

  const handleAdd = () => {
    if (text.trim()) {
      addTodo(text.trim());
      setText("");
    }
  };

  return (
    <div style={{ marginBottom: "10px" }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add todo..."
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}

// Todo Item Component
function TodoItem({ todo, toggleComplete, editTodo, deleteTodo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const saveEdit = () => {
    if (newText.trim()) {
      editTodo(todo.id, newText.trim());
      setIsEditing(false);
    }
  };

  return (
    <li style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      {isEditing ? (
        <>
          <input value={newText} onChange={(e) => setNewText(e.target.value)} />
          <button onClick={saveEdit}>Save</button>
        </>
      ) : (
        <>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />
          <span
            style={{ textDecoration: todo.completed ? "line-through" : "none" }}
          >
            {todo.text}
          </span>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </>
      )}
    </li>
  );
}

// Filter Buttons Component
function FilterButtons({ filter, setFilter }) {
  return (
    <div style={{ marginTop: "10px" }}>
      {["all", "active", "completed"].map((f) => (
        <button key={f} onClick={() => setFilter(f)} disabled={filter === f}>
          {f.charAt(0).toUpperCase() + f.slice(1)}
        </button>
      ))}
    </div>
  );
}

// Main Todo App
function Todo() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
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
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  const editTodo = (id, newText) =>
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const filteredTodos = todos.filter((todo) =>
    filter === "all"
      ? true
      : filter === "active"
        ? !todo.completed
        : todo.completed,
  );

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <h2>Todo App</h2>
      <TodoInput addTodo={addTodo} />
      <ul>
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
      <FilterButtons filter={filter} setFilter={setFilter} />
    </div>
  );
}

export default Todo;
