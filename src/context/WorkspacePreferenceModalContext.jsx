import { createContext, useState } from "react";

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalContextProvider = ({ children }) => {
  const [openWorkspacePreferenceModal, setOpenWorkspacePreferenceModal] =
    useState(false);
  const [initialValue, setInitialValue] = useState("Edit workspace");
  const [workspace, setWorkspace] = useState("");

  return (
    <WorkspacePreferenceModalContext.Provider
      value={{
        openWorkspacePreferenceModal,
        setOpenWorkspacePreferenceModal,
        initialValue,
        setInitialValue,
        workspace,
        setWorkspace,
      }}
    >
      {children}
    </WorkspacePreferenceModalContext.Provider>
  );
};

export default WorkspacePreferenceModalContext;
