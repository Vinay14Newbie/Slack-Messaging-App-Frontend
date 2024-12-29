import { CreateChannelModal } from "@/components/molecules/createChannelModal/CreateChannelModal";
import { CreateWorkspaceModal } from "@/components/molecules/createWorkspaceModal/CreateWorkspaceModal";
import { WorkspacePreferenceModal } from "@/components/molecules/workspace/WorkspacePreferenceModal";

export const Modals = () => {
  return (
    <>
      <CreateWorkspaceModal />
      <WorkspacePreferenceModal />
      <CreateChannelModal />
    </>
  );
};
