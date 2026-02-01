import 'dotenv/config';
import express from "express";
import cors from "cors";
import { requireAuth } from "./middleware/requireAuth.js";
import { supabaseAsUser, getSupabase } from "./supabase.js"; // Ensure getSupabase is exported!

const app = express(); // 👈 This must happen BEFORE any app.get() calls

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// --- YOUR TEST ROUTES GO HERE ---
 app.get("/api/me", requireAuth, (req, res) => {
  res.json({ id: req.user.id, email: req.user.email });
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
});

app.post("/api/profile", requireAuth, async (req, res) => {
  const {
    firstName,
    lastName,
    ageGroup,
    knowledgeAreas,
    specificExpertise,
    bio,
  } = req.body;

  if (!ageGroup) return res.status(400).json({ error: "ageGroup is required" });

  const sb = supabaseAsUser(req.accessToken);

  const { data, error } = await sb
    .from("profiles")
    .upsert({
      user_id: req.user.id,
      first_name: firstName,
      last_name: lastName,
      age_group: ageGroup,
      knowledge_areas: knowledgeAreas,
      specific_expertise: specificExpertise,
      bio,
    },
    { 
      onConflict: 'user_id' // 👈 ADD THIS LINE
    })
    .select() // 👈 You MUST add .select() to get data back
    .single(); // 👈 This gives you the object directly instead of an array

  if (error) return res.status(400).json({ error: error.message });

  res.json({ profile: data }); // Now data is the saved object
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