import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const [currentChannel, setCurrentChannel] = useState(null);
  const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);
  const { messageList, setMessageList } = useChannelMessages();

  async function joinChannel(channelId) {
    socket.emit("JoinChannel", { channelId }, (data) => {
      console.log("Successfully joined the channel: ", data);
      setCurrentChannel(data?.data);
    });
  }

  socket.on("NewMessageReceived", (data) => {
    console.log("New message received: ", data);
    setMessageList([...messageList, data]);
  });

  return (
    <SocketContext.Provider value={{ socket, currentChannel, joinChannel }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
