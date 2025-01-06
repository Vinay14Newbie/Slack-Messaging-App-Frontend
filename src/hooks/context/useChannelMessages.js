import ChannelMessagesContext from "@/context/ChannelMessages";
import { useContext } from "react";

export const useChannelMessages = () => {
  return useContext(ChannelMessagesContext);
};
