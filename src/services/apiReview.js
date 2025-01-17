import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getReviews = async (sortBy) => {
  const user = await getCurrentUser();
  let allReviews = supabase
    .from("reviews")
    .select("*")
    .eq("seller_id", user.email);

  if (sortBy?.[0]) {
    if (sortBy[1] == "asc") {
      allReviews = allReviews.order(sortBy[0], { ascending: true });
    } else {
      allReviews = allReviews.order(sortBy[0], { ascending: false });
    }
  }

  let { data, error } = await allReviews;

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
