import supabase from "./supabase";

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function insertUser(name, email) {
  const { error } = await supabase.from("users").insert({
    name,
    email,
  });

  if (error) {
    throw new Error(error.message);
  }
}

export async function register(name, email, password) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (user) {
    return null;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || userError) {
    throw new Error(error.message || userError.message);
  }

  if (data.user.aud === "authenticated") insertUser(name, email);

  return data;
}
