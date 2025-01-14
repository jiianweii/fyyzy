import supabase from "./supabase";

export async function getAuctions(limit) {
  let { data: auctions, error } = await supabase
    .from("auctions")
    .select("*")
    .order("startDate")
    .limit(limit);

  if (error) {
    console.error(error);
  }

  return auctions;
}
