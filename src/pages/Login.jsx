import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (!formData.email || !formData.password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      // Save JWT token
      localStorage.setItem(
        "smartPetToken",
        data.token
      );

      // Save logged-in user
      localStorage.setItem(
        "smartPetUser",
        JSON.stringify(data.user)
      );

      setMessage("Login successful! 🐾");

      setTimeout(() => {
        if (
          data.user.role === "owner" ||
          data.user.role === "admin"
        ) {
          navigate("/manage-pets");
        } else {
          navigate("/pets");
        }
      }, 500);

    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setMessage(
        "Cannot connect to server. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page auth-page">
      <div className="auth-container">

        <div className="auth-header">
          <p className="section-label">
            PET ADOPTION
          </p>

          <h1>
            Welcome Back 🐾
          </h1>

          <p>
            Login to your SmartPet account and continue
            your pet adoption journey.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          {message && (
            <p className="form-message">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login 🐾"}
          </button>

        </form>

        <div className="auth-footer">
          <p>
            Don't have an account?
          </p>

          <Link to="/register">
            Create an Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;