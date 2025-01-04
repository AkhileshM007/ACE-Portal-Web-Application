import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/EventsPage.css";

const EventsPage = () => {
  const { token } = useContext(AuthContext); // Remove currentUser if not used
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const fetchEvents = async () => { // Moved inside component scope
    try {
      const response = await fetch("http://localhost:5000/api/member/events/registered", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();

      if (response.ok) {
        setEvents(data.data);
      } else {
        setError("Failed to fetch events.");
      }
    } catch (err) {
      setError("An error occurred while fetching events.");
    }
  };

  useEffect(() => {
    if (token) {
      fetchEvents();
    }
  }, [token]); // Add fetchEvents to dependency array if needed

  const handleRegister = async (eventId) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/member/events/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ eventId }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Successfully registered for the event");
        fetchEvents(); // Now fetchEvents is in scope
      } else {
        setError(data.message || "Failed to register for the event.");
      }
    } catch (err) {
      setError("An error occurred while registering for the event.");
    }
  };

  return (
    <div className="events-page">
      <h1>Events</h1>

      {error && <p className="events-page__error">{error}</p>}
      {successMessage && (
        <p className="events-page__success">{successMessage}</p>
      )}

      <div className="events-page__list">
        {events.length > 0 ? (
          events.map((event) => (
            <div key={event._id} className="events-page__card">
              <h2>{event.title}</h2>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Description:</strong> {event.description}
              </p>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <button
                onClick={() => handleRegister(event._id)}
                className="events-page__register-btn"
              >
                Register
              </button>
            </div>
          ))
        ) : (
          <p>No events available.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;