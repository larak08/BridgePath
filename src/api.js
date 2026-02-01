import { supabase } from './supabaseClient';

// Helper to get the current session token
const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

// --- 1. EXPORT THE FETCH FUNCTION ---
export const fetchProfile = async () => {
  const token = await getAuthToken();
  if (!token) return null;

  const response = await fetch('http://localhost:5000/api/profile', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const data = await response.json();
  return data.profile; // Returns the profile object from your backend
};

// --- 2. EXPORT THE UPDATE FUNCTION ---
export const updateProfile = async (profileData) => {
  const token = await getAuthToken();
  if (!token) return false;

  const response = await fetch('http://localhost:5000/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(profileData)
  });
  
  return response.ok;
};