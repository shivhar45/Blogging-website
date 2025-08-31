import { Link } from "react-router-dom";

function Navbar({ onLogout, user }) {
  return (
    <nav style={{
      background: "linear-gradient(90deg, #000000ff)",
      padding: "0.8rem 1.5rem",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "#fff",
      height:"80px"
    }}>
      {/* LEFT SIDE */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link to="/" style={{ fontSize: "1.3rem", fontWeight: "700", textDecoration: "none", color: "#fff" }}>
          📝 Blogify
        </Link>

        <Link to="/" style={linkStyle}>Home</Link>

        {!user ? (
          <>
            <Link to="/register" style={linkStyle}>Register</Link>
            <Link to="/login" style={linkStyle}>Login</Link>
          </>
        ) : (
          <Link to="/create" style={linkStyle}>Create</Link>
        )}
      </div>

      {/* RIGHT SIDE */}
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span>Hi, {user.username}</span>
          <button onClick={onLogout} style={logoutBtn}>Logout</button>
        </div>
      )}
    </nav>
  );
}

const linkStyle = {
  textDecoration: "none",
  color: "#fff",
  fontWeight: "500",
};

const logoutBtn = {
  background: "#ff4444",
  border: "none",
  padding: "6px 12px",
  borderRadius: "6px",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};

export default Navbar;
