import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>My App</h2>

      <div style={styles.links}>
        <Link to="/" style={styles.link}>Home</Link>
        <Link to="/props" style={styles.link}>Props</Link>
        <Link to="/api" style={styles.link}>API</Link>
        <Link to="/pagination" style={styles.link}>Pagination</Link>
        <Link to="/counter" style={styles.link}>Counter</Link>
        <Link to="/search" style={styles.link}>Search</Link>
        <Link to="/filter" style={styles.link}>Filter</Link>
        <Link to="/todo" style={styles.link}>Todo</Link>
        <Link to="/toggle" style={styles.link}>Toggle</Link>
        <Link to="/form" style={styles.link}>Form</Link>
        <Link to="/theme" style={styles.link}>Theme</Link>
        <Link to="/tabs" style={styles.link}>Tabs</Link>
        <Link to="/cart" style={styles.link}>Cart</Link>
        <Link to="/learn" style={styles.link}>Learn</Link>
        <Link to="/useEffect" style={styles.link}>Useffcet</Link>
        <Link to="/file" style={styles.link}>file</Link>
        <Link to="/debounce" style={styles.link}>Debounce</Link>
        <Link to="/stopwatch" style={styles.link}>Stopwatch</Link>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#282c34",
  },
  logo: {
    color: "#fff",
  },
  links: {
    display: "flex",
    gap: "15px",
  },
  link: {
    color: "#61dafb",
    textDecoration: "none",
    fontWeight: "bold",
  },
};

export default Navbar;