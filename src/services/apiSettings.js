import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getSettings = async () => {
  const user = await getCurrentUser();

  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

  if (error) {
    console.error(error);
  }

  return data;
};

export const insertProfilePhoto = async (profile) => {
  const name = Math.random() + profile.name;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(`${name}`, profile);

  const { data } = supabase.storage.from("avatars").getPublicUrl(`${name}`);

  if (error) {
    throw new Error(error.message);
  }

  return data.publicUrl;
};

export const updateSettings = async (name, profile, bio, password) => {
  const curr = await getCurrentUser();
  const user = {};

  if (name) user.name = name;
  if (bio) user.bio = bio;
  if (profile) {
    user.image = await insertProfilePhoto(profile);
  }

  let { data, error } = await supabase
    .from("users")
    .update(user)
    .eq("email", curr.email);

  if (error) {
    throw new Error(error);
  }

  if (password) {
    const { error: userError } = await supabase.auth.updateUser({
      password,
    });

    if (userError) {
      throw new Error(userError);
    }
  }
  return data;
};
