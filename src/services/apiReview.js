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

export const addReview = async (seller_id, rating, content, chatId) => {
  const user = await getCurrentUser();
  let { error } = await supabase.from("reviews").insert({
    seller_id,
    reviewer_id: user.email,
    rating,
    content,
  });

  let { error: chatError } = await supabase
    .from("chatroom")
    .update({ isCompleted: true })
    .eq("id", chatId);

  if (error || chatError) throw new Error(error.message || chatError.message);
};
