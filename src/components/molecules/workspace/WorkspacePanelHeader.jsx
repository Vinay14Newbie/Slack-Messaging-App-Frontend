import { WorkspaceInviteModal } from "@/components/organisms/modals/WorkspaceInviteModal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/context/useAuth";
import { useWorkspacePreferenceModal } from "@/hooks/context/useWorkspacePreferenceModal";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { ChevronDown, ListFilterIcon, SquarePenIcon } from "lucide-react";
import { useEffect, useState } from "react";

export const WorkspacePanelHeader = ({ workspace }) => {
  const workspaceMembers = workspace?.members;

  const { setOpenWorkspacePreferenceModal, setInitialValue, setWorkspace } =
    useWorkspacePreferenceModal();
  const [openInviteModal, setOpenInviteModal] = useState(false);

  const { auth } = useAuth();
  console.log("Auth in workspace panel header : ", auth);
  console.log("memberId : ", workspaceMembers[0].memberId._id);

  const isLoggedInUserAdminOfWorkspace = workspaceMembers?.find(
    (member) =>
      (member.memberId._id === auth?.user?.id ||
        member.memberId === auth?.user?.id) &&
      member.role === "admin"
  );

  useEffect(() => {
    setWorkspace(workspace);
  }, []);

  return (
    <>
      <WorkspaceInviteModal
        openInviteModal={openInviteModal}
        setOpenInviteModal={setOpenInviteModal}
        workspaceName={workspace?.name}
        joinCode={workspace?.joinCode}
      />

      <div className="flex items-center justify-between px-4 h-[50px] gap-0.5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button
              variant="transparent"
              className="font-semibold text-lg w-auto p-1.5 overflow-hidden"
            >
              <span className="truncate">{workspace?.name}</span>
              <ChevronDown className="size-5 ml-1" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="start" className="w-64">
            <DropdownMenuItem>
              <div className="size-9 relative overflow-hidden text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2 bg-[#616061]">
                {workspace?.name.charAt(0).toUpperCase()}
              </div>
              <div clssaName="flex flex-col items-start">
                <p className="font-bold">{workspace?.name}</p>
                <p className="text-xs text-muted-foreground">
                  Active workspace
                </p>
              </div>
            </DropdownMenuItem>

            {isLoggedInUserAdminOfWorkspace && (
              <div>
                <DropdownMenuItem
                  className="cursor-pointer py-2"
                  onClick={() => {
                    setOpenWorkspacePreferenceModal(true);
                    setInitialValue(workspace?.name);
                  }}
                >
                  Preference
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  clssaName="cursor-pointer py-2"
                  onClick={() => {
                    setOpenInviteModal(true);
                  }}
                >
                  Invite people to {workspace.name}
                </DropdownMenuItem>
              </div>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-0.5">
          <Button variant="transparent" size="iconSm">
            <ListFilterIcon className="size-5" />
          </Button>
          <Button variant="transparent" size="iconSm">
            <SquarePenIcon className="size-5" />
          </Button>
        </div>
      </div>
    </>
  );
};
