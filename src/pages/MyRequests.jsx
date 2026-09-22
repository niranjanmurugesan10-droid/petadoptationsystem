import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function MyRequests() {

  const [requests, setRequests] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  const token =
    localStorage.getItem(
      "smartPetToken"
    );


  useEffect(() => {

    async function loadRequests() {

      try {

        const response =
          await fetch(
            `${API_URL}/api/adoptions/my-requests`,
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


    if (token) {
      loadRequests();
    } else {
      setLoading(false);
    }

  }, [token]);


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
          MY REQUESTS
        </p>

        <h1>
          Adoption Requests ❤️
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
            You haven't submitted any requests.
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
                  Breed: {request.petId?.breed}
                </p>

                <p>
                  Status:
                  {" "}
                  <strong>
                    {request.status}
                  </strong>
                </p>

                <p>
                  {request.message}
                </p>

              </div>

            </div>

          )
        )}

      </div>

    </div>
  );
}

export default MyRequests;