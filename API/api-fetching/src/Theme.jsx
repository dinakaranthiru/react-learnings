import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

  function Theme() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <Child />
    </ThemeContext.Provider>
  );
}

function Child() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === "dark" ? "black" : "white" }}>
      <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
        Toggle Theme
      </button>
    </div>
  );
}

export default Theme