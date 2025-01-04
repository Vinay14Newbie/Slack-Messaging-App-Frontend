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
import { useUpdateChannel } from "@/hooks/apis/workspace/useUpdateChannel";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { toast } from "@/hooks/use-toast";
import { useConfim } from "@/hooks/useConfirm";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

export const ChannelHeader = ({ name, channelId }) => {
  const queryClient = useQueryClient();
  const { currentWorkspace } = useCurrentWorkspace();
  const [channelName, setChannelName] = useState(name);
  const [workspaceId, setWorkspaceId] = useState(null);
  const { isPending, updateChannelMutation } = useUpdateChannel(
    channelId,
    workspaceId
  );
  const {
    confirmation: updateChannelNameConfirmation,
    ConfirmDialog: UpdateDialog,
  } = useConfim({
    title: "Do you want to update the channel name",
    message: "You can again update the name of channel",
  });

  useEffect(() => {
    setWorkspaceId(currentWorkspace?._id);
  }, [currentWorkspace]);

  async function handleOnSubmitRename(e) {
    e.preventDefault();
    try {
      const ok = await updateChannelNameConfirmation();
      console.log("confirmation received");
      if (!ok) return;

      await updateChannelMutation(channelName);
      queryClient.invalidateQueries(`getChannel-${channelId}`);
      toast({
        title: `Name changed successfully`,
        type: "success",
      });
    } catch (error) {
      console.log("Error while updating channel name: ", error);
      toast({
        title: `Error in renaming ${name}`,
        type: "error",
      });
    }
  }

  return (
    <div className="bg-white border-b h-[50px] flex items-center px-4 overflow-hidden">
      <UpdateDialog />
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-lg font-semibold px-2 w-auto overflow-hidden"
          >
            <span># {name}</span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {name}</DialogTitle>
          </DialogHeader>

          <Dialog>
            <DialogTrigger>
              <div className="px-4 pb-4 flex flex-col gap-y-2">
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-sm font-semibold">Edit</p>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Rename Channel</DialogTitle>
              </DialogHeader>

              <form onSubmit={handleOnSubmitRename}>
                <Input
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                  autoFocus
                  minLength={3}
                  maxLength={50}
                  disabled={isPending}
                  placeholder="Channel Name e.g. SaveEarth"
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
        </DialogContent>
      </Dialog>
    </div>
  );
};
