import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Copy, RefreshCcwIcon } from "lucide-react";

export const WorkspaceInviteModal = ({
  openInviteModal,
  setOpenInviteModal,
  workspaceName,
  joinCode,
}) => {
  const { toast } = useToast();

  const handleClose = () => {
    setOpenInviteModal(false);
  };

  async function handleCopy() {
    const inviteLink = `${window.location.origin}/join/${joinCode}`;
    await navigator.clipboard.writeText(inviteLink);
    toast({
      title: "Link copied to clipboard",
      type: "success",
    });
  }

  const handleResetCode = async () => {};

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
