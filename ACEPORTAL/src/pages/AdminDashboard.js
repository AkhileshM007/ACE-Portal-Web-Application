import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/AdminDashBoard.css";

const AdminDashboard = () => {
  const { token } = useContext(AuthContext);
  const [members, setMembers] = useState([]);
  const [events, setEvents] = useState([]);
  const [newsletter, setNewsletter] = useState({ title: "", content: "" });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [token]);

  const fetchDashboardData = async () => {
    try {
      const [membersResponse, eventsResponse] = await Promise.all([
        fetch("http://localhost:5000/api/admin/members", {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch("http://localhost:5000/api/admin/events", {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const [membersData, eventsData] = await Promise.all([
        membersResponse.json(),
        eventsResponse.json()
      ]);

      if (!membersResponse.ok) throw new Error(membersData.message);
      if (!eventsResponse.ok) throw new Error(eventsData.message);

      setMembers(membersData.data);
      setEvents(eventsData.data);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setError("Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const response = await fetch(
        `http://localhost:5000/api/admin/members/${memberId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      if (response.ok) {
        setMembers(members.filter(m => m._id !== memberId));
        setSuccessMessage("Member deleted successfully");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        const data = await response.json();
        throw new Error(data.message || "Failed to delete member");
      }
    } catch (err) {
      console.error("Failed to delete member:", err);
      setError("Failed to delete member");
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleAddNewsletter = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");
    try {
      const response = await fetch("http://localhost:5000/api/admin/newsletters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newsletter)
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Newsletter published successfully!");
        setNewsletter({ title: "", content: "" });
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(data.message || "Failed to publish newsletter");
      }
    } catch (err) {
      console.error("Failed to publish newsletter:", err);
      setError("Failed to publish newsletter");
      setTimeout(() => setError(""), 3000);
    }
  };

  if (loading) {
    return <div className="admin-dashboard__loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {error && <p className="admin-dashboard__error">{error}</p>}
      {successMessage && <p className="admin-dashboard__success">{successMessage}</p>}

      <div className="admin-dashboard__section">
        <h2>Manage Members ({members.length})</h2>
        <div className="members-list">
          {members.length > 0 ? (
            members.map((member) => (
              <div key={member._id} className="member-item">
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p><strong>Email:</strong> {member.email}</p>
                  <p><strong>Role:</strong> {member.role}</p>
                </div>
                <button
                  onClick={() => handleDeleteMember(member._id)}
                  className="admin-dashboard__delete-btn"
                  disabled={member.role === "admin"}
                >
                  Delete
                </button>
              </div>
            ))
          ) : (
            <p>No members found</p>
          )}
        </div>
      </div>

      <div className="admin-dashboard__section">
        <h2>Publish Newsletter</h2>
        <form onSubmit={handleAddNewsletter} className="newsletter-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Newsletter Title"
              value={newsletter.title}
              onChange={(e) => setNewsletter({ ...newsletter, title: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <textarea
              placeholder="Newsletter Content"
              value={newsletter.content}
              onChange={(e) => setNewsletter({ ...newsletter, content: e.target.value })}
              rows="5"
              required
            />
          </div>
          <button type="submit" className="admin-dashboard__submit-btn">
            Publish Newsletter
          </button>
        </form>
      </div>

      <div className="admin-dashboard__section">
        <h2>Recent Events ({events.length})</h2>
        <div className="events-list">
          {events.length > 0 ? (
            events.map((event) => (
              <div key={event._id} className="event-item">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <p><strong>Registered Members:</strong> {event.registeredMembers?.length || 0}</p>
              </div>
            ))
          ) : (
            <p>No events available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;