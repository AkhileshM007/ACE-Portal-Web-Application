import React from "react";
import "../styles/components/MemberCard.css";

const MemberCard = ({ member }) => {
  const { name, email, role, joinDate } = member;

  return (
    <div className="member-card">
      <div className="member-card__header">
        <h3>{name}</h3>
        <p className="member-card__role">{role === "admin" ? "Admin" : "Member"}</p>
      </div>
      <div className="member-card__details">
        <p>
          <strong>Email:</strong> {email}
        </p>
        <p>
          <strong>Joined:</strong> {new Date(joinDate).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
