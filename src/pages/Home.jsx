import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import bgImage from "../assets/Tamazgha.jpeg"; // import your image

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      className="home-page"
      style={{ backgroundImage: `url(${bgImage})` }} // set background
    >
      <div className="overlay">
        <h1 className="home-title">Welcome to Tamazgha Trading Platform</h1>
        <div className="button-group">
          <button className="home-button" onClick={() => navigate("/")}>
            Home
          </button>
          <button className="auth-button" onClick={() => navigate("/login")}>
            Login
          </button>
          <button className="auth-button" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
