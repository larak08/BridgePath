import React, { useState, useEffect } from 'react';
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
    profilePic: null 
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
            description: data.bio || '',                
            selectedCategories: data.knowledge_areas || [], 
            specificSkills: data.specific_expertise || '', 
            profilePic: data.profile_pic || null 
          });
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

  // --- 2. SAVE PROFILE DATA ---
  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const profileUpdates = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      age_group: formData.ageGroup,
      categories: formData.selectedCategories,
      specific_skills: formData.specificSkills, 
      description: formData.description,
      profile_pic: formData.profilePic 
    };

    try {
      const success = await updateProfile(profileUpdates);
      if (success) {
        setIsSaved(true);
      } else {
        alert("Server rejected the update. The image might still be too large.");
      }
    } catch (error) {
      console.error("Save failed:", error);
      alert("Failed to save profile. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- 3. COMPRESSED IMAGE HANDLER ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          // Create canvas to resize image (Prevents "Payload Too Large" errors)
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 400; 
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Export as compressed string
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7); 
          setFormData({ ...formData, profilePic: compressedDataUrl });
        };
      };
      reader.readAsDataURL(file);
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
      alignItems: 'center', padding: '40px 20px', boxSizing: 'border-box',
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
      fontSize: size || '40px', transform: `rotate(${rotate}deg)`, margin: '30px', display: 'inline-block'
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
    mainContainer: {
      background: 'white', borderRadius: '40px', maxWidth: '800px', width: '100%',
      padding: '50px', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)', boxSizing: 'border-box',
      position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center'
    },
    profileImageContainer: {
      position: 'relative', marginBottom: '20px', textAlign: 'center'
    },
    profileCircle: {
      width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover',
      border: '4px solid #f3f0ff', marginBottom: '10px', backgroundColor: '#eee'
    },
    input: { 
      width: '100%', padding: '16px', margin: '10px 0', borderRadius: '15px', border: '2px solid #eee', 
      boxSizing: 'border-box', fontSize: '16px', outline: 'none', fontFamily: 'inherit'
    },
    chipContainer: { display: 'flex', flexWrap: 'wrap', gap: '10px', margin: '15px 0', justifyContent: 'center' },
    chip: (isSelected) => ({
      padding: '10px 20px', borderRadius: '25px', cursor: 'pointer', border: 'none',
      background: isSelected ? 'linear-gradient(to right, #9b59b6, #e91e63)' : '#f3f0ff',
      color: isSelected ? 'white' : '#6d5c7e', fontWeight: 'bold', transition: '0.3s'
    }),
    mainButton: { 
      width: '100%', padding: '18px', background: 'linear-gradient(to right, #9b59b6, #e91e63)', 
      color: 'white', border: 'none', borderRadius: '35px', fontSize: '20px', fontWeight: 'bold', 
      cursor: 'pointer', marginTop: '30px'
    }
  };

  const flowers = ["🌸", "🌺", "🌼", "🌹", "🌷", "💐", "🌻"];

  return (
    <div style={styles.pageWrapper}>
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>

      {isLoading && (
        <div style={styles.loadingOverlay}>
          <img src="/img1.png" style={styles.spinningLogo} alt="loading" />
          <p style={{color: '#9b59b6', fontWeight: 'bold'}}>Syncing your Path...</p>
        </div>
      )}

      <div style={styles.flowerLayer}>
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} style={styles.individualFlower(i * 45, '40px')}>
            {flowers[i % flowers.length]}
          </span>
        ))}
      </div>

      <div style={styles.mainContainer}>
        {isSaved ? (
          <div style={{width: '100%', textAlign: 'center'}}>
            <img 
               src={formData.profilePic || "/default-avatar.png"} 
               style={{...styles.profileCircle, width: '150px', height: '150px', border: '5px solid #9b59b6'}} 
               alt="profile" 
            />
            <h1 style={{color: '#6d5c7e'}}>Profile Synced! ✨</h1>
            <div style={{textAlign: 'left', background: '#fcfaff', padding: '20px', borderRadius: '15px'}}>
              <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
              <p><strong>Role:</strong> {formData.ageGroup}</p>
              <p><strong>Expertise:</strong> {formData.specificSkills}</p>
              <p><strong>Bio:</strong> {formData.description}</p>
            </div>
            <button style={styles.mainButton} onClick={() => setIsSaved(false)}>Edit Profile</button>
          </div>
        ) : (
          <form style={{ width: '100%' }} onSubmit={handleSave}>
            <h2 style={{textAlign: 'center', color: '#6d5c7e'}}>Your BridgePath Profile</h2>
            
            <div style={styles.profileImageContainer}>
              <img 
                src={formData.profilePic || "https://via.placeholder.com/120"} 
                style={styles.profileCircle} 
                alt="preview" 
              />
              <br />
              <label style={{
                color: '#9b59b6', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px', textDecoration: 'underline'
              }}>
                Change Photo
                <input type="file" accept="image/*" onChange={handleImageChange} style={{display: 'none'}} />
              </label>
            </div>

            <div style={{display: 'flex', gap: '10px'}}>
              <input style={styles.input} placeholder="First Name" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} required />
              <input style={styles.input} placeholder="Last Name" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} required />
            </div>
            
            <select style={styles.input} value={formData.ageGroup} onChange={(e) => setFormData({...formData, ageGroup: e.target.value})} required>
              <option value="">Select Age Group</option>
              <option value="Child">Child (0-12)</option>
              <option value="HS Student">Highschool Student</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Professional">Professional</option>
              <option value="Senior">Senior</option>
            </select>

            <div style={styles.chipContainer}>
              {categories.map(cat => (
                <button type="button" key={cat} style={styles.chip(formData.selectedCategories.includes(cat))} onClick={() => toggleCategory(cat)}>
                  {cat}
                </button>
              ))}
            </div>

            <input style={styles.input} placeholder="Specific Expertise (e.g. React, Carpentry)" value={formData.specificSkills} onChange={(e) => setFormData({...formData, specificSkills: e.target.value})} />
            <textarea style={{...styles.input, height: '80px'}} placeholder="Short Bio" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />

            <button type="submit" style={styles.mainButton}>Save My Profile ✨</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;