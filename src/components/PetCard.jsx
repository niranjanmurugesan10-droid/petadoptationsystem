import { useState } from "react";

function PetCard({ pet }) {
  const [showForm, setShowForm] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      phone: "",
      address: "",
      message: ""
    });

  function handleChange(event) {
    const { name, value } =
      event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function openForm() {
    const token =
      localStorage.getItem(
        "smartPetToken"
      );

    const user = JSON.parse(
      localStorage.getItem(
        "smartPetUser"
      ) || "null"
    );

    if (!token || !user) {
      setMessage(
        "Please login to request adoption."
      );
      return;
    }

    if (user.role !== "adopter") {
      setMessage(
        "Only adopters can request adoption."
      );
      return;
    }

    setFormData({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: "",
      message: ""
    });

    setMessage("");
    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    const token =
      localStorage.getItem(
        "smartPetToken"
      );

    const user = JSON.parse(
      localStorage.getItem(
        "smartPetUser"
      ) || "null"
    );

    if (!token || !user) {
      setMessage(
        "Please login to request adoption."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/adoptions",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
            Authorization:
              `Bearer ${token}`
          },
          body: JSON.stringify({
            petId: pet._id,
            ...formData
          })
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        setMessage(
          data.message ||
            "Request failed"
        );
        return;
      }

      setMessage(
        "Adoption request sent successfully! 🐾"
      );

      setTimeout(() => {
        setShowForm(false);
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
    <>
      <div className="pet-card">

        <div className="pet-image-wrapper">

          {pet.image ? (
            <img
              src={pet.image}
              alt={pet.name}
              className="pet-image"
            />
          ) : (
            <div className="pet-placeholder">
              🐶
            </div>
          )}

          {pet.adopted && (
            <span className="adopted-overlay">
              ADOPTED
            </span>
          )}

        </div>

        <div className="pet-card-content">

          <h2>{pet.name}</h2>

          <div className="pet-meta">

            <span>
              🐾 {pet.breed}
            </span>

            <span>
              🎂 {pet.age} years
            </span>

            <span>
              {pet.gender === "Male"
                ? "♂"
                : "♀"}{" "}
              {pet.gender}
            </span>

          </div>

          <p className="pet-description">
            {pet.description}
          </p>

          {!pet.adopted ? (
            <button
              className="adopt-btn"
              onClick={openForm}
            >
              Request Adoption
            </button>
          ) : (
            <button
              className="adopt-btn disabled-btn"
              disabled
            >
              Already Adopted
            </button>
          )}

          {message && (
            <p className="card-message">
              {message}
            </p>
          )}

        </div>

      </div>

      {showForm && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (
              e.target.className ===
              "modal-overlay"
            ) {
              setShowForm(false);
            }
          }}
        >

          <div className="modal-card">

            <button
              className="modal-close"
              onClick={() =>
                setShowForm(false)
              }
            >
              ×
            </button>

            <div className="modal-header">

              <p className="section-label">
                ADOPTION REQUEST
              </p>

              <h2>
                Adopt {pet.name} 🐾
              </h2>

              <p>
                Send your request to
                the pet owner.
              </p>

            </div>

            <form
              className="auth-form"
              onSubmit={handleSubmit}
            >

              <div className="form-group">
                <label>Name</label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email</label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone</label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Address</label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Message</label>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Why do you want to adopt this pet?"
                  required
                />
              </div>

              {message && (
                <p className="card-message">
                  {message}
                </p>
              )}

              <button
                type="submit"
                className="adopt-btn"
                disabled={loading}
              >
                {loading
                  ? "Sending..."
                  : "Send Adoption Request"}
              </button>

            </form>

          </div>

        </div>
      )}
    </>
  );
}

export default PetCard;