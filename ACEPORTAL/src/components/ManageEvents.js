// JavaScript
import React, { useState, useEffect } from 'react';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    date: "",
    location: ""
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/events', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setEvents(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch events");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/admin/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newEvent)
      });
      if (response.ok) {
        fetchEvents();
        setNewEvent({ title: "", description: "", date: "", location: "" });
      } else {
        setError("Failed to create event");
      }
    } catch (err) {
      setError("Error creating event");
    }
  };

  return (
    <div className="manage-events">
      <h2>Manage Events</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={newEvent.description}
          onChange={e => setNewEvent({ ...newEvent, description: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={newEvent.date}
          onChange={e => setNewEvent({ ...newEvent, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={newEvent.location}
          onChange={e => setNewEvent({ ...newEvent, location: e.target.value })}
          required
        />
        <button type="submit">Create Event</button>
      </form>

      <div className="events-list">
        {events.map(event => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p>Date: {new Date(event.date).toLocaleDateString()}</p>
            <p>Location: {event.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageEvents;