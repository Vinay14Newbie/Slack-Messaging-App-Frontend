import combineContext from "@/utils/combineContext";
import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./CreateWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";
import { CreateChannelModalContextProvider } from "./CreateChannelModalContext";

export const AppContextProvider = combineContext(
  AuthContextProvider,
  CreateWorkspaceContextProvider,
  WorkspacePreferenceModalContextProvider,
  CreateChannelModalContextProvider
);
