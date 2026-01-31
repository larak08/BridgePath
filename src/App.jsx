import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; 
import SignIn from './Pages/Pages/SignIn';
import Chat from './Pages/Pages/Chat';
import Profile from './Pages/Pages/Profile';
import Dashboard from './Pages/Pages/Dashboard';
import Onboarding from './Pages/Pages/Onboarding';

function App() {
  return (
    /* This is the wrap that fixes the useNavigate error */
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/onboarding" element={<Onboarding />} />
      </Routes>
    </Router>
  );
}

export default App;

