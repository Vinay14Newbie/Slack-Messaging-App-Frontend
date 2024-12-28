import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { TrashIcon } from "lucide-react";

export const WorkspacePreferenceModal = () => {
  const {
    initialValue,
    openWorkspacePreferenceModal,
    setOpenWorkspacePreferenceModal,
  } = useWorkspacePreferenceModal();

  const handleClose = () => {
    setOpenWorkspacePreferenceModal(false);
  };

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

          <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <TrashIcon className="size-5" />
            <p className="text-sm font-semibold">Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
