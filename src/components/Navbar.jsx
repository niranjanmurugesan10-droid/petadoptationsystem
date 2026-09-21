import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("smartPetUser") || "null"
  );

  function closeMenu() {
    setMenuOpen(false);
  }

  function handleLogout() {
    localStorage.removeItem("smartPetToken");
    localStorage.removeItem("smartPetUser");

    setMenuOpen(false);
    navigate("/login");
  }

  return (
    <nav className="navbar">

      <div className="navbar-container">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar-logo"
          onClick={closeMenu}
        >
          <span className="logo-icon">🐾</span>

          <div>
            <strong>Smart Pet</strong>
            <span>Adoption</span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="navbar-links">

          <Link to="/">Home</Link>

          <Link to="/pets">Find Pets</Link>

          {user?.role === "adopter" && (
            <Link to="/my-requests">
              My Requests
            </Link>
          )}

          {(user?.role === "owner" ||
            user?.role === "admin") && (
            <>
              <Link to="/add-pet">
                Add Pet
              </Link>

              <Link to="/manage-pets">
                Manage Pets
              </Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login" className="nav-login">
                Login
              </Link>

              <Link
                to="/register"
                className="nav-register"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              className="nav-logout"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="menu-toggle"
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`mobile-menu ${
          menuOpen ? "mobile-menu-open" : ""
        }`}
      >

        <Link
          to="/"
          onClick={closeMenu}
        >
          Home
        </Link>

        <Link
          to="/pets"
          onClick={closeMenu}
        >
          Find Pets
        </Link>

        {user?.role === "adopter" && (
          <Link
            to="/my-requests"
            onClick={closeMenu}
          >
            My Requests
          </Link>
        )}

        {(user?.role === "owner" ||
          user?.role === "admin") && (
          <>
            <Link
              to="/add-pet"
              onClick={closeMenu}
            >
              Add Pet
            </Link>

            <Link
              to="/manage-pets"
              onClick={closeMenu}
            >
              Manage Pets
            </Link>
          </>
        )}

        {!user ? (
          <>
            <Link
              to="/login"
              onClick={closeMenu}
              className="mobile-login"
            >
              Login
            </Link>

            <Link
              to="/register"
              onClick={closeMenu}
              className="mobile-register"
            >
              Register
            </Link>
          </>
        ) : (
          <button
            className="mobile-logout"
            onClick={handleLogout}
          >
            Logout
          </button>
        )}

      </div>

    </nav>
  );
}

export default Navbar;