import supabase from "./supabase";

export const findChat = async (email) => {
  let { data, error } = await supabase
    .from("chatroom")
    .select("id")
    .contains("chat_users", [email]);

  if (error) throw new Error(error);

  return data;
};
