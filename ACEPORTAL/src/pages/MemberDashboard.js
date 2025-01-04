import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/MemberDashboard.css";

const MemberDashboard = () => {
  const { token } = useContext(AuthContext);
  const [memberDetails, setMemberDetails] = useState(null);
  const [events, setEvents] = useState([]);
  const [newsletters, setNewsletters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        // Fetch all data concurrently
        const [memberResponse, eventsResponse, newslettersResponse] = await Promise.all([
          fetch("http://localhost:5000/api/member/profile", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("http://localhost:5000/api/member/events", {
            headers: { Authorization: `Bearer ${token}` }
          }),
          fetch("http://localhost:5000/api/member/newsletters", {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);

        // Parse all responses
        const [memberData, eventsData, newslettersData] = await Promise.all([
          memberResponse.json(),
          eventsResponse.json(),
          newslettersResponse.json()
        ]);

        // Check responses and update state
        if (!memberResponse.ok) throw new Error(memberData.message);
        if (!eventsResponse.ok) throw new Error(eventsData.message);
        if (!newslettersResponse.ok) throw new Error(newslettersData.message);

        setMemberDetails(memberData.data);
        setEvents(eventsData.data);
        setNewsletters(newslettersData.data);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError("An error occurred while fetching data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading) {
    return <div className="member-dashboard__loading">Loading...</div>;
  }

  if (error) {
    return <div className="member-dashboard__error">{error}</div>;
  }

  const handleRegister = () => {
    window.location.href = 'https://forms.gle/rAoa9HwPd9eaPkq28';
  };

  return (
    <div className="member-dashboard">
      <img
              src="C:\Users\nimba\OneDrive\Desktop\wtproj (2)\wtproj\wtprojnew\src\pages\WhatsApp Image 2025-01-04 at 09.02.19_c40891d3.jpg" // Path to your image in the public folder
              alt="Gallery"
              className="member-dashboard__image"
      />
      <h1>Welcome, {memberDetails?.name || "Member"}</h1>

      <div className="member-dashboard__section">
        <h2>Your Account Details</h2>
        {memberDetails && (
          <>
            <p><strong>Name:</strong> {memberDetails.name}</p>
            <p><strong>Email:</strong> {memberDetails.email}</p>
            <p><strong>Role:</strong> {memberDetails.role}</p>
          </>
        )}
      </div>

      <div className="member-dashboard__section">
        <h2>Upcoming Events</h2>
        {events.length > 0 ? (
          <ul className="events-list">
            {events.map((event) => (
              <li key={event._id} className="event-item">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Location:</strong> {event.location}
                </p>
                <p>
                 <button className="event-register-btn" onClick={handleRegister}>Register</button>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events.</p>
        )}
      </div>

      <div className="member-dashboard__section">
        <h2>Latest Newsletters</h2>
        {newsletters.length > 0 ? (
          <ul className="newsletters-list">
            {newsletters.map((newsletter) => (
              <li key={newsletter._id} className="newsletter-item">
                <h3>{newsletter.title}</h3>
                <p>{newsletter.content}</p>
                <p className="newsletter-date">
                  Published: {new Date(newsletter.date).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No newsletters available.</p>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;