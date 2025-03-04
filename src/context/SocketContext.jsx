import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const [currentDMId, setCurrentDMId] = useState(null);
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
  const { messageList, setMessageList } = useChannelMessages();

  async function joinChannel(channelId) {
    socket.emit("JoinChannel", { channelId }, (data) => {
      console.log("Successfully joined the channel: ", data);
      setCurrentChannel(data?.data);
    });
  }

  async function joinDM(senderId, receiverId) {
    socket.emit("JoinDM", { senderId, receiverId }, (data) => {
      console.log("Successfully joned room for DM: ", data);
      setCurrentDMId(data?.data);
    });
  }

  socket.on("NewMessageReceived", (data) => {
    console.log("New message received: ", data);
    setMessageList([...messageList, data]);
  });

  socket.on("NewDMReceived", (data) => {
    console.log("data in dm event ", data);
    setMessageList([...messageList, data]);
  });

  return (
    <SocketContext.Provider
      value={{ socket, currentChannel, joinChannel, joinDM, currentDMId }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
