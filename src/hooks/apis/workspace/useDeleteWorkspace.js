import { deleteWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { toast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useDeleteWorkspace = (workspaceId) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: deleteWorkspaceMutation,
  } = useMutation({
    mutationFn: () =>
      deleteWorkspaceRequest({ workspaceId, token: auth?.token }),
    onSuccess: (response) => {
      console.log("Workspace deleted successfully: ", response);

      toast({
        title: "Successfully deleted workspace",
        type: "success",
      });
    },
    onError: (error) => {
      console.log("Error in deleting workspace: ", error);
      toast({
        title: "Error while deleting workspace",
        message: error.message,
        type: "error",
        variant: "destructive",
      });
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    deleteWorkspaceMutation,
  };
};
