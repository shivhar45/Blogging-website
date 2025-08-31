import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        marginTop: "1rem",
        padding: "1.5rem",
        background: "linear-gradient(90deg, #000000ff, #1a1a1a)",
        color: "#fff",
        borderTopLeftRadius: "12px",
        borderTopRightRadius: "12px",
        
      }}
    >
      {/* Top row: Links left, Icons right */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: "1rem"
      }}>
        {/* Links Left */}
        <div>
          <a href="#" style={linkStyle}>Help</a>
          <a href="#" style={linkStyle}>Privacy Policy</a>
          <a href="#" style={linkStyle}>Terms of Service</a>
          <a href="#" style={linkStyle}>Blog</a>
        </div>

        {/* Social Icons Right */}
        <div style={{ fontSize: "22px" }}>
          <a href="#" style={iconStyle}><FaFacebook /></a>
          <a href="#" style={iconStyle}><FaTwitter /></a>
          <a href="#" style={iconStyle}><FaInstagram /></a>
          <a href="#" style={iconStyle}><FaLinkedin /></a>
          <a href="#" style={iconStyle}><FaGithub /></a>
          <a href="#" style={iconStyle}><FaYoutube /></a>
        </div>
      </div>

      {/* Footer Text Center */}
      <p style={{ textAlign: "center", marginTop: "10px", marginBottom:"5px" }}>
        🌐 Blogify &copy; {new Date().getFullYear()} | Crafted with ❤️
      </p>
    </footer>
  );
}

const linkStyle = {
  margin: "0 12px",
  color: "#fff",
  textDecoration: "none",
  fontWeight: "500",
};

const iconStyle = {
  margin: "0 8px",
  color: "#fff",
  transition: "transform 0.2s ease-in-out",
};

export default Footer;
