import { useAuth } from "@/hooks/context/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOutIcon, PencilIcon, SettingsIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";

export const UserButton = () => {
  const { toast } = useToast();
  const { navigate } = useNavigate();
  const { auth, logout } = useAuth();
  const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

  const handleLogout = async () => {
    await logout();
    toast({
      title: "Successfully signed out",
      type: "success",
    });
    navigate("/auth/signin");
  };

  const openWorkspaceCreateModalBtn = () => {
    setOpenCreateWorkspaceModal(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={auth.user.avatar} />
          <AvatarFallback>
            {auth?.user?.username[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={openWorkspaceCreateModalBtn}>
          <PencilIcon className="size-4 mr-2 h-10" />
          Create workspace
        </DropdownMenuItem>
        <DropdownMenuItem>
          <SettingsIcon className="size-4 mr-2 h-10" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon className="size-4 mr-2 h-10" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
