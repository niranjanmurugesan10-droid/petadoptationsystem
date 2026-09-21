import { useEffect, useState } from "react";

function ManagePets() {
  const [pets, setPets] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // ==========================================
  // FETCH MY PETS + ADOPTION REQUESTS
  // ==========================================
function getWhatsAppNumber(phone) {
  if (!phone) return "";

  const number = phone.replace(/\D/g, "");

  if (number.startsWith("91")) {
    return number;
  }

  return `91${number}`;
}
  async function fetchData() {
    try {
      setLoading(true);
      setMessage("");

      const token = localStorage.getItem("smartPetToken");

      if (!token) {
        setMessage("Please login first.");
        return;
      }

      // -------------------------------
      // GET MY PETS
      // -------------------------------

      const petsResponse = await fetch(
        "http://localhost:5000/api/pets/mine",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const petsData = await petsResponse.json();

      if (!petsResponse.ok) {
        throw new Error(
          petsData.message || "Failed to load your pets"
        );
      }

      // -------------------------------
      // GET RECEIVED REQUESTS
      // -------------------------------

      const requestsResponse = await fetch(
        "http://localhost:5000/api/adoptions/received",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const requestsData = await requestsResponse.json();

      if (!requestsResponse.ok) {
        throw new Error(
          requestsData.message ||
            "Failed to load adoption requests"
        );
      }

      setPets(petsData.pets || []);
      setRequests(requestsData.requests || []);
    } catch (error) {
      console.error("MANAGE PETS ERROR:", error);

      setMessage(
        error.message || "Failed to load data"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // ==========================================
  // DELETE PET
  // ==========================================

  async function deletePet(petId) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this pet?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("smartPetToken");

      if (!token) {
        alert("Please login first.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/pets/${petId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to delete pet"
        );
        return;
      }

      // Remove deleted pet from screen
      setPets((currentPets) =>
        currentPets.filter(
          (pet) => pet._id !== petId
        )
      );

      // Remove requests belonging to deleted pet
      setRequests((currentRequests) =>
        currentRequests.filter(
          (request) =>
            request.petId?._id !== petId
        )
      );

      alert("Pet deleted successfully 🐾");
    } catch (error) {
      console.error("DELETE PET ERROR:", error);
      alert("Cannot connect to server");
    }
  }

  // ==========================================
  // APPROVE / REJECT REQUEST
  // ==========================================

  async function updateRequestStatus(
    requestId,
    status
  ) {
    try {
      const token = localStorage.getItem(
        "smartPetToken"
      );

      if (!token) {
        alert("Please login first.");
        return;
      }

      const response = await fetch(
        `http://localhost:5000/api/adoptions/${requestId}/status`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            status
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message ||
            "Failed to update request"
        );
        return;
      }

      // Refresh pets + requests
      await fetchData();

      if (status === "approved") {
        alert(
          "Adoption request approved successfully! 🐾"
        );
      } else if (status === "rejected") {
        alert(
          "Adoption request rejected."
        );
      }
    } catch (error) {
      console.error(
        "UPDATE REQUEST ERROR:",
        error
      );

      alert("Cannot connect to server");
    }
  }

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="page">
        <div className="page-header">
          <p className="section-label">
            PET OWNER
          </p>

          <h1>
            My Pets 🐾
          </h1>

          <p>
            Loading your pets...
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // LOGIN ERROR
  // ==========================================

  if (message) {
    return (
      <div className="page">
        <div className="page-header">
          <p className="section-label">
            PET OWNER
          </p>

          <h1>
            My Pets 🐾
          </h1>

          <p className="auth-message">
            {message}
          </p>
        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN UI
  // ==========================================

  return (
    <div className="page">

      {/* ================================
          PAGE HEADER
      ================================= */}

      <div className="page-header">
        <p className="section-label">
          PET OWNER
        </p>

        <h1>
          My Pets 🐾
        </h1>

        <p>
          Manage your pets and adoption requests.
        </p>
      </div>


      {/* ================================
          NO PETS
      ================================= */}

      {pets.length === 0 && (
        <div className="auth-card">
          <h2>
            No Pets Added Yet
          </h2>

          <p>
            You haven't added any pets for
            adoption yet.
          </p>
        </div>
      )}


      {/* ================================
          PET GRID
      ================================= */}

      {pets.length > 0 && (
        <div className="pet-grid">

          {pets.map((pet) => {

            /*
              IMPORTANT:

              Backend populate pannirukku:

              request.petId = {
                _id,
                name,
                breed,
                ...
              }

              So pet._id oda
              request.petId._id compare panrom.
            */

            const petRequests =
              requests.filter(
                (request) =>
                  request.petId &&
                  request.petId._id === pet._id
              );


            return (
              <div
                className="pet-card"
                key={pet._id}
              >

                {/* ==========================
                    PET IMAGE
                =========================== */}

                {pet.image ? (
                  <img
                    src={pet.image}
                    alt={pet.name}
                    className="pet-image"
                  />
                ) : (
                  <div className="pet-image pet-placeholder">
                    🐶
                  </div>
                )}


                {/* ==========================
                    PET DETAILS
                =========================== */}

                <div className="pet-card-content">

                  <h3>
                    {pet.name}
                  </h3>

                  <p>
                    <strong>
                      Breed:
                    </strong>{" "}
                    {pet.breed}
                  </p>

                  <p>
                    <strong>
                      Age:
                    </strong>{" "}
                    {pet.age} years
                  </p>

                  <p>
                    <strong>
                      Gender:
                    </strong>{" "}
                    {pet.gender}
                  </p>

                  <p>
                    {pet.description}
                  </p>


                  {/* ========================
                      ADOPTED STATUS
                  ========================= */}

                  {pet.adopted && (
                    <div className="request-status approved">
                      ADOPTED
                    </div>
                  )}


                  {/* ========================
                      DELETE
                  ========================= */}

                  <button
                    className="auth-btn"
                    onClick={() =>
                      deletePet(pet._id)
                    }
                  >
                    Delete Pet
                  </button>


                  {/* ========================
                      ADOPTION REQUESTS
                  ========================= */}

                  <div className="pet-requests">

                    <h3>
                      Adoption Requests
                    </h3>


                    {/* NO REQUEST */}

                    {petRequests.length === 0 && (
                      <p className="no-request">
                        No adoption requests
                        for this pet yet.
                      </p>
                    )}


                    {/* REQUEST LIST */}

                    {petRequests.length > 0 && (
                      <div>

                        {petRequests.map(
                          (request) => (

                            <div
                              className="mini-request"
                              key={request._id}
                            >

                              {/* ADOPTER NAME */}

                              <h4>
                                {request.name}
                              </h4>


                              {/* EMAIL */}

                              <p>
                                <strong>
                                  Email:
                                </strong>{" "}
                                {request.email}
                              </p>


                             <div>
  <span>Phone</span>

  <strong>
    {request.phone}
  </strong>
</div>

<div className="request-contact-actions">

  <a
    href={`https://wa.me/${getWhatsAppNumber(request.phone)}`}
    target="_blank"
    rel="noreferrer"
    className="request-whatsapp-btn"
  >
    WhatsApp
  </a>

  <a
    href={`tel:${request.phone}`}
    className="request-call-btn"
  >
    Call
  </a>

</div>


                              {/* ADDRESS */}

                              <p>
                                <strong>
                                  Address:
                                </strong>{" "}
                                {request.address}
                              </p>


                              {/* MESSAGE */}

                              <p>
                                <strong>
                                  Message:
                                </strong>{" "}
                                {request.message}
                              </p>


                              {/* STATUS */}

                              <div
                                className={`request-status ${request.status}`}
                              >
                                {request.status.toUpperCase()}
                              </div>


                              {/* ==================
                                  ACCEPT / REJECT
                              =================== */}

                              {request.status ===
                                "pending" && (

                                <div className="request-actions">

                                  <button
                                    type="button"
                                    className="approve-btn"
                                    onClick={() =>
                                      updateRequestStatus(
                                        request._id,
                                        "approved"
                                      )
                                    }
                                  >
                                    Accept
                                  </button>


                                  <button
                                    type="button"
                                    className="reject-btn"
                                    onClick={() =>
                                      updateRequestStatus(
                                        request._id,
                                        "rejected"
                                      )
                                    }
                                  >
                                    Reject
                                  </button>

                                </div>
                              )}


                              {/* ==================
                                  APPROVED MESSAGE
                              =================== */}

                              {request.status ===
                                "approved" && (

                                <div className="contact-box">

                                  <p>
                                    🎉 This adoption
                                    request has been
                                    approved.
                                  </p>

                                </div>
                              )}


                              {/* ==================
                                  REJECTED MESSAGE
                              =================== */}

                              {request.status ===
                                "rejected" && (

                                <div className="rejected-box">

                                  <p>
                                    This request was
                                    rejected.
                                  </p>

                                </div>
                              )}

                            </div>

                          )
                        )}

                      </div>
                    )}

                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
}

export default ManagePets;