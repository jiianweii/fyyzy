import supabase from "./supabase";

export async function getCategory(limit) {
  let { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .limit(limit);

  if (error) {
    console.error(error);
  }

  return categories;
}
