import { updateChannelByIdRequest } from "@/apis/workspace";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query";

export const useUpdateChannel = (channelId, workspaceId) => {
  const { auth } = useAuth();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: updateChannelMutation,
  } = useMutation({
    mutationFn: (name) =>
      updateChannelByIdRequest({
        workspaceId: workspaceId,
        channelId: channelId,
        token: auth?.token,
        name: name,
      }),
    onSuccess: (response) => {
      console.log("Channel updated successfully: ", response);
    },
    onError: (error) => {
      console.log("Error in updating channel: ", error);
    },
  });

  return {
    isPending,
    isSuccess,
    error,
    updateChannelMutation,
  };
};
