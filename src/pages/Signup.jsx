import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // We'll create this CSS file

const SignupPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("https://miniature-enigma-rq46v7ggvx63xqwr-3000.app.github.dev/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Signup successful! Welcome, " + formData.firstName);
        setFormData({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } else {
        setMessage("Error: " + data.error);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="signup-page">
      <div className="home-button-container">
        <button className="home-button" onClick={() => navigate("/")}>
          Home
        </button>
      </div>

      <form className="signup-card" onSubmit={handleSubmit}>
        <h2 className="signup-title">Create an Account</h2>

        {message && <p className="signup-message">{message}</p>}

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <button type="submit" className="signup-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;