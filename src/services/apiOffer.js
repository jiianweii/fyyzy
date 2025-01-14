import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const createBidOffer = async (id, bidOffer) => {
  const user = await getCurrentUser();

  let { error } = await supabase.from("offers").insert({
    product_id: id,
    offerer_id: user.email,
    bidOffer,
  });

  if (error) throw new Error(error.message);
};

export const createTradeOffer = async (id, tradeOffer) => {
  const user = await getCurrentUser();

  let { error } = await supabase.from("offers").insert({
    product_id: id,
    offerer_id: user.email,
    tradeOffer,
  });

  if (error) throw new Error(error.message);
};

export const createBuyOffer = async (id, buyOffer) => {
  const user = await getCurrentUser();

  let { error } = await supabase.from("offers").insert({
    product_id: id,
    offerer_id: user.email,
    buyOffer,
  });

  if (error) throw new Error(error.message);
};

export const getOffer = async (id) => {
  let { data, error } = await supabase
    .from("offers")
    .select("*")
    .order("bidOffer", { ascending: false })
    .neq("status", "REJECTED")
    .eq("product_id", id);

  if (error) throw new Error(error.message);

  return data;
};

export const updateOffer = async (id, status) => {
  let { data, error } = await supabase
    .from("offers")
    .update({
      status,
    })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return data;
};
