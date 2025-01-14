import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getMessage = async (id) => {
  let { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", id);

  if (error) console.log(error);

  return data;
};

export const sendMessage = async (chatId, message) => {
  const user = await getCurrentUser();
  let { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, message, sender_id: user.email });

  if (error) console.log(error);

  return data;
};

// ADD ORDER ID
export const createChat = async (product_id, seller_id) => {
  const user = await getCurrentUser();

  let { data: chat, error: chatError } = await supabase
    .from("chatroom")
    .select("*")
    .eq("product_id", product_id)
    .contains("chat_users", [seller_id, user.email])
    .single();

  if (
    chat?.chat_users.length == 2 &&
    chat?.chat_users.includes(seller_id) &&
    chat?.chat_users.includes(user.email)
  ) {
    console.log("Room Exists!");
    return;
  }

  let { data, error } = await supabase.from("chatroom").insert({
    product_id,
    chat_users: [seller_id, user.email],
  });

  console.log(data);

  if (chatError || error) {
    console.log("error");
  }

  return data;
};

export const getChats = async () => {
  const user = await getCurrentUser();

  let { data: chat, error: chatError } = await supabase
    .from("chatroom")
    .select("*, products(*)")
    .contains("chat_users", [user.email]);

  const users = chat
    .map((c) => c.chat_users.filter((u) => u != user.email))
    .flat();

  let { data, error: userError } = await supabase
    .from("users")
    .select("*")
    .in("email", users);

  if (chatError || userError) {
    console.error(chatError);
  }

  const newChat = [Array(...chat), user, data];

  return newChat;
};
