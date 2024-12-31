import { useJoinWorkspace } from "@/hooks/apis/workspace/useJoinWorkspace";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import VerificationInput from "react-verification-input";

export const JoinPage = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const { joinWorkspaceMutation } = useJoinWorkspace(workspaceId);

  const handleAddMemberToWorkspace = async (joinCode) => {
    console.log("Code filled");
    try {
      const response = await joinWorkspaceMutation(joinCode);
      console.log("Workspace joined successfully: ", response);

      toast({
        title: "You have been added to workspace successfully",
        type: "success",
      });
      navigate(`/workspaces/${workspaceId}`);
    } catch (error) {
      console.log("Error to join workspace: ", error);
      toast({
        title: error.message,
        type: "error",
      });
    }
  };
  return (
    <div className="h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm">
      <div className="flex flex-col gap-y-4 items-center justify-center">
        <div className="flex flex-col gap-y-2 items-center">
          <h1 className="font-bold text-3xl">Join Workspace</h1>
          <p>Enter the code you received to join the workspace</p>
        </div>

        <VerificationInput
          onComplete={handleAddMemberToWorkspace}
          length={6}
          classNames={{
            container: "flex gap-x-2",
            character:
              "h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500",
            characterInactive: "bg-muted",
            characterFilled: "bg-white text-black",
            characterSelected: "bg-white text-black",
          }}
          autoFocus
        />
      </div>
      <div className="flex gap-x-4">
        <Link to={`/workspaces/${workspaceId}`}>Back to the workspace</Link>
      </div>
    </div>
  );
};
