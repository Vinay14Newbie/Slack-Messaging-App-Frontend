import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateWorkspace } from "@/hooks/apis/workspace/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateWorkspaceModal = function () {
  const queryClient = useQueryClient();

  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateWorkspaceModal();

  const { isPending, createWorkspaceMutation } = useCreateWorkspace();

  const [workspaceName, setWorkspaceName] = useState("");

  const navigate = useNavigate();

  const handleClose = () => {
    setOpenCreateChannelModal(false);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const data = await createWorkspaceMutation({ name: workspaceName });
      console.log("Created workspace successfully: ", data);
      navigate(`/workspaces/${data._id}`);
      queryClient.invalidateQueries("fetchWorkspaces");
    } catch (error) {
      console.log("Not able to create new workspace: ", error);
    } finally {
      setWorkspaceName("");
      setOpenCreateChannelModal(false);
    }
  }
  return (
    <Dialog open={openCreateChannelModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new workspace</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            required
            disabled={isPending}
            minLength={3}
            placeholder="Put the workspace name e.g. MyWorkspace, Dev Workspace etc.."
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />

          <div className="flex justify-end mt-5">
            <Button disabled={isPending}>Create Workspace</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
