import { ChatInput } from "@/components/molecules/chatInput/ChatInput";
import { Message } from "@/components/molecules/message/Message";
import { useGetDMMessages } from "@/hooks/apis/dm/useGetDMMessages";
import { useAuth } from "@/hooks/context/useAuth";
import { useChannelMessages } from "@/hooks/context/useChannelMessages";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

export const DM = () => {
  const { joinDM } = useSocket();
  const { memberId } = useParams();
  const { auth } = useAuth();
  const { messageList, setMessageList } = useChannelMessages();
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);

  const {
    isFetching,
    messages,
    isError,
    isSuccess: successInMessages,
  } = useGetDMMessages({
    memberId: memberId,
    limit,
    page,
  });
  const queryClient = useQueryClient();

  const messageContainerListRef = useRef(null);

  useEffect(() => {
    if (messageContainerListRef.current) {
      messageContainerListRef.current.scrollTop =
        messageContainerListRef.current.scrollHeight;
    }
  }, [messageList, isFetching]);

  useEffect(() => {
    if (!isFetching && !isError) {
      joinDM(auth?.user?.id, memberId);
    }
  }, [isFetching, joinDM, memberId]);

  useEffect(() => {
    if (successInMessages) {
      setMessageList(messages.reverse());
    }
  }, [successInMessages, messages, setMessageList]);

  useEffect(() => {
    queryClient.invalidateQueries("getPaginatedMessages");
  }, [memberId]);

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
        <span className="text-sm text-muted-foreground">User Not Found</span>
      </div>
    );
  }
  return (
    <div className="flex flex-col h-full">
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
