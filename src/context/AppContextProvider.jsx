import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";
import { CreateChannelModalContextProvider } from "./CreateChannelModalContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessagesContextProvider } from "./ChannelMessages";

export const AppContextProvider = combineContext(
  ChannelMessagesContextProvider,
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferenceModalContextProvider,
  CreateChannelModalContextProvider,
  WorkspaceContextProvider,
  SocketContextProvider
);
