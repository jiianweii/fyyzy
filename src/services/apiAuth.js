import supabase from "./supabase";

export async function login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
  }

  return data;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getSession();

  if (!data.session) return null;

  const { data: user, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
  }

  return user?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error(error);
  }
}

export async function insertUser(name, email) {
  const { error } = await supabase.from("users").insert({
    name,
    email,
  });

  if (error) {
    console.error(error);
  }
}

export async function register(name, email, password) {
  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (user) {
    console.log("USER EXIST");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error || userError) {
    console.error(error);
  }

  if (data.user.aud === "authenticated") insertUser(name, email);

  return data;
}
