import CreateChannelModalContext from "@/context/CreateChannelModalContext";
import { useContext } from "react";

export const useCreateChannelModal = () => {
  return useContext(CreateChannelModalContext);
};
