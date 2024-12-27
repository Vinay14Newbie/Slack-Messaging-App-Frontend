import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useFetchWorkspaces } from "@/hooks/apis/workspace/useFetchWorkspaces";
import { useGetWorkspaceById } from "@/hooks/apis/workspace/useGetWorkspaceById";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const WorkspaceSwitcher = () => {
  const { workspaceId } = useParams();
  const { isFetching, workspace } = useGetWorkspaceById(workspaceId);
  const { isFetching: isFetchingWorkspaces, workspaces } = useFetchWorkspaces();
  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button className="size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl">
          {isFetching ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            workspace?.name.charAt(0).toUpperCase()
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer flex-col justify-start items-start">
          {workspace?.name}
          <span className="text-xs text-muted-foreground">
            (Active Workspace)
          </span>
        </DropdownMenuItem>
        <Separator />
        <div className="max-h-24 overflow-auto">
          {isFetchingWorkspaces ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            workspaces?.map((workspace) => {
              if (workspace?._id === workspaceId) return null;
              return (
                <DropdownMenuItem
                  className="cursor-pointer flex-col justify-start items-start"
                  onClick={() => navigate(`/workspaces/${workspace?._id}`)}
                  key={workspace?._id}
                >
                  <p className="overflow-auto" /* truncate */>
                    {workspace?.name}
                  </p>
                </DropdownMenuItem>
              );
            })
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
