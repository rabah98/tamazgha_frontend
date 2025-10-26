import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const navStyle = {
    backgroundColor: "#4f46e5",
    padding: "15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    color: "white",
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
  };
  console.log("Navbar rendered!");

  return (
    <nav style={navStyle}>
      <Link to="/" style={linkStyle}>Dashboard</Link>
      <Link to="/listings" style={linkStyle}>Listings</Link>
      <Link to="/messages" style={linkStyle}>Messages</Link>
      <Link to="/login" style={linkStyle}>Login</Link>
      <Link to="/signup" style={linkStyle}>Signup</Link>
    </nav>
  );
}

export default Navbar;
