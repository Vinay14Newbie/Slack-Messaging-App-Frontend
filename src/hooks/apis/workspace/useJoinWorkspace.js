import { joinWorkspaceByJoinCodeRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useJoinWorkspace = (workspaceId) => {
  const { auth } = useAuth();

  const {
    isSuccess,
    isPending,
    error,
    mutateAsync: joinWorkspaceMutation,
  } = useMutation({
    mutationFn: (joinCode) =>
      joinWorkspaceByJoinCodeRequest({
        workspaceId,
        joinCode,
        token: auth?.token,
      }),
    onSuccess: (response) => {
      console.log("Response from join workspace request", response);
    },
    onError: (error) => {
      console.log("Error to join workspace", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    joinWorkspaceMutation,
  };
};
