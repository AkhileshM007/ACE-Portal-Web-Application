import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/components/NewsLetter.css";

const NewsLetters = () => {
  const { token } = useContext(AuthContext);
  const [newsletters, setNewsletters] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsletters = async () => {
      if (!token) return;
      
      try {
        const response = await fetch("http://localhost:5000/api/member/newsletters", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await response.json();

        if (response.ok) {
          setNewsletters(data.data);
        } else {
          setError(data.message || "Failed to fetch newsletters.");
        }
      } catch (err) {
        setError("An error occurred while fetching newsletters.");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsletters();
  }, [token]);

  if (loading) {
    return <div>Loading newsletters...</div>;
  }

  return (
    <div className="newsletters">
      <h2>Newsletters & Announcements</h2>
      {error && <p className="newsletters__error">{error}</p>}
      {newsletters.length > 0 ? (
        <ul className="newsletters__list">
          {newsletters.map((newsletter) => (
            <li key={newsletter._id} className="newsletters__item">
              <h3>{newsletter.title}</h3>
              <p>{newsletter.content}</p>
              <p className="newsletters__date">
                Published on: {new Date(newsletter.date).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No newsletters available at the moment.</p>
      )}
    </div>
  );
};

export default NewsLetters;