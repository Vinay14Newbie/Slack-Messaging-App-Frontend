import { updateWorkspaceDetailsRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateWorkspaceDetails = (id) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateWorkspaceMutation,
  } = useMutation({
    mutationFn: (name) => {
      return updateWorkspaceDetailsRequest({
        name,
        workspaceId: id,
        token: auth?.token,
      });
    },
    onSuccess: (response) => {
      console.log("Workspace updated: ", response);
    },
    onError: (error) => {
      console.log("Error in updating workspace: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateWorkspaceMutation,
  };
};
