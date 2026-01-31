// src/Pages/Pages/Onboarding.jsx
import React from 'react';

function Onboarding() {
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
      padding: '30px',
      borderRadius: '30px',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      maxWidth: '800px',
      margin: '0 auto'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1>Welcome to the Journey! 🚀</h1>
        <p>BridgePath is where knowledge meets opportunity. Let's get you started.</p>
        <div style={{display: 'flex', justifyContent: 'space-around', marginTop: '30px'}}>
            <div>Step 1: Create Profile 👤</div>
            <div>Step 2: Find a Mentor 🤝</div>
            <div>Step 3: Start Learning 📚</div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;