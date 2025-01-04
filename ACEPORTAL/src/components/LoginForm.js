// JavaScript
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/LoginForm.css";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(email, password);
      if (success) {
        const redirectPath =
          currentUser?.role === "admin" ? "/admin/dashboard" : "/member/dashboard";
        navigate(redirectPath);
      }
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-form">
      <h2>Login to ACE Portal</h2>
      {error && <p className="login-form__error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="login-form__group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="login-form__group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-form__button">
          Login
        </button>
        <p className="login-form__register-link">
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;