import { createWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspace = () => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: createWorkspaceMutation,
  } = useMutation({
    // passing multiple arguments to 'mutationFn'
    mutationFn: (data) => {
      createWorkspaceRequest({ ...data, token: auth?.token });
    },
    onSuccess: (response) => {
      console.log("Response in create workspace: ", response);
    },
    onError: (error) => {
      console.log("Error in create workspace: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    createWorkspaceMutation,
  };
};
