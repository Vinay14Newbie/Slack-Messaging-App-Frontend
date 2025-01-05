import { ChannelHeader } from "@/components/molecules/channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/chatInput/ChatInput";
import { useGetChannelById } from "@/hooks/apis/channel/useGetChannelById";
import { useSocket } from "@/hooks/context/useSocket";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();
  const { channel, isFetching, error } = useGetChannelById(channelId);
  const { joinChannel } = useSocket();

  useEffect(() => {
    if (!isFetching && !error) {
      joinChannel(channelId);
    }
  }, [isFetching, error]);

  if (isFetching) {
    return (
      <div className="h-full flex flex-1 items-center justify-center">
        <Loader2Icon className="size-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex flex-1 flex-col gap-y-2 items-center justify-center">
        <TriangleAlertIcon className="size-6 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Channel Not Found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
      <ChannelHeader name={channel?.name} channelId={channelId} />
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
