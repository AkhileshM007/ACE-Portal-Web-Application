import React, { useState, useEffect } from 'react';
//import "../styles/components/ManageMembers.css";

const ManageMembers = () => {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/members', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setMembers(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Failed to fetch members");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        const response = await fetch(`http://localhost:5000/api/admin/members/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          setMembers(members.filter(member => member._id !== id));
        } else {
          setError("Failed to delete member");
        }
      } catch (err) {
        setError("Error deleting member");
      }
    }
  };

  return (
    <div className="manage-members">
      <h2>Manage Members</h2>
      {error && <p className="error">{error}</p>}
      <div className="members-list">
        {members.map(member => (
          <div key={member._id} className="member-card">
            <h3>{member.name}</h3>
            <p>{member.email}</p>
            <p>Role: {member.role}</p>
            <button onClick={() => handleDelete(member._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageMembers;