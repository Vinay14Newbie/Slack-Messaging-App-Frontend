import { UserButton } from "@/components/atoms/UserButton";
import { SideBarButton } from "@/components/molecules/sidebarButton/SideBarButton";
import {
  BellIcon,
  HomeIcon,
  MessageSquareIcon,
  MoreHorizontalIcon,
} from "lucide-react";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

export const WorkspaceSidebar = () => {
  return (
    <aside className="w-[70px] h-full bg-slack-dark flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]">
      <WorkspaceSwitcher />
      <SideBarButton Icon={HomeIcon} label={"Home"} />
      <SideBarButton Icon={MessageSquareIcon} label={"DMs"} />
      <SideBarButton Icon={BellIcon} label={"Notifications"} />
      <SideBarButton Icon={MoreHorizontalIcon} label={"More"} />

      <div className="flex flex-col justify-center items-center mt-auto mb-5 gap-y-1">
        <UserButton />
      </div>
    </aside>
  );
};
