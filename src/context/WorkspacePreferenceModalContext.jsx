import { createContext, useState } from "react";

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalContextProvider = ({ children }) => {
  const [openWorkspacePreferenceModal, setOpenWorkspacePreferenceModal] =
    useState(false);
  const [initialValue, setInitialValue] = useState("Edit workspace");

  return (
    <WorkspacePreferenceModalContext.Provider
      value={{
        openWorkspacePreferenceModal,
        setOpenWorkspacePreferenceModal,
        initialValue,
        setInitialValue,
      }}
    >
      {children}
    </WorkspacePreferenceModalContext.Provider>
  );
};

export default WorkspacePreferenceModalContext;
