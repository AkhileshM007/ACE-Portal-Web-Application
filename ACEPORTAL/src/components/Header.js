import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/Header.css";

const Header = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!currentUser) return null;

  return (
    <header className="header">
      <div className="header__logo">
        <h1>ACE Portal</h1>
      </div>
      <nav className="header__nav">
        <ul className="header__nav-list">
          {currentUser.role === "admin" ? (
            <>
              <li><Link to="/admin/dashboard">Dashboard</Link></li>
              <li><Link to="/admin/members">Manage Members</Link></li>
              <li><Link to="/admin/events">Manage Events</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/member/dashboard">Dashboard</Link></li>
              <li><Link to="/member/account">My Account</Link></li>
              <li><Link to="/member/events">Events</Link></li>
              <li><Link to="/member/newsletters">Newsletters</Link></li>
            </>
          )}
          <li>
            <button onClick={handleLogout} className="header__logout-btn">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;