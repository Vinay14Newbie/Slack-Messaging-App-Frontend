import { fetchWorkspacesRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useFetchWorkspaces = () => {
  const { auth } = useAuth();
  const {
    isFetching,
    isSuccess,
    error,
    data: workspaces,
  } = useQuery({
    // passing multiple arguments to 'mutationFn'
    queryFn: () => {
      fetchWorkspacesRequest({ token: auth?.token });
    },
    queryKey: "fetchWorkspaces", // helps cache and differentiate queries.
    staleTime: 30000, // reduces refetching for frequently used queries by considering data fresh for a specified time.
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspaces,
  };
};
