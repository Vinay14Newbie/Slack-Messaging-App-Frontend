import { ChannelHeader } from "@/components/molecules/channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/chatInput/ChatInput";
import { Message } from "@/components/molecules/message/Message";
import { useGetChannelById } from "@/hooks/apis/channel/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channel/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();
  const { channel, isFetching, error } = useGetChannelById(channelId);
  const { joinChannel } = useSocket();
  const { messageList, setMessageList } = useChannelMessages();
  const {
    isFetching: isFetchingMessages,
    messages,
    isSuccess: successInMessages,
  } = useGetChannelMessages(channelId);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isFetching && !error) {
      joinChannel(channelId);
    }
    console.log("messages: ", messages);
  }, [isFetching, error, messages]);

  useEffect(() => {
    if (successInMessages) {
      console.log("Channel messages fetched");
      setMessageList(messages);
    }
  }, [successInMessages, messages, channelId, setMessageList]);

  useEffect(() => {
    queryClient.invalidateQueries("getPaginatedMessages");
  }, [channelId]);

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
      {messageList &&
        messageList.map((message) => {
          return (
            <Message
              key={message._id}
              body={message.body}
              authorImage={message.senderId.avatar}
              authorName={message.senderId.username}
              createdAt={message.createdAt}
            />
          );
        })}
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
