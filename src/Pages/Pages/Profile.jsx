import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import { updateProfile, fetchProfile } from '../../api';

function Profile() {
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    ageGroup: '',
    description: '',
    selectedCategories: [],
    specificSkills: '',
    customSkill: ''
  });

  const categories = [
    "STEM & Innovation", "Business & Finance", "Arts & Design", 
    "Trades & Finances", "Health & Wellness", "Humanities & Languages",
    "Culinary & Hospitality", "Realty & Planning", "Legal & Advocacy", "Lifestyle & Hobbies"
  ];

  // --- 1. LOAD PROFILE DATA ON MOUNT ---
 useEffect(() => {
  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const data = await fetchProfile(); 
      if (data) {
        setFormData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          ageGroup: data.age_group || '',
          description: data.bio || '',                 // Use 'bio' from DB
          selectedCategories: data.knowledge_areas || [], // Use 'knowledge_areas' from DB
          specificSkills: data.specific_expertise || '', // Us
        });

        // 👈 ADD THIS LINE: If data exists, start in the "Synced" view
        setIsSaved(true); 
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  loadProfile();
}, []);
  // --- 2. SAVE PROFILE DATA TO BACKEND ---
 const handleSave = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Package the data to match the backend destructuring
  const profileUpdates = {
    first_name: formData.firstName,
    last_name: formData.lastName,
    age_group: formData.ageGroup,
    categories: formData.selectedCategories, // Array matches text[]
    specific_skills: formData.specificSkills,
    description: formData.description
  };

  try {
    const success = await updateProfile(profileUpdates);
    if (success) setIsSaved(true);
  } catch (error) {
    console.error("Save failed:", error);
  } finally {
    setIsLoading(false);
  }
};

  const toggleCategory = (cat) => {
    setFormData(prev => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(cat)
        ? prev.selectedCategories.filter(c => c !== cat)
        : [...prev.selectedCategories, cat]
    }));
  };

  const styles = {
    pageWrapper: {
      minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '40px 20px', 
      fontFamily: "'Quicksand', sans-serif",
      background: 'linear-gradient(135deg, #e0d7ff 0%, #fdeff4 100%)', margin: 0,
      position: 'relative', overflowX: 'hidden'
    },
    flowerLayer: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, display: 'flex', flexWrap: 'wrap',
      justifyContent: 'space-around', alignContent: 'space-around', opacity: '0.15'
    },
    individualFlower: (rotate, size) => ({
      fontSize: size || '40px', transform: `rotate(${rotate}deg)`, margin: '30px', filter: 'grayscale(0.5)'
    }),
    loadingOverlay: {
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', zIndex: 10000,
    },
    spinningLogo: { 
      width: '100px', height: '100px', borderRadius: '50%', 
      objectFit: 'cover', animation: 'spin 2s linear infinite', marginBottom: '20px',
      border: '3px solid #9b59b6'
    },
    loadingText: { fontSize: '24px', fontWeight: 'bold', color: '#9b59b6' },
    mainContainer: {
      background: 'white', borderRadius: '40px', maxWidth: '800px', width: '100%',
      padding: '50px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
      position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'
    },
    logoImg: {
      width: '120px', height: '120px', borderRadius: '50%',
      marginBottom: '20px', boxShadow: '0 8px 16px rgba(155, 89, 182, 0.2)',
      objectFit: 'cover', border: '3px solid white'
    },
    sectionTitle: { color: '#6d5c7e', marginBottom: '15px', fontSize: '22px', fontWeight: '800', alignSelf: 'flex-start', borderLeft: '5px solid #9b59b6', paddingLeft: '15px' },
    input: { 
      width: '100%', padding: '16px', margin: '10px 0', borderRadius: '15px', border: '2px solid #eee', 
      boxSizing: 'border-box', fontSize: '16px', outline: 'none', fontFamily: "'Quicksand', sans-serif"
    },
    chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '15px 0' },
    chip: (isSelected) => ({
      padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', border: 'none',
      background: isSelected ? 'linear-gradient(to right, #9b59b6, #e91e63)' : '#f3f0ff',
      color: isSelected ? 'white' : '#6d5c7e', fontWeight: 'bold', transition: '0.3s', fontSize: '14px'
    }),
    mainButton: { 
      width: '100%', padding: '18px', background: 'linear-gradient(to right, #9b59b6, #e91e63)', 
      color: 'white', border: 'none', borderRadius: '35px', fontSize: '20px', fontWeight: 'bold', 
      cursor: 'pointer', marginTop: '30px', boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)' 
    },
    summaryLabel: { fontWeight: 'bold', color: '#9b59b6', marginTop: '15px', fontSize: '18px' }
  };

  const flowers = ["🌸", "🌺", "🌼", "🌹", "🌷", "💐", "🌻"];

  return (
    <div style={styles.pageWrapper}>
      <style>
        {` @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } `}
      </style>

      {isLoading && (
        <div style={styles.loadingOverlay}>
          <img src="/img1.png" style={styles.spinningLogo} alt="loading" />
          <div style={styles.loadingText}>Syncing your Path...</div>
        </div>
      )}

      <div style={styles.flowerLayer}>
        {Array.from({ length: 30 }).map((_, i) => (
          <span key={i} style={styles.individualFlower(i * 45, (i % 3 === 0 ? '60px' : '30px'))}>
            {flowers[i % flowers.length]}
          </span>
        ))}
      </div>

      <div style={styles.mainContainer}>
        <img src="/img1.png" alt="Logo" style={styles.logoImg} />
        
        {isSaved ? (
          <div style={{width: '100%', textAlign: 'center'}}>
            <h1 style={{fontSize: '36px', color: '#6d5c7e'}}>Profile Synced! ✨</h1>
            <div style={{textAlign: 'left', background: '#fcfaff', padding: '30px', borderRadius: '20px', marginTop: '20px'}}>
              <p style={styles.summaryLabel}>Name</p>
              <p>{formData.firstName} {formData.lastName}</p>
              <p style={styles.summaryLabel}>Knowledge Areas</p>
              <div style={styles.chipContainer}>
                {formData.selectedCategories.map(c => <span key={c} style={styles.chip(true)}>{c}</span>)}
              </div>
            </div>
            <button style={styles.mainButton} onClick={() => setIsSaved(false)}>Edit Profile</button>
          </div>
        ) : (
          <form style={{ width: '100%' }} onSubmit={handleSave}>
            <h1 style={{textAlign: 'center', color: '#6d5c7e', marginBottom: '30px'}}>Your BridgePath Profile</h1>
            
            <h3 style={styles.sectionTitle}>Identification</h3>
            <div style={{display: 'flex', gap: '15px'}}>
              <input style={styles.input} placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
              <input style={styles.input} placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
            </div>
            
            <select style={styles.input} value={formData.ageGroup} onChange={(e) => setFormData({...formData, ageGroup: e.target.value})} required>
              <option value="">Select User Age Group</option>
              <option value="Child (0-12)">Child (0-12)</option>
              <option value="Highschool">Highschool Student</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Professional">Professional</option>
              <option value="Senior">Senior</option>
            </select>

            <h3 style={styles.sectionTitle}>Expertise</h3>
            <div style={styles.chipContainer}>
              {categories.map(cat => (
                <button type="button" key={cat} style={styles.chip(formData.selectedCategories.includes(cat))} onClick={() => toggleCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            <input style={styles.input} placeholder="Specifically, what can you teach?" value={formData.specificSkills} onChange={(e) => setFormData({...formData, specificSkills: e.target.value})} />
            
            <h3 style={styles.sectionTitle}>About You</h3>
            <textarea style={{...styles.input, height: '100px', resize: 'none'}} placeholder="A brief professional bio..." value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

            <button type="submit" style={styles.mainButton}>Save My Profile ✨</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;