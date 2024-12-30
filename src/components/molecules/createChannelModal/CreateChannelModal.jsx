import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspace/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export const CreateChannelModal = () => {
  const queryClient = useQueryClient();
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();
  const [channelName, setChannelName] = useState("");

  const { currentWorkspace } = useCurrentWorkspace();
  const [workspaceId, setWorkspaceId] = useState(null);
  const { isPending, addChannelToWorkspaceMutation } =
    useAddChannelToWorkspace();

  useEffect(() => {
    setWorkspaceId(currentWorkspace?._id);
  }, [currentWorkspace]);

  const handleClose = () => {
    setOpenCreateChannelModal(false);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addChannelToWorkspaceMutation({
        channelName,
        workspaceId,
      });

      toast({
        type: "success",
        title: "Channel created successfully",
      });

      console.log("Channel created successfully");
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
      handleClose();
    } catch (error) {
      console.log("Not able to create new channel: ", error);
    } finally {
      setOpenCreateChannelModal(false);
      setChannelName("");
    }
  };

  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new channel</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            required
            onChange={(e) => setChannelName(e.target.value)}
            placeholder="Put a channel name e.g. saveEarth"
            disabled={isPending}
          />

          <div className="flex justify-end mt-5">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              className="mr-3"
            >
              Cancel
            </Button>
            <Button>Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
