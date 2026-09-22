import { useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function AddPet() {
  const [formData, setFormData] = useState({
    name: "",
    breed: "",
    age: "",
    gender: "Male",
    description: "",
    image: ""
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const user = JSON.parse(
    localStorage.getItem("smartPetUser") || "null"
  );

  const token = localStorage.getItem(
    "smartPetToken"
  );

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        image: reader.result
      }));
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage("");

    const currentUser = JSON.parse(
      localStorage.getItem("smartPetUser") || "null"
    );

    const currentToken =
      localStorage.getItem("smartPetToken");

    if (!currentUser || !currentToken) {
      setMessage("Please login first");
      return;
    }

    if (
      currentUser.role !== "owner" &&
      currentUser.role !== "admin"
    ) {
      setMessage(
        "Only pet owners can add pets."
      );
      return;
    }

    if (
      !formData.name ||
      !formData.breed ||
      formData.age === "" ||
      !formData.description
    ) {
      setMessage(
        "Please fill all required fields"
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/pets`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentToken}`
          },

          body: JSON.stringify({
            name: formData.name,
            breed: formData.breed,
            age: Number(formData.age),
            gender: formData.gender,
            description: formData.description,
            image: formData.image
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(
          data.message || "Failed to add pet"
        );
        return;
      }

      setMessage(
        "Pet added successfully! 🐾"
      );

      setFormData({
        name: "",
        breed: "",
        age: "",
        gender: "Male",
        description: "",
        image: ""
      });

    } catch (error) {
      console.error(
        "ADD PET ERROR:",
        error
      );

      setMessage(
        "Cannot connect to server"
      );
    } finally {
      setLoading(false);
    }
  }

  if (!user || !token) {
    return (
      <div className="page">
        <div className="auth-card">
          <h2>Owner Login Required</h2>

          <p>
            Please login as a pet owner to add pets.
          </p>
        </div>
      </div>
    );
  }

  if (
    user.role !== "owner" &&
    user.role !== "admin"
  ) {
    return (
      <div className="page">
        <div className="auth-card">
          <h2>Owner Account Required</h2>

          <p>
            Your current account is registered as
            <strong> {user.role}</strong>.
          </p>

          <p>
            Please create a Pet Owner account to
            add pets.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <p className="section-label">
            PET OWNER
          </p>

          <h1>
            Add New Pet 🐾
          </h1>

          <p>
            Add a pet for adoption.
          </p>
        </div>

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          <div className="form-group">
            <label>Pet Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Example: Max"
            />
          </div>

          <div className="form-group">
            <label>Breed</label>

            <input
              type="text"
              name="breed"
              value={formData.breed}
              onChange={handleChange}
              placeholder="Example: Golden Retriever"
            />
          </div>

          <div className="form-group">
            <label>Age</label>

            <input
              type="number"
              name="age"
              min="0"
              value={formData.age}
              onChange={handleChange}
              placeholder="Age in years"
            />
          </div>

          <div className="form-group">
            <label>Gender</label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell something about the pet..."
              rows="5"
            />
          </div>

          <div className="form-group">
            <label>Pet Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          {formData.image && (
            <img
              src={formData.image}
              alt="Pet preview"
              style={{
                width: "100%",
                maxHeight: "300px",
                objectFit: "cover",
                borderRadius: "12px"
              }}
            />
          )}

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
              ? "Adding Pet..."
              : "Add Pet"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddPet;