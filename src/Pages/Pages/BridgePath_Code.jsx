import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleAction = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      navigate('/dashboard'); 
    }, 2000);
  };

  const styles = {
    loadingOverlay: {
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(10px)',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      alignItems: 'center', zIndex: 10000, fontFamily: "'Quicksand', sans-serif",
    },
    spinningFlower: { fontSize: '80px', animation: 'spin 2s linear infinite', marginBottom: '20px' },
    loadingText: { fontSize: '24px', fontWeight: 'bold', color: '#9b59b6', letterSpacing: '1px' },

    pageWrapper: {
      minHeight: '100vh', width: '100vw', display: 'flex', justifyContent: 'center',
      alignItems: 'center', padding: '20px', 
      fontFamily: "'Quicksand', sans-serif", // <--- FONT FAMILY SET HERE
      background: 'linear-gradient(135deg, #e0d7ff 0%, #fdeff4 100%)', margin: 0,
      position: 'relative', overflow: 'hidden'
    },
    flowerLayer: {
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      pointerEvents: 'none', zIndex: 0, display: 'flex', flexWrap: 'wrap',
      justifyContent: 'space-around', alignContent: 'space-around',
      padding: '20px', opacity: '0.15'
    },
    individualFlower: (rotate, size) => ({
      fontSize: size || '40px', transform: `rotate(${rotate}deg)`, margin: '30px', filter: 'grayscale(0.5)'
    }),
    mainContainer: {
      display: 'flex', flexDirection: 'row', background: 'white',
      borderRadius: '40px', maxWidth: '1100px', width: '100%',
      minHeight: '700px', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.1)',
      position: 'relative', zIndex: 2
    },
    infoSection: { 
      flex: 1, padding: '60px', background: '#ffffff', color: '#000000', 
      display: 'flex', flexDirection: 'column', justifyContent: 'center' 
    },
    loginSection: { 
      flex: 1, padding: '40px 60px', 
      background: 'linear-gradient(135deg, #faf8ff 0%, #fdf2f7 100%)', 
      display: 'flex', flexDirection: 'column', justifyContent: 'center', 
      alignItems: 'center', borderLeft: '1px solid #f5f5f5' 
    },
    
    // --- LOGO STYLE ---
    logoImg: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
      marginBottom: '15px',
      boxShadow: '0 12px 24px rgba(155, 89, 182, 0.25)',
      objectFit: 'cover',
      border: '4px solid white' // Adds a clean border around your logo
    },
    
    title: { fontSize: '42px', color: '#6d5c7e', fontWeight: '800', marginBottom: '5px' },
    aboutHeading: { fontSize: '40px', marginBottom: '35px', fontWeight: '900', color: '#000' },
    missionItem: { marginBottom: '25px' },
    missionTitle: { fontSize: '22px', fontWeight: 'bold', margin: '0 0 5px 0', color: '#000' },
    missionDesc: { fontSize: '17px', margin: 0, color: '#333', lineHeight: '1.6' },
    input: { 
      width: '100%', padding: '16px', margin: '10px 0', borderRadius: '15px', border: '2px solid #eee', 
      boxSizing: 'border-box', fontSize: '18px', outline: 'none', 
      fontFamily: "'Quicksand', sans-serif" // <--- FONT FAMILY SET HERE
    },
    mainButton: { width: '100%', padding: '16px', background: 'linear-gradient(to right, #9b59b6, #e91e63)', color: 'white', border: 'none', borderRadius: '30px', fontSize: '20px', fontWeight: 'bold', cursor: 'pointer', marginTop: '15px', boxShadow: '0 8px 20px rgba(233, 30, 99, 0.2)' },
    toggleText: { marginTop: '20px', color: '#9b59b6', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }
  };

  const flowers = ["🌸", "🌺", "🌼", "🌹", "🌷", "💐", "🌻"];

  return (
    <div style={styles.pageWrapper}>
      <style>
        {` @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } `}
      </style>

    {/* LOADING SCREEN */}
{isLoading && (
  <div style={{
    position: 'fixed', 
    top: 0, 
    left: 0, 
    width: '100vw', 
    height: '100vh',
    background: 'rgba(255, 255, 255, 0.95)', 
    backdropFilter: 'blur(10px)',
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center',
    alignItems: 'center', 
    zIndex: 10000, 
    fontFamily: "'Quicksand', sans-serif",
  }}>
    <style>
      {` @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } } `}
    </style>
    
    <img 
      src="/img1.png" 
      alt="BridgePath Logo"
      style={{
        width: '120px',        // Size of the circle
        height: '120px',
        borderRadius: '50%',   // Makes it a circle
        objectFit: 'cover',    // CROPS the image to fill the circle perfectly
        animation: 'spin 2.5s linear infinite',
        marginBottom: '25px',
        border: '4px solid white',
        boxShadow: '0 15px 30px rgba(155, 89, 182, 0.2)'
      }}
    />
    
    <div style={{ 
      fontSize: '22px', 
      fontWeight: '800', 
      color: '#9b59b6', 
      letterSpacing: '0.5px' 
    }}>
      Planting your BridgePath...
    </div>
  </div>
)}

      {/* FLORAL BACKGROUND */}
      <div style={styles.flowerLayer}>
        {Array.from({ length: 40 }).map((_, i) => (
          <span key={i} style={styles.individualFlower(i * 45, (i % 3 === 0 ? '70px' : '35px'))}>
            {flowers[i % flowers.length]}
          </span>
        ))}
      </div>

      <div style={styles.mainContainer}>
        {/* LEFT SIDE: ABOUT */}
        <div style={styles.infoSection}>
          <h2 style={styles.aboutHeading}>What we are about</h2>
          <p style={styles.missionTitle}>🎯 Learn, Share, Repeat!</p>
          <p style={styles.missionDesc}>Turn your skills into opportunities and your curiosity into connections. 💡✨</p>
          <br />
          <p style={styles.missionTitle}>🌟 Swap Skills, Unlock Potential!</p>
          <p style={styles.missionDesc}>Trade what you know for what you want to learn. Coding to cooking! 🍳💻</p>
        </div>

        {/* RIGHT SIDE: LOGIN */}
        <div style={styles.loginSection}>
          {/* LOGO IMAGE - POINTING TO PUBLIC FOLDER */}
          <img 
            src="/img1.png" 
            alt="BridgePath Logo" 
            style={styles.logoImg}
            onError={(e) => { e.target.src = "https://via.placeholder.com/200?text=Move+img1.png+to+Public+Folder"; }}
          />
          
          <h1 style={styles.title}>BridgePath</h1>
          <h3 style={{ color: '#9b59b6', marginBottom: '20px', fontWeight: '700', fontSize: '20px' }}>
            {isLogin ? "Welcome Back!" : "Join the Community"}
          </h3>
          
          <form style={{ width: '100%', maxWidth: '350px' }} onSubmit={handleAction}>
            {!isLogin && <input type="text" placeholder="Full Name" style={styles.input} required />}
            <input type="email" placeholder="Email Address" style={styles.input} required />
            <input type="password" placeholder="Password" style={styles.input} required />
            <button type="submit" style={styles.mainButton}>
              {isLogin ? "Login 🚀" : "Sign Up ✨"}
            </button>
          </form>
          
          <div style={styles.toggleText} onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "New here? Create an account!" : "Already have an account? Log in!"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;