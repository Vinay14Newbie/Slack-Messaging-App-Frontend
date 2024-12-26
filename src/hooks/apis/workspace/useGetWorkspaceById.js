import { fetchWorkspaceDetailsByIdRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (id) => {
  const { auth } = useAuth();

  const {
    isFetching,
    isSuccess,
    error,
    data: workspace,
  } = useQuery({
    //The queryFn does not receive parameters directly when useQuery is used.
    queryFn: () =>
      fetchWorkspaceDetailsByIdRequest({ workspaceId: id, token: auth?.token }),
    queryKey: [`fetchWorkspaceById-${id}`], //for caching the multiple workspace
    staleTime: 10000,
  });

  return {
    isFetching,
    isSuccess,
    error,
    workspace,
  };
};
