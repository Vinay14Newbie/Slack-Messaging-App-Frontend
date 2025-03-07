import { getPaginateMessagesRequest } from "@/apis/channel";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelMessages = ({ channelId, limit, page }) => {
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
        limit: limit || 10,
        page: page || 0,
      }),
    queryKey: [`getPaginatedMessages`],
    // cacheTime: 0,
  });

  return {
    isFetching,
    isSuccess,
    isError,
    error,
    messages,
  };
};
