import { getPaginateMessagesRequest } from "@/apis/channel";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelMessages = (channelId) => {
  const { auth } = useAuth();

  const {
    isFetching,
    isSuccess,
    isError,
    error,
    data: messages,
  } = useQuery({
    queryFn: () =>
      getPaginateMessagesRequest({
        channelId,
        token: auth?.token,
        limit: 10,
        offset: 0,
      }),
    queryKey: [`getPaginatedMessages`],
  });

  return {
    isFetching,
    isSuccess,
    isError,
    error,
    messages,
  };
};
