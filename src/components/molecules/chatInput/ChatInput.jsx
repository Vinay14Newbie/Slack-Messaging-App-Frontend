import { getPresignedUrl, uploadImageToAWSpresignedUrl } from "@/apis/s3";
import { Editor } from "@/components/atoms/editor/Editor";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const ChatInput = () => {
  const { socket, currentChannel } = useSocket();
  const { auth } = useAuth();
  const { currentWorkspace } = useCurrentWorkspace();
  const queryClient = useQueryClient();
  const { memberId } = useParams();

  async function handleSubmit({ body, image }) {
    console.log("body & image: ", body, image);

    let fileUrl = null;
    if (image) {
      const preSignedUrl = await queryClient.fetchQuery({
        queryKey: ["getPresignedUrl"],
        queryFn: () => getPresignedUrl({ token: auth?.token }),
      });

      console.log("Presigned url: ", preSignedUrl);

      const responseAws = await uploadImageToAWSpresignedUrl({
        url: preSignedUrl,
        file: image,
      });
      console.log("File uploaded successfully: ", responseAws);
      fileUrl = preSignedUrl.split("?")[0];
    }

    if (memberId) {
      socket?.emit(
        "NewDM",
        {
          body,
          image: fileUrl,
          senderId: auth?.user?.id,
          receiverId: memberId,
          workspaceId: currentWorkspace?._id,
        },
        (data) => {
          console.log("DM sent: ", data);
        }
      );
    } else {
      socket?.emit(
        "NewMessage",
        {
          channelId: currentChannel,
          body,
          image: fileUrl,
          senderId: auth?.user?.id,
          workspaceId: currentWorkspace?._id,
        },
        (data) => {
          console.log("Message sent: ", data);
        }
      );
    }
  }

  return (
    <div className="px-5 w-full">
      <Editor
        placeholder="Type a message..."
        onSubmit={handleSubmit}
        onCancel={() => {}}
        disabled={false}
        defaultValue={""}
      />
    </div>
  );
};
