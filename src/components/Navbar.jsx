import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  // Completely hide navbar on the Login/Sign-In page
  if (location.pathname === "/") {
    return null;
  }

  const navItems = [
    { name: 'Onboarding', path: '/onboarding' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Chat', path: '/chat' },
    { name: 'Profile', path: '/profile' }
  ];

  const styles = {
    navContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px 0',
      gap: '15px',
      background: 'rgba(255, 255, 255, 0.15)', 
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      marginBottom: '30px'
    },
    // This function decides what the button looks like based on if it's active
    getLinkStyle: (isActive) => ({
      textDecoration: 'none',
      color: 'black',
      padding: '12px 24px',
      borderRadius: '25px',
      fontSize: '15px',
      fontWeight: 'bold',
      fontFamily: "'Quicksand', sans-serif",
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      // The "Normal" look
      background: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid transparent',
      
      // The "Active/Glow" look
      ...(isActive && {
        background: 'linear-gradient(45deg, #ff00cc, #a64dff)',
        boxShadow: '0 0 15px rgba(255, 0, 204, 0.8), 0 0 5px rgba(255, 255, 255, 0.5)',
        border: '2px solid white',
        transform: 'translateY(-2px)'
      })
    }),
    logoutBtn: {
      textDecoration: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '20px',
      fontSize: '14px',
      background: '#444',
      marginLeft: '30px',
      opacity: 0.8
    }
  };

  return (
    <nav style={styles.navContainer}>
      {navItems.map((item) => {
        // Check if the current URL matches this button's path
        const isActive = location.pathname === item.path;

        return (
          <Link 
            key={item.name} 
            to={item.path} 
            style={styles.getLinkStyle(isActive)}
          >
            {item.name}
          </Link>
        );
      })}
      <Link to="/" style={styles.logoutBtn}>Logout</Link>
    </nav>
  );
}

export default Navbar;
