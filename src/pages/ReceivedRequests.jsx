import { useEffect, useState } from "react";

function ReceivedRequests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const token =
    localStorage.getItem(
      "smartPetToken"
    );


  async function loadRequests() {

    try {

      const response =
        await fetch(
          "http://localhost:5000/api/adoptions/received",
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );


      const data =
        await response.json();


      if (response.ok) {

        setRequests(
          data.requests || []
        );

      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  }


  useEffect(() => {

    if (token) {
      loadRequests();
    } else {
      setLoading(false);
    }

  }, [token]);


  async function updateStatus(
    id,
    status
  ) {

    try {

      const response =
        await fetch(
          `http://localhost:5000/api/adoptions/${id}/status`,
          {
            method: "PUT",

            headers: {
              "Content-Type":
                "application/json",

              Authorization:
                `Bearer ${token}`
            },

            body: JSON.stringify({
              status
            })
          }
        );


      const data =
        await response.json();


      if (!response.ok) {

        alert(
          data.message ||
          "Failed to update"
        );

        return;
      }


      setRequests(
        requests.map(
          request =>
            request._id === id
              ? {
                  ...request,
                  status
                }
              : request
        )
      );


      alert(
        `Request ${status}`
      );

    } catch (error) {

      console.error(error);

      alert(
        "Cannot connect to server"
      );

    }
  }


  if (!token) {

    return (
      <div className="page">

        <h2>
          Please login first.
        </h2>

      </div>
    );

  }


  return (
    <div className="page">

      <div className="page-header">

        <p className="section-label">
          REQUESTS
        </p>

        <h1>
          Adoption Requests 🐾
        </h1>

      </div>


      {loading && (
        <p>
          Loading...
        </p>
      )}


      {!loading &&
        requests.length === 0 && (
          <p>
            No adoption requests yet.
          </p>
        )}


      <div className="pet-grid">

        {requests.map(
          (request) => (

            <div
              className="pet-card"
              key={request._id}
            >

              {request.petId?.image && (
                <img
                  src={request.petId.image}
                  alt={request.petId.name}
                  className="pet-image"
                />
              )}


              <div className="pet-card-content">

                <h3>
                  {request.petId?.name}
                </h3>

                <p>
                  Applicant:
                  {" "}
                  {request.adopterId?.name}
                </p>

                <p>
                  Email:
                  {" "}
                  {request.adopterId?.email}
                </p>

                <p>
                  Phone:
                  {" "}
                  {request.phone}
                </p>

                <p>
                  Address:
                  {" "}
                  {request.address}
                </p>

                <p>
                  Message:
                  {" "}
                  {request.message}
                </p>

                <p>
                  Status:
                  {" "}
                  <strong>
                    {request.status}
                  </strong>
                </p>


                {request.status === "pending" && (

                  <div>

                    <button
                      className="auth-btn"
                      onClick={() =>
                        updateStatus(
                          request._id,
                          "approved"
                        )
                      }
                    >
                      Approve ❤️
                    </button>


                    <button
                      className="auth-btn"
                      onClick={() =>
                        updateStatus(
                          request._id,
                          "rejected"
                        )
                      }
                    >
                      Reject
                    </button>

                  </div>

                )}

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default ReceivedRequests;