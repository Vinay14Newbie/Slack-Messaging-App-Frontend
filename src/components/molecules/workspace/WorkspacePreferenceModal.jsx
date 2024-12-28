import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferenceModal = () => {
  const navigate = useNavigate();
  const {
    initialValue,
    openWorkspacePreferenceModal,
    setOpenWorkspacePreferenceModal,
    workspace,
  } = useWorkspacePreferenceModal();

  const queryClient = useQueryClient();
  const workspaceName = workspace?.name;
  const [workspaceId, setWorkspaceId] = useState(null);

  useEffect(() => {
    setWorkspaceId(workspace?._id);
  }, [workspace]);

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

  const handleClose = () => {
    setOpenWorkspacePreferenceModal(false);
  };

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
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">{initialValue}</p>
              <p className="text-sm font-semibold hover:underline">Edit</p>
            </div>
          </div>

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
