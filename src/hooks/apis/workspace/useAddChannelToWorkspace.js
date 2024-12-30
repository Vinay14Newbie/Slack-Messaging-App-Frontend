import { addChannelToWorkspaceRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useAddChannelToWorkspace = () => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: addChannelToWorkspaceMutation,
  } = useMutation({
    mutationFn: ({ channelName, workspaceId }) => {
      return addChannelToWorkspaceRequest({
        channelName,
        token: auth?.token,
        workspaceId,
      });
    },
    onSuccess: (response) => {
      console.log("Response in create channel: ", response);
    },
    onError: (error) => {
      console.log("Error in create channel: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    addChannelToWorkspaceMutation,
  };
};
