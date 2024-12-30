import { resetJoinCodeOfWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetJoinCodeOfWorkspace = (workspaceId) => {
  const { auth } = useAuth();
  const queryClient = useQueryClient();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: resetJoinCodeOfWorkspaceMutation,
  } = useMutation({
    mutationFn: (workspaceId) =>
      resetJoinCodeOfWorkspaceRequest({ workspaceId, token: auth?.token }),
    onSuccess: (response) => {
      console.log("Join code of Workspace reseted successfully: ", response);
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
    },
    onError: (error) => {
      console.log("Error while reseting workspace joinCode: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    resetJoinCodeOfWorkspaceMutation,
  };
};
