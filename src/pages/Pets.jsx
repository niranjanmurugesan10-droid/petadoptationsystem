import { useEffect, useState } from "react";
import PetCard from "../components/PetCard";

const API_URL = import.meta.env.VITE_API_URL;

function Pets() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState("");
  const [breed, setBreed] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchPets() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/pets`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to fetch pets"
        );
      }

      setPets(data.pets || []);
    } catch (error) {
      console.error(error);

      setError(
        "Unable to load pets. Please make sure server is running."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPets();
  }, []);

  const breeds = [
    "All",
    ...new Set(
      pets.map((pet) => pet.breed)
    )
  ];

  const filteredPets = pets.filter(
    (pet) => {
      const searchText =
        search.toLowerCase();

      const matchesSearch =
        pet.name
          .toLowerCase()
          .includes(searchText) ||
        pet.breed
          .toLowerCase()
          .includes(searchText);

      const matchesBreed =
        breed === "All" ||
        pet.breed === breed;

      return (
        matchesSearch &&
        matchesBreed
      );
    }
  );

  return (
    <div className="page pets-page">

      <div className="page-header">

        <p className="section-label">
          SMART PET
        </p>

        <h1>
          Find Your New Friend 🐾
        </h1>

        <p>
          Browse pets available for adoption.
        </p>

      </div>

      <div className="pet-filters">

        <input
          type="text"
          placeholder="Search pet or breed..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={breed}
          onChange={(e) =>
            setBreed(e.target.value)
          }
        >
          {breeds.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {loading && (
        <div className="loading-box">
          Loading pets...
        </div>
      )}

      {error && (
        <div className="error-box">
          {error}
        </div>
      )}

      {!loading &&
        !error &&
        filteredPets.length === 0 && (
          <div className="empty-box">
            <h2>
              No Pets Found
            </h2>

            <p>
              Try another search or breed.
            </p>
          </div>
        )}

      {!loading &&
        filteredPets.length > 0 && (
          <div className="pet-grid">

            {filteredPets.map((pet) => (
              <PetCard
                key={pet._id}
                pet={pet}
              />
            ))}

          </div>
        )}

    </div>
  );
}

export default Pets;