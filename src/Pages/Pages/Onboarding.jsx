// src/Pages/Pages/Onboarding.jsx
import React, { useState } from 'react';

function Onboarding() {
  const [searchQuery, setSearchQuery] = useState("");

  const styles = {
    container: {
      padding: '40px',
      textAlign: 'center',
      fontFamily: "'Quicksand', sans-serif",
      color: 'black'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.2)',
      backdropFilter: 'blur(10px)',
      padding: '50px 30px',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '800px',
      margin: '0 auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
    },
    title: {
      fontSize: '28px',
      fontWeight: '800',
      color: '#6d5c7e',
      marginBottom: '25px'
    },
    searchContainer: {
      position: 'relative',
      maxWidth: '600px',
      margin: '0 auto'
    },
    searchInput: {
      width: '100%',
      padding: '18px 25px',
      borderRadius: '40px',
      border: '2px solid #9b59b6',
      fontSize: '18px',
      outline: 'none',
      fontFamily: "'Quicksand', sans-serif",
      boxSizing: 'border-box',
      transition: '0.3s',
      background: 'white'
    },
    searchIcon: {
      position: 'absolute',
      right: '25px',
      top: '50%',
      transform: 'translateY(-50%)',
      fontSize: '20px',
      pointerEvents: 'none'
    },
    hintText: {
      marginTop: '20px',
      color: '#6d5c7e',
      fontSize: '15px',
      fontWeight: '500',
      opacity: 0.8
    },
    boldHint: {
      color: '#9b59b6',
      fontWeight: '700'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>What would you like to learn today?</h1>
        
        <div style={styles.searchContainer}>
          <input 
            style={styles.searchInput}
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <p style={styles.hintText}>
          Try searching for <span style={styles.boldHint}>"UI Design"</span>, <span style={styles.boldHint}>"Cooking"</span>, or <span style={styles.boldHint}>"Python Coding"</span>
        </p>
      </div>
    </div>
  );
}

export default Onboarding;