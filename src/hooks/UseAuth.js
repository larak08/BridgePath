import { useState } from "react";
import { supabase } from "../supabaseClient";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // SIGN IN
  const signIn = async (email, password) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  // SIGN UP
  const signUp = async (email, password) => {
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signUp({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return false;
    }

    return true;
  };

  // SIGN OUT
  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return {
    signIn,
    signUp,
    signOut,
    loading,
    error
  };
}
