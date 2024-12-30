import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useResetJoinCodeOfWorkspace } from "@/hooks/apis/workspace/useResetJoinCodeOfWorkspace";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCcwIcon } from "lucide-react";

export const WorkspaceInviteModal = ({
  openInviteModal,
  setOpenInviteModal,
  workspaceName,
  joinCode,
  workspaceId,
}) => {
  const { toast } = useToast();
  const { resetJoinCodeOfWorkspaceMutation } =
    useResetJoinCodeOfWorkspace(workspaceId);

  const handleClose = () => {
    setOpenInviteModal(false);
  };

  async function handleCopy() {
    const inviteLink = `${joinCode}`;
    await navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied to clipboard",
      type: "success",
    });
  }

  const handleResetCode = async () => {
    try {
      const response = await resetJoinCodeOfWorkspaceMutation(workspaceId);
      toast({
        title: "Join code reset successfully...!",
        type: "success",
      });
    } catch (error) {
      console.log("Failed to reset joinCode of Workspace");
      throw error;
    }
  };

  return (
    <Dialog open={openInviteModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite people to {workspaceName}</DialogTitle>
          <DialogDescription>
            Use the code shown below to invite people to your workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center py-10 gap-y-4">
          <p className="font-bold text-4xl uppercase">{joinCode}</p>
          <Button onClick={handleCopy} size="sm" variant="ghost">
            Copy Link
            <Copy className="size-4 ml-2" />
          </Button>

          {/* Link to redirect the user in a new tab to the join page */}
          <a
            href={`/workspaces/join/${workspaceId}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-500 hover:underline"
          >
            Redirect to join page
          </a>
        </div>

        <div className="flex justify-center items-center">
          <Button variant="outline" onClick={handleResetCode}>
            Reset Join Code
            <RefreshCcwIcon className="size-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
