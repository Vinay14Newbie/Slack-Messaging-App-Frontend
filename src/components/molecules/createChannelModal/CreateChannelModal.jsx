import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useState } from "react";

export const CreateChannelModal = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();
  const [channelName, setChannelName] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Dialog
      open={openCreateChannelModal}
      onOpenChange={() => setOpenCreateChannelModal(false)}
    >
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
          />

          <div className="flex justify-end mt-5">
            <Button>Create Channel</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
