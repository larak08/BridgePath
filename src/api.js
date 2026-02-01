import { supabase } from './supabaseClient'; // Ensure this path is correct!

const getAuthToken = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.access_token;
};

export const fetchProfile = async () => {
  const token = await getAuthToken();
  if (!token) return null;
  const response = await fetch('http://localhost:5000/api/profile', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  return data.profile;
};

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

// --- THIS IS THE ONE VITE IS MISSING ---
export const matchExperts = async (interest, userRole) => {
  try {
    const token = await getAuthToken();
    const response = await fetch(`http://localhost:5000/api/match-experts?interest=${interest}&user_age_group=${userRole}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return await response.json();
  } catch (error) {
    console.error("Match Fetch Error:", error);
    return { matches: [] };
  }
};

// ... keep your existing imports and getAuthToken at the top

/**
 * Create a new request in the 'requests' table
 * @param {string} mentorId - The user_id of the mentor being requested
 * @param {string} skill - The expertise/skill the student is interested in
 */
export const createMentorshipRequest = async (mentorId, skill) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("User not authenticated");

    const { data, error } = await supabase
      .from('requests')
      .insert([
        { 
          student_id: user.id, 
          mentor_id: mentorId, 
          skill: skill,
          status: 'pending' 
        }
      ]);

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error("Error creating request:", error.message);
    return { success: false, error: error.message };
  }
};
export const respondToRequest = async (requestId, newStatus) => {
  const { data, error } = await supabase
    .from('requests')
    .update({ status: newStatus })
    .eq('id', requestId);

  if (error) {
    console.error("Update error:", error);
    return false;
  }
  return true;
};
/**
 * Fetch all requests where the current user is the student
 * Joins with the 'profiles' table to get the mentor's name
 */
export const fetchMyRequests = async () => {
  try {
    const { data, error } = await supabase
      .from('requests')
      .select(`
        id,
        status,
        skill,
        created_at,
        profiles:mentor_id (
          first_name,
          last_name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching requests:", error.message);
    return [];
  }
};