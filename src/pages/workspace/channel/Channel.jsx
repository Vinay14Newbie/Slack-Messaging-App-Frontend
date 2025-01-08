import { ChannelHeader } from "@/components/molecules/channel/ChannelHeader";
import { ChatInput } from "@/components/molecules/chatInput/ChatInput";
import { Message } from "@/components/molecules/message/Message";
import { useGetChannelById } from "@/hooks/apis/channel/useGetChannelById";
import { useGetChannelMessages } from "@/hooks/apis/channel/useGetChannelMessages";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

export const Channel = () => {
  const { channelId } = useParams();
  const { channel, isFetching, isError } = useGetChannelById(channelId);
  const { joinChannel } = useSocket();
  const { messageList, setMessageList } = useChannelMessages();
  const {
    isFetching: isFetchingMessages,
    messages,
    isSuccess: successInMessages,
  } = useGetChannelMessages(channelId);
  const queryClient = useQueryClient();

  // useRef provides a way to directly reference a DOM element without causing re-renders when the reference value changes. Unlike useState, changes to a ref don't trigger component updates, making it efficient for operations like DOM manipulation.
  const messageContainerListRef = useRef(null);

  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTop =
        messageContainerListRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (!isFetching && !isError) {
      joinChannel(channelId);
    }
    console.log("messages: ", messages);
  }, [isFetching, isError, channelId, joinChannel]);

  useEffect(() => {
    if (successInMessages) {
      console.log("Channel messages fetched");
      setMessageList(messages.reverse());
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

  if (isError) {
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
      <div
        ref={messageContainerListRef}
        className="flex-5 overflow-y-auto p-5 gap-y-2"
      >
        {messageList?.map((message) => {
          return (
            <Message
              key={message._id}
              body={message.body}
              authorImage={message.senderId.avatar}
              authorName={message.senderId.username}
              createdAt={message.createdAt}
              image={message.image}
            />
          );
        })}
      </div>
      <div className="flex-1" />
      <ChatInput />
    </div>
  );
};
