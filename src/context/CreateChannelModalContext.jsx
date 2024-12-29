const { createContext, useState } = require("react");

const CreateChannelModalContext = createContext();

export const CreateChannelModalContextProvider = ({ children }) => {
  const [openCreateChannelModal, setOpenCreateChannelModal] = useState(false);

  return (
    <CreateChannelModalContext.Provider
      value={{ openCreateChannelModal, setOpenCreateChannelModal }}
    >
      {children}
    </CreateChannelModalContext.Provider>
  );
};

export default CreateChannelModalContext;
