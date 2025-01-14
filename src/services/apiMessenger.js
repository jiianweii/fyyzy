import toast from "react-hot-toast";
import { getCurrentUser } from "./apiAuth";
import supabase from "./supabase";

export const getMessage = async (id) => {
  let { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", id);

  if (error) throw new Error(error.message);

  return data;
};

export const sendMessage = async (chatId, message) => {
  const user = await getCurrentUser();
  let { data, error } = await supabase
    .from("messages")
    .insert({ chat_id: chatId, message, sender_id: user.email });

  if (error) throw new Error(error.message);

  return data;
};

// ADD ORDER ID
// MODIFIED TO ALLOW SELLER TO ACCEPT INSTEAD
export const createChat = async (product_id, offer_id, buyer_id, seller_id) => {
  let { data: chat, error: chatError } = await supabase
    .from("chatroom")
    .select("*")
    .eq("product_id", product_id)
    .contains("chat_users", [buyer_id, seller_id])
    .single();

  if (
    chat?.chat_users.length == 2 &&
    chat?.chat_users.includes(buyer_id) &&
    chat?.chat_users.includes(seller_id)
  )
    return;

  let { data, error } = await supabase.from("chatroom").insert({
    product_id,
    chat_users: [buyer_id, seller_id],
    offer_id,
  });

  if (chatError || error) {
    throw new Error(chatError.message || error.message);
  }

  return { chat, data };
};

export const getChats = async () => {
  const user = await getCurrentUser();

  let { data: chat, error: chatError } = await supabase
    .from("chatroom")
    .select("*, products(*)")
    .contains("chat_users", [user.email])
    .eq("isCompleted", false);

  const users = chat
    .map((c) => c.chat_users.filter((u) => u != user.email))
    .flat();

  let { data, error: userError } = await supabase
    .from("users")
    .select("*")
    .in("email", users);

  if (chatError || userError) {
    throw new Error(chatError.message || userError.message);
  }

  const newChat = [Array(...chat), user, data];

  return newChat;
};
