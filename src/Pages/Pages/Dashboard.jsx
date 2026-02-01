// src/Pages/Dashboard/MainDashboard.jsx
import React, { useState } from 'react';

function MainDashboard() {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  const styles = {
    container: {
      padding: '40px 20px',
      fontFamily: "'Quicksand', sans-serif",
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #e0d7ff 0%, #fdeff4 100%)',
    },
    mainCard: {
      maxWidth: '800px',
      margin: '0 auto',
      background: 'rgba(255, 255, 255, 0.4)',
      backdropFilter: 'blur(15px)',
      borderRadius: '40px',
      padding: '40px',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
    },
    headerTitle: {
      textAlign: 'center',
      color: '#6d5c7e',
      fontSize: '32px',
      fontWeight: '800',
      marginBottom: '40px'
    },
    sectionWrapper: {
      marginBottom: '20px',
      borderRadius: '25px',
      background: 'white',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
      transition: '0.3s'
    },
    sectionHeader: {
      padding: '25px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      cursor: 'pointer',
      background: 'white',
    },
    sectionTitle: {
      fontSize: '20px',
      fontWeight: '700',
      color: '#9b59b6',
    },
    toggleIcon: (isOpen) => ({
      fontSize: '18px',
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: '0.3s',
      color: '#9b59b6'
    }),
    contentArea: (isOpen) => ({
      maxHeight: isOpen ? '300px' : '0px',
      padding: isOpen ? '30px' : '0px 30px',
      overflow: 'hidden',
      transition: '0.4s ease-in-out',
      borderTop: isOpen ? '1px solid #f0f0f0' : 'none',
      background: '#fafafa',
      color: '#999',
      textAlign: 'center',
      fontSize: '16px'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <h1 style={styles.headerTitle}>Activity Dashboard</h1>

        {/* SECTION 1: Pending Requests */}
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader} onClick={() => toggleSection('pending')}>
            <span style={styles.sectionTitle}>Pending Requests</span>
            <span style={styles.toggleIcon(openSection === 'pending')}>▼</span>
          </div>
          <div style={styles.contentArea(openSection === 'pending')}>
            {/* Backend Team: Map pending requests here */}
            No pending requests at the moment.
          </div>
        </div>

        {/* SECTION 2: Upcoming/Recent */}
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader} onClick={() => toggleSection('recent')}>
            <span style={styles.sectionTitle}>Upcoming/Recent</span>
            <span style={styles.toggleIcon(openSection === 'recent')}>▼</span>
          </div>
          <div style={styles.contentArea(openSection === 'recent')}>
            {/* Backend Team: Map recent matches or sessions here */}
            No recent activity to show.
          </div>
        </div>

        {/* SECTION 3: General Updates */}
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader} onClick={() => toggleSection('updates')}>
            <span style={styles.sectionTitle}>My Mentorship Request</span>
            <span style={styles.toggleIcon(openSection === 'updates')}>▼</span>
          </div>
          <div style={styles.contentArea(openSection === 'updates')}>
            {/* Backend Team: Map system notifications or status changes here */}
            Everything is up to date!
          </div>
        </div>

      </div>
    </div>
  );
}

export default MainDashboard