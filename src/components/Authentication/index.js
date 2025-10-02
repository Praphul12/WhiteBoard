import React, { useState } from "react";
import "./index.css"; // renamed for clarity

export default function Auth({ onLogin }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(""); // success | error

  const isSignup = mode === "signup";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isSignup
      ? "https://collaboard-backend-4zw3.onrender.com/register"
      : "https://collaboard-backend-4zw3.onrender.com/login";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.token && data.user) {
          // console.log(data.user);
          localStorage.setItem("token", data.token);
          localStorage.setItem("userId", data.user.userId);
          localStorage.setItem("userName", data.user.name);
          onLogin(data.token);
        }
        setStatus("success");
        setMessage(isSignup ? "Signup successful. Welcome!" : "Login successful.");
        setForm({ name: "", email: "", password: "" });
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-page">
      {/* App Branding */}
      <h1 className="app-title">CollaBoard</h1>

      {/* Mode Toggle */}
      <div className="auth-toggle">
        <button
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Login
        </button>
        <button
          className={mode === "signup" ? "active" : ""}
          onClick={() => setMode("signup")}
        >
          Sign Up
        </button>
      </div>

      {/* Auth Form */}
      <div className="auth-container">
        <h2>{isSignup ? "Create Account" : "Welcome Back"}</h2>

        {message && (
          <div className={`auth-message ${status}`}>{message}</div>
        )}

        <form onSubmit={handleSubmit}>
          {isSignup && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
      </div>
    </div>
  );
}
