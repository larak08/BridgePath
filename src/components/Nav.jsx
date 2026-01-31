import { Link, useLocation } from "react-router-dom";

const linkStyle = (active) => ({
  marginRight: 12,
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 10,
  border: "1px solid #ddd",
  background: active ? "#f2f2f2" : "white",
  color: "black",
});

export default function Nav() {
  const { pathname } = useLocation();

  return (
    <div style={{ padding: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
      <Link style={linkStyle(pathname === "/signin")} to="/signin">Sign In</Link>
      <Link style={linkStyle(pathname === "/onboarding")} to="/onboarding">Onboarding</Link>
      <Link style={linkStyle(pathname === "/dashboard")} to="/dashboard">Dashboard</Link>
      <Link style={linkStyle(pathname === "/bridge-sessions")} to="/bridge-sessions">Bridge Sessions</Link>
      <Link style={linkStyle(pathname === "/profile")} to="/profile">Profile</Link>
      <Link style={linkStyle(pathname === "/chat")} to="/chat">Chat</Link>
    </div>
  );
}
