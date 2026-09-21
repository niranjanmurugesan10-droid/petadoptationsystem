import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "adopter"
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.password
    ) {
      setMessage(
        "Please fill all fields"
      );
      return;
    }

    if (formData.password.length < 6) {
      setMessage(
        "Password must be at least 6 characters"
      );
      return;
    }

    if (formData.phone.length < 10) {
      setMessage(
        "Please enter a valid phone number"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/auth/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            password: formData.password,
            role: formData.role
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Registration failed"
        );
        return;
      }

      localStorage.setItem(
        "smartPetUser",
        JSON.stringify(data.user)
      );

      setMessage(
        "Registration successful! Please login 🐾"
      );

      setTimeout(() => {
        navigate("/login");
      }, 800);

    } catch (error) {
      console.error(error);

      setMessage(
        "Cannot connect to server"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <p className="section-label">
            SMART PET
          </p>

          <h1>
            Create Account 🐾
          </h1>

          <p>
            Join our smart pet adoption community.
          </p>

        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>
              Full Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>


          <div className="form-group">
            <label>
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>


          <div className="form-group">
            <label>
              Mobile Number
            </label>

            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter mobile number"
              autoComplete="tel"
            />
          </div>


          <div className="form-group">
            <label>
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
              autoComplete="new-password"
            />
          </div>


          <div className="form-group">
            <label>
              Account Type
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="adopter">
                Pet Adopter
              </option>

              <option value="owner">
                Pet Owner
              </option>
            </select>
          </div>


          {message && (
            <p className="auth-message">
              {message}
            </p>
          )}


          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default Register;