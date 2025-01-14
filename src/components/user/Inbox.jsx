import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { getChats, getMessage, sendMessage } from "../../services/apiMessenger";
import Loader from "../../ui/Loader";
import { useEffect, useState } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";

const InboxDiv = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  width: 100%;
  gap: 2rem;

  color: #fff;
`;

const RowDiv = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const ChatGroup = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  height: 100%;
  width: 30%;
  overflow-y: scroll;
`;

const ChatParty = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 1rem;
  cursor: pointer;
  color: #000;
  border-bottom: 1px solid #00000050;
`;

const ChatProductImg = styled.div`
  height: 50px;
  width: 50px;
  & img {
    height: 100%;
    width: 100%;
  }
`;

const ChatPartyInfo = styled.div`
  display: flex;
  gap: 1rem;
  width: 80%;

  & img {
    height: 60px;
    width: 60px;
    border-radius: 9999px;
    border: 1px solid #000;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.2rem;

    & h1 {
      font-size: 1rem;
    }

    & h2 {
      font-size: 0.9rem;
    }

    & p {
      font-size: 1rem;
    }
  }
`;

const ChatHeader = styled.div`
  background-color: #4a8ef3;
  padding: 1rem;
  height: 50px;

  display: flex;
  justify-content: center;

  & h1 {
    color: #fff;
    font-size: 1.2rem;
  }
`;

const ChatConversation = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  background-color: #526e97;
  justify-content: space-between;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const ChatUser = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1rem;
  height: 50px;

  justify-content: center;
  align-items: center;
  background-color: #4a8ef3;
  color: #fff;
  & div {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    & h1 {
      font-size: 1.2rem;
    }
  }
`;

const ChatUserStatus = styled.div`
  height: 6px;
  width: 6px;
  border-radius: 9999px;
  background-color: ${(props) => (props.active ? "#4fca3f" : "#c73939")};
`;

const TradeOffer = styled.div`
  display: flex;
  height: 75px;
  justify-content: space-between;
  padding: 0 1.5rem;
  align-items: center;
  background-color: #fff;
`;

const TradeInfo = styled.div`
  display: flex;
  gap: 1rem;
  height: 80%;

  & img {
    height: 100%;
    width: 50px;
  }
  & div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #000;
    gap: 0.4rem;

    & h1 {
      font-size: 1rem;
    }
    & p {
      font-size: 0.8rem;
      font-weight: 500;
    }
  }
`;

const TradeAction = styled.div`
  display: flex;
  gap: 1rem;
`;

const TradeButton = styled.button`
  padding: 1rem;
  background-color: ${(props) => props.bg};
  color: #fff;
  border: none;
`;

const ChatMessages = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  max-height: 80vh;
  width: 100%;
  overflow-y: scroll;
`;

const ChatMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-self: ${(props) =>
    props.type == "sender" ? "flex-end" : "flex-start"};
  text-align: ${(props) => (props.type == "sender" ? "right" : "left")};
  gap: 0.5rem;
`;

const ChatMessageName = styled.h1`
  color: #fff;

  font-size: 1rem;
`;
const ChatMessageBox = styled.p`
  padding: 0.5rem;
  background-color: #fff;
  color: #000;
  border-radius: 12px;
  max-width: 300px;
  text-align: left;
`;

const ChatResponder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  background-color: #fff;
  padding: 1rem;

  & input {
    padding: 0.7rem;
    width: 80%;
    border-radius: 7px;
    border: 1px solid #4a8ef3;
  }
  & button {
    padding: 0.7rem;
    border: none;
    background-color: #4a8ef3;
    color: #fff;
  }
`;

export default function Inbox() {
  const [currentInfo, setCurrentInfo] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [chatId, setChatId] = useState(null);
  const [message, setMessage] = useState("");
  const [currentChat, setCurrentChat] = useState([]);
  const { data: chat, isPending: isPendingChat } = useQuery({
    queryKey: ["chat"],
    queryFn: getChats,
  });

  useEffect(() => {
    const channel = supabase
      .channel(chatId)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setCurrentChat((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    return () => channel.unsubscribe();
  }, [chatId]);

  if (isPendingChat) return <Loader />;

  const getMessages = async (id) => {
    const messages = await getMessage(id);

    setCurrentChat(messages);
  };

  function handleChangeChat(user, chatInfo) {
    setCurrentInfo(chatInfo);
    setCurrentUser(user);
    setChatId(chatInfo.id);
    getMessages(chatInfo.id);
  }

  function handleOnChange(e) {
    setMessage(e.target.value);
  }

  function handleSubmit() {
    sendMessage(chatId, message);
    setMessage("");
  }

  return (
    <InboxDiv>
      <RowDiv>
        <ChatGroup>
          <ChatHeader>
            <h1>My Messages</h1>
          </ChatHeader>
          {chat &&
            chat[0].map((c, i) => {
              return (
                <ChatParty
                  onClick={() => handleChangeChat(chat[2][i], c)}
                  key={i}
                >
                  <ChatPartyInfo>
                    <img
                      src={
                        chat[2][i].image ??
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4n4D5jth4fm4GE7ut7lWW-04lnDO2OkD-sg&s"
                      }
                    />
                    <div>
                      <h1>{chat[2][i].name}</h1>
                      <h2>{c.products.name}</h2>
                      <p>Click here to view your messages</p>
                    </div>
                  </ChatPartyInfo>
                  <ChatProductImg>
                    <img src={c.products.images[0]} />
                  </ChatProductImg>
                </ChatParty>
              );
            })}
        </ChatGroup>
        <ChatConversation>
          <Column>
            {currentUser.name && (
              <ChatUser>
                <h1>{currentUser.name}</h1>
                {/* <div>
                  <ChatUserStatus active={status} />
                  <p>{status ? "Online" : "Offline"}</p>
                </div> */}
              </ChatUser>
            )}
            {currentUser.name && (
              <TradeOffer>
                <TradeInfo>
                  <img src={currentInfo.products.images[0]} />
                  <div>
                    <h1>{currentInfo.products.name}</h1>
                    <p>
                      Offer: 2023 Bowman Sterling Prospect Daniel Montesino
                      ROOKIE AUTO{" "}
                    </p>
                  </div>
                </TradeInfo>
                <TradeAction>
                  <TradeButton bg="green">ACCEPT</TradeButton>
                  <TradeButton bg="red">DECLINE</TradeButton>
                </TradeAction>
              </TradeOffer>
            )}

            {chatId && (
              <ChatMessages>
                {currentChat.map((d, i) => {
                  return (
                    <ChatMessage
                      key={i}
                      type={
                        chat[1].email == d.sender_id ? "sender" : "receiver"
                      }
                    >
                      <ChatMessageName>
                        {chat[1].email == d.sender_id ? "Me" : currentUser.name}
                      </ChatMessageName>
                      <ChatMessageBox>{d.message}</ChatMessageBox>
                    </ChatMessage>
                  );
                })}
              </ChatMessages>
            )}
          </Column>
          {chatId && (
            <ChatResponder>
              <input
                type="text"
                placeholder="Enter your message here"
                value={message}
                onChange={handleOnChange}
              />
              <button onClick={handleSubmit}>
                <FontAwesomeIcon icon={faArrowRightToBracket} />
              </button>
            </ChatResponder>
          )}
        </ChatConversation>
      </RowDiv>
    </InboxDiv>
  );
}
