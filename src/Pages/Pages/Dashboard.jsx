import React, { useState, useEffect } from 'react';
import { fetchMyRequests } from '../../api';

function MainDashboard() {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [openSection, setOpenSection] = useState('pending');

  const toggleSection = (id) => {
    setOpenSection(openSection === id ? null : id);
  };

  // Fetch from Supabase on load
  useEffect(() => {
    const loadData = async () => {
      const data = await fetchMyRequests();
      setRequests(data);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const styles = {
    container: { padding: '40px 20px', fontFamily: "'Quicksand', sans-serif", minHeight: '100vh', background: 'linear-gradient(135deg, #e0d7ff 0%, #fdeff4 100%)' },
    mainCard: { maxWidth: '800px', margin: '0 auto', background: 'rgba(255, 255, 255, 0.4)', backdropFilter: 'blur(15px)', borderRadius: '40px', padding: '40px', border: '1px solid rgba(255, 255, 255, 0.5)', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' },
    headerTitle: { textAlign: 'center', color: '#6d5c7e', fontSize: '32px', fontWeight: '800', marginBottom: '40px' },
    sectionWrapper: { marginBottom: '20px', borderRadius: '25px', background: 'white', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' },
    sectionHeader: { padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' },
    sectionTitle: { fontSize: '20px', fontWeight: '700', color: '#9b59b6' },
    statusBadge: (status) => ({
      padding: '5px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold',
      background: status === 'pending' ? '#fff4e6' : '#e6fffa',
      color: status === 'pending' ? '#f39c12' : '#2ecc71',
      textTransform: 'uppercase'
    }),
    contentArea: (isOpen) => ({
      maxHeight: isOpen ? '500px' : '0px',
      padding: isOpen ? '30px' : '0px 30px',
      overflowY: 'auto',
      transition: '0.4s ease-in-out',
      borderTop: isOpen ? '1px solid #f0f0f0' : 'none',
      background: '#fafafa'
    })
  };

  return (
    <div style={styles.container}>
      <div style={styles.mainCard}>
        <h1 style={styles.headerTitle}>Activity Dashboard</h1>

        {/* PENDING REQUESTS SECTION */}
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader} onClick={() => toggleSection('pending')}>
            <span style={styles.sectionTitle}>My Mentorship Requests</span>
            <span>{openSection === 'pending' ? '▲' : '▼'}</span>
          </div>
          <div style={styles.contentArea(openSection === 'pending')}>
            {isLoading ? (
              <p>Loading your path...</p>
            ) : requests.length > 0 ? (
              requests.map((req) => (
                <div key={req.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderBottom: '1px solid #eee' }}>
                  <div>
                    <div style={{ fontWeight: 'bold', color: '#444' }}>
                      {req.profiles?.first_name} {req.profiles?.last_name}
                    </div>
                    <div style={{ fontSize: '14px', color: '#888' }}>Skill: {req.skill}</div>
                  </div>
                  <div style={styles.statusBadge(req.status)}>{req.status}</div>
                </div>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#999' }}>No requests yet. Start your journey in Onboarding!</p>
            )}
          </div>
        </div>

        {/* UPDATES SECTION */}
        <div style={styles.sectionWrapper}>
          <div style={styles.sectionHeader} onClick={() => toggleSection('updates')}>
            <span style={styles.sectionTitle}>System Updates</span>
            <span>{openSection === 'updates' ? '▲' : '▼'}</span>
          </div>
          <div style={styles.contentArea(openSection === 'updates')}>
            {requests.some(r => r.status === 'pending') 
              ? `You have ${requests.filter(r => r.status === 'pending').length} request(s) awaiting mentor approval.`
              : "All caught up!"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainDashboard;