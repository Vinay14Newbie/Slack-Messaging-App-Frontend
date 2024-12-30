import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";
import { CreateChannelModalContextProvider } from "./CreateChannelModalContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferenceModalContextProvider,
  CreateChannelModalContextProvider,
  WorkspaceContextProvider
);
