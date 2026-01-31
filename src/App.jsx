import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

function Page({ title }) {
  return <h2 style={{ fontFamily: "system-ui" }}>{title}</h2>;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Simple navigation */}
      <div
        style={{
          padding: 16,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Link to="/signin">Sign In</Link>
        <Link to="/onboarding">Onboarding</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/bridge-sessions">Bridge Sessions</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/chat">Chat</Link>
      </div>

      {/* Page content */}
      <div style={{ padding: 24 }}>
        <h1 style={{ fontFamily: "system-ui" }}>BridgePath</h1>

        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<Page title="Sign In" />} />
          <Route path="/onboarding" element={<Page title="Onboarding" />} />
          <Route path="/dashboard" element={<Page title="Dashboard" />} />
          <Route path="/bridge-sessions" element={<Page title="Bridge Sessions" />} />
          <Route path="/profile" element={<Page title="Profile" />} />
          <Route path="/chat" element={<Page title="Chat" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
