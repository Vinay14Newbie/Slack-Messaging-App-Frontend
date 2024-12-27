import WorkspacePreferenceModalContext from "@/context/WorkspacePreferenceModalContext";
import { useContext } from "react";

export const useWorkspacePreferenceModal = () => {
  return useContext(WorkspacePreferenceModalContext);
};
