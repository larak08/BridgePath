import 'dotenv/config';
import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/requireAuth.js";
import { supabaseAsUser, getSupabase } from "./supabase.js"; // Ensure getSupabase is exported!

const app = express(); // 👈 This must happen BEFORE any app.get() calls

app.use(cors({ 
  origin: ["http://localhost:5173", "http://localhost:5174"] 
}));
app.use(express.json());

// --- YOUR TEST ROUTES GO HERE ---
 app.get("/api/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
});
// Add this mapping at the top of server.js
// 1. Define the ladder logic
const MENTOR_LADDER = {
  "Child": "HS Student",
  "HS Student": "Young Adult",
  "Young Adult": "Professional",
  "Professional": "Professional", // Professionals can mentor each other
  "Senior": "Professional"
};
const handleSearch = async () => {
  setIsLoading(true);
  
  // 1. Get the target age group from the ladder
  const targetAgeGroup = MENTOR_LADDER[userProfile.age_group];

  // 2. Fetch mentors
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('age_group', targetAgeGroup) // This ensures Child only sees HS Student
    .neq('user_id', userProfile.user_id); // Don't find yourself

  // 3. Extra Safety Check: Prevent older groups from seeing younger groups
  // Even if the DB query is correct, this prevents logic errors
  const filteredData = data.filter(mentor => {
    if (userProfile.age_group === 'HS Student' && mentor.age_group === 'Child') {
      return false; // HS Students cannot see Children
    }
    return true;
  });

  setMentors(filteredData);
  setIsLoading(false);
};
// 2. Create the search endpoint
// server.js

app.get("/api/match-experts", requireAuth, async (req, res) => {
  const { interest, user_age_group } = req.query;
  const sb = getSupabase();
  const targetRole = MENTOR_LADDER[user_age_group] || "Professional";

  // --- PASTE THE UPDATED CODE HERE ---
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    // This part makes the search much more flexible
    .ilike("age_group", `%${targetRole}%`) 
    .ilike("specific_expertise", `%${interest}%`)
    .neq("user_id", req.user.id);
  // --- END OF UPDATED CODE ---

  if (error) return res.status(400).json({ error: error.message });

  console.log(`Found ${data.length} matches for ${targetRole}`);
  res.json({ matches: data });
});
app.get("/api/health-db", async (req, res) => {
  try {
    const sb = getSupabase();
    const { error } = await sb.from("profiles").select("count", { count: 'exact', head: true });
    if (error) throw error;
    res.json({ ok: true, message: "Connected to Supabase" });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Auth routes
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await getSupabase().auth.signUp({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ user: data.user, session: data.session });
});

app.post("/api/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  const { data, error } = await getSupabase().auth.signInWithPassword({ email, password });
  if (error) return res.status(400).json({ error: error.message });

  res.json({ user: data.user, session: data.session });
});

// Profile routes
app.get("/api/profile", requireAuth, async (req, res) => {
  const sb = supabaseAsUser(req.accessToken);
  const { data, error } = await sb.from("profiles").select("*").eq("user_id", req.user.id).single();
  if (error && error.code !== 'PGRST116') return res.status(400).json({ error: error.message });
  res.json({ profile: data });
});app.post("/api/profile", requireAuth, async (req, res) => {
  const {
    first_name,
    last_name,
    age_group,
    categories,       // This MUST be an array
    specific_skills,
    description,
  } = req.body;

  const sb = supabaseAsUser(req.accessToken);

  const { data, error } = await sb
    .from("profiles")
    .upsert({
      user_id: req.user.id,
      first_name: first_name || "",
      last_name: last_name || "",
      age_group: age_group || "Other",
      knowledge_areas: Array.isArray(categories) ? categories : [], // 👈 Force it to be an array
      specific_expertise: specific_skills || "",
      bio: description || "",
      updated_at: new Date()
    },
    { onConflict: 'user_id' })
    .select()
    .single();

  if (error) {
    console.error("422 Debug - Supabase Error:", error.message);
    return res.status(422).json({ error: error.message }); // 👈 Standard for data errors
  }

  res.json({ profile: data });
});

// Matches route// server.js
app.get("/api/match-experts", requireAuth, async (req, res) => {
  const { interest, user_age_group } = req.query;
  const sb = getSupabase();
  const targetRole = MENTOR_LADDER[user_age_group] || "Professional";

  // 1. Get EVERYONE in that age group first
  const { data: allInGroup } = await sb
    .from("profiles")
    .select("*")
    .eq("age_group", targetRole);

  console.log(`--- DEBUG SEARCH ---`);
  console.log(`Looking for: ${targetRole} + ${interest}`);
  console.log(`People found in this group:`, allInGroup?.map(p => ({
    name: p.first_name,
    expertise: p.specific_expertise
  })));

  // 2. Now do the real filtered query
  const { data, error } = await sb
    .from("profiles")
    .select("*")
    .ilike("age_group", targetRole) // 👈 Use ilike here too!
  .ilike("specific_expertise", `%${interest}%`)
  .neq("user_id", req.user.id);
  res.json({ matches: data });
});

app.get("/api/test-save", async (req, res) => {
  const sb = getSupabase();
  const { data, error } = await sb
    .from("profiles")
    .upsert({ 
      user_id: "00000000-0000-0000-0000-000000000000", // Ensure this exists if FK is on
      first_name: "Test",
      last_name: "User",
      age_group: "25-34"
    })
    .select();

  if (error) return res.status(500).json({ success: false, error: error.message });
  return res.json({ success: true, data });
});

// --- REST OF YOUR ROUTES ---

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));