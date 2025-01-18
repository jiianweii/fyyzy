import { useEffect } from "react";
import supabase from "../services/supabase";
import { useUser } from "../components/authentication/useUser";
import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { findChat } from "../services/apiChat";

export default function Notification() {
  const { data, isAuthenticated } = useUser();
  const { data: chat, isPending } = useQuery({
    queryKey: ["chatroom", data],
    queryFn: () => findChat(data.email),
    enabled: isAuthenticated,
  });

  useEffect(() => {
    if (isPending || !chat) return;
    console.log(chat);

    if (isAuthenticated) {
      const ids = chat.map((c) => {
        return c.id;
      });

      const channel = supabase
        .channel("inbox")
        .on(
          "postgres_changes",
          { event: "INSERT", schema: "public", table: "messages" },
          (payload) => {
            if (
              ids.includes(payload.new.chat_id) &&
              data.email != payload.new.sender_id
            ) {
              console.log("");
              toast(`You have 1 new message from ${payload.new.sender_id}`);
            }
          }
        )
        .subscribe();

      return () => channel.unsubscribe();
    }
  }, [isAuthenticated, data?.email]);
}
