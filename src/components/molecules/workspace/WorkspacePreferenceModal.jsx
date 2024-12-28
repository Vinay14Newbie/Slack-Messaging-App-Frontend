import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useUpdateWorkspaceDetails } from "@/hooks/apis/workspace/useUpdateWorkspaceDetails";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferenceModal = () => {
  const queryClient = useQueryClient();
  const [workspaceId, setWorkspaceId] = useState(null);

  const navigate = useNavigate();
  const {
    initialValue,
    openWorkspacePreferenceModal,
    setOpenWorkspacePreferenceModal,
    workspace,
  } = useWorkspacePreferenceModal();
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  const { isPending, updateWorkspaceMutation } =
    useUpdateWorkspaceDetails(workspaceId);

  const workspaceName = workspace?.name;
  const [renameValue, setRenameValue] = useState(workspace?.name);

  useEffect(() => {
    setWorkspaceId(workspace?._id);
    setRenameValue(workspace?.name);
  }, [workspace]);

  const handleClose = () => {
    setOpenWorkspacePreferenceModal(false);
  };

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      await updateWorkspaceMutation(renameValue);
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
      toast({
        title: `Name changed successfully`,
        type: "success",
      });
    } catch (error) {
      console.log("Error while updating workspace name: ", error);
      toast({
        title: `Error in renaming ${workspaceName}`,
        type: "error",
      });
    }
  }

  async function deleteWorkspace() {
    try {
      await deleteWorkspaceMutation();
      navigate("/home");
      queryClient.invalidateQueries("fetchWorkspaces"); //it will invalidated existing cache present in the "fetchWorkspaces" key, & it will refetch the all workspaces
      setOpenWorkspacePreferenceModal(false);

      toast({
        title: `${workspaceName} workspace deleted successfully`,
        type: "success",
      });
    } catch (error) {
      console.log("Error in deleting workspace: ", error);

      toast({
        title: "Error while deleting workspace",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={openWorkspacePreferenceModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue}</DialogTitle>
        </DialogHeader>

        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog>
            <DialogTrigger>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">{initialValue}</p>
                  <p className="text-sm font-semibold hover:underline">Edit</p>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Workspce</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleFormSubmit}>
                <Input
                  value={renameValue}
                  onChange={(e) => setRenameValue(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={50}
                  disabled={isPending}
                  placeholder="Workspace Name e.g. Design Team"
                />

                <DialogFooter className="mt-2">
                  <DialogClose className="flex gap-x-2">
                    <Button variant="outline" type="button">
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isPending}>
                      Save
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          <button
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
            onClick={deleteWorkspace}
          >
            <TrashIcon className="size-5" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
