import React from "react";
import "../styles/components/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__content">
        <div className="footer__about">
          <h3>ACE Portal</h3>
          <p>
            Association of Computer Science Engineers (ACE) is a platform for students and staff to connect, share, and grow together in the field of computer science.
          </p>
        </div>
        <div className="footer__social">
          <h4>Follow Us</h4>
          <div className="footer__social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} ACE Portal. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
