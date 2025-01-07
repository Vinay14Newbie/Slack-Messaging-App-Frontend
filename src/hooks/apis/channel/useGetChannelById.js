import { getChannelByIdRequest } from "@/apis/channel";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetChannelById = (channelId) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    isError,
    data: channel,
  } = useQuery({
    queryFn: () => getChannelByIdRequest({ channelId, token: auth?.token }),
    queryKey: [`getChannel-${channelId}`],
  });
  return {
    isFetching,
    isSuccess,
    error,
    isError,
    channel,
  };
};
