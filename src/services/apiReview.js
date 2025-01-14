import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getReviews = async () => {
  const user = await getCurrentUser();
  let { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("seller_id", user.email);

  if (error) throw new Error(error.message);

  return data;
};
