import { getPaginatedDMsRequest } from "@/apis/dm";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetDMMessages = ({ memberId, limit, page }) => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    isError,
    error,
    data: messages,
  } = useQuery({
    queryFn: () =>
      getPaginatedDMsRequest({
        memberId,
        token: auth?.token,
        limit: limit || 10,
        page: page || 0,
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
