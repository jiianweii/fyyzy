import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getUserById = async (id) => {
  let { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", id);

  if (error) throw new Error(error.message);

  return data;
};

export const getUserInfo = async () => {
  const user = await getCurrentUser();

  let { data: products, error: prodError } = await supabase
    .from("products")
    .select("*")
    .eq("created_by", user.email);

  let { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("*")
    .eq("seller_id", user.email);

  if (prodError || reviewError)
    throw new Error(prodError.message || reviewError.message);

  // GET ALL OFFERS
  const ids = products.map((product) => product.id);

  let { data: offers, error: offerError } = await supabase
    .from("offers")
    .select("*")
    .in("product_id", ids);

  if (offerError) throw new Error(offerError.message);

  return { products, reviews, offers };
};

export const getSellerInfo = async (id) => {
  let { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("email", id);

  let { data: products, error: prodError } = await supabase
    .from("products")
    .select("*")
    .eq("created_by", id);

  let { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("*")
    .eq("seller_id", id);

  if (prodError || reviewError)
    throw new Error(prodError.message || reviewError.message);

  // GET ALL OFFERS
  const ids = products.map((product) => product.id);

  let { data: offers, error: offerError } = await supabase
    .from("offers")
    .select("*")
    .in("product_id", ids);

  if (userError || prodError || reviewError || offerError)
    throw new Error(
      userError.message ||
        prodError.message ||
        reviewError.message ||
        offerError.message
    );

  return { user, products, reviews, offers };
};
