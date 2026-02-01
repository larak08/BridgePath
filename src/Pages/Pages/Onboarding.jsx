import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchExperts, fetchProfile, createMentorshipRequest } from '../../api';

const styles = {
  container: { padding: '40px', textAlign: 'center', fontFamily: "'Quicksand', sans-serif" },
  card: { 
    background: 'white', padding: '50px 30px', borderRadius: '30px', 
    maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' 
  },
  title: { fontSize: '28px', fontWeight: '800', color: '#6d5c7e', marginBottom: '25px' },
  searchContainer: { position: 'relative', maxWidth: '600px', margin: '0 auto' },
  searchInput: { 
    width: '100%', padding: '18px 25px', borderRadius: '40px', border: '2px solid #9b59b6', 
    fontSize: '18px', outline: 'none', boxSizing: 'border-box' 
  },
  hintText: { marginTop: '20px', color: '#6d5c7e', fontSize: '15px' },
  boldHint: { color: '#9b59b6', fontWeight: '700' },
  resultsGrid: { 
    display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
    gap: '20px', marginTop: '40px', maxWidth: '1000px', margin: '40px auto 0' 
  },
  mentorCard: {
    background: 'white', padding: '25px', borderRadius: '25px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #eee',
    textAlign: 'center'
  },
  requestBtn: {
    background: 'linear-gradient(to right, #9b59b6, #e91e63)', color: 'white',
    border: 'none', padding: '12px 25px', borderRadius: '25px', cursor: 'pointer', 
    fontWeight: '700', transition: 'all 0.3s ease', width: '100%', marginTop: '15px'
  },
  // NEW CHAT BUTTON STYLE
  chatBtn: {
    background: 'white', color: '#9b59b6', border: '2px solid #9b59b6', 
    padding: '10px 25px', borderRadius: '25px', cursor: 'pointer', 
    fontWeight: '700', width: '100%', marginTop: '10px'
  }
};

function Onboarding() {
  const [searchQuery, setSearchQuery] = useState("");
  const [userRole, setUserRole] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [requestingId, setRequestingId] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const data = await fetchProfile();
        if (data) setUserRole(data.age_group);
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadUser();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setIsLoading(true);
    try {
      const data = await matchExperts(searchQuery, userRole);
      setResults(data.matches || []);
    } catch (err) {
      console.error("Search failed", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestClick = async (mentor) => {
    setRequestingId(mentor.id);
    const result = await createMentorshipRequest(mentor.user_id, mentor.specific_expertise);
    if (result.success) {
      setRequestingId(`success-${mentor.id}`);
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      alert("Error: " + result.error);
      setRequestingId(null);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>What would you like to learn today?</h1>
        <p style={{ marginBottom: '20px' }}>Searching as a <strong>{userRole || 'User'}</strong></p>
        <form onSubmit={handleSearch} style={styles.searchContainer}>
          <input 
            style={styles.searchInput}
            type="text"
            placeholder="Search for a skill..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" style={{ position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px' }}>🔍</button>
        </form>
      </div>

      {isLoading ? (
        <p style={{ marginTop: '40px', fontWeight: 'bold', color: '#9b59b6' }}>Finding mentors...</p>
      ) : (
        <div style={styles.resultsGrid}>
          {results.map((mentor) => {
            const isRequesting = requestingId === mentor.id;
            const isSuccess = requestingId === `success-${mentor.id}`;

            return (
              <div key={mentor.id} style={styles.mentorCard}>
                <div style={{ fontSize: '40px', marginBottom: '10px' }}>👤</div>
                <h3>{mentor.first_name} {mentor.last_name}</h3>
                <p style={{ color: '#9b59b6', fontWeight: 'bold' }}>{mentor.age_group}</p>
                <p style={{ color: '#666', fontSize: '14px' }}>{mentor.specific_expertise}</p>
                
                {/* REQUEST BUTTON */}
                <button 
                  style={{ ...styles.requestBtn, background: isSuccess ? '#2ecc71' : (isRequesting ? '#bdc3c7' : styles.requestBtn.background) }}
                  disabled={isRequesting || isSuccess}
                  onClick={() => handleRequestClick(mentor)}
                >
                  {isRequesting ? "Sending..." : isSuccess ? "Sent!" : "Request Session"}
                </button>

                {/* NEW CHAT BUTTON */}
                <button 
                  style={styles.chatBtn}
                  onClick={() => navigate(`/chat/${mentor.user_id}`)}
                >
                  Chat with Mentor
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Onboarding;