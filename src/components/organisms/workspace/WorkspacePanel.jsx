import { SideBarItem } from "@/components/atoms/sideBarItem/SideBarItem";
import { WorkspacePanelHeader } from "@/components/molecules/workspace/WorkspacePanelHeader";
import { WorkspacePanelSection } from "@/components/molecules/workspace/WorkspacePanelSection";
import { useGetWorkspaceById } from "@/hooks/apis/workspace/useGetWorkspaceById";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import {
  AlertTriangleIcon,
  HashIcon,
  Loader,
  MessageSquareIcon,
  SendHorizonalIcon,
} from "lucide-react";
import { useParams } from "react-router-dom";

export const WorkspacePanel = () => {
  const { workspaceId } = useParams();
  const { workspace, isFetching, isSuccess } = useGetWorkspaceById(workspaceId);
  const { setOpenCreateChannelModal } = useCreateChannelModal();

  if (isFetching) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
        <Loader className="animate-spin size-6 text-white" />
      </div>
    );
  }
  if (!isSuccess) {
    return (
      <div className="flex flex-col gap-y-2 h-full items-center justify-center text-white">
        <AlertTriangleIcon className="size-6 text-white" />
        Something went wrong
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-slack-medium">
      <WorkspacePanelHeader workspace={workspace} />

      <div className="flex flex-col px-2 mt-3">
        <SideBarItem
          label="Threads"
          icon={MessageSquareIcon}
          id="threads"
          variant="active"
        />
        <SideBarItem
          label="Drafts & Sends"
          icon={SendHorizonalIcon}
          id="drafts"
          variant="default"
        />
      </div>
      <WorkspacePanelSection
        label={"Channels"}
        onIconClick={() => setOpenCreateChannelModal(true)}
      >
        {workspace?.channels.map((channel) => {
          return (
            <SideBarItem
              key={channel._id}
              icon={HashIcon}
              label={channel.name}
              id={channel._id}
            />
          );
        })}
      </WorkspacePanelSection>
    </div>
  );
};
