import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link, NavLink, useParams } from "react-router-dom";

const sideBarItemVariants = cva(
  "flex items-center justify-start gap-1.5 font-normal h-7 px-[20px] text-sm overflow-hidden",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]",
        active: "text-[#481350] bg-white/90 hover:bg-white/80",
      },
    },
    defaultVariants: "default",
  }
);

export const SideBarItem = ({ label, id, icon: Icon, variant }) => {
  const { workspaceId } = useParams();
  return (
    <NavLink
      className={({ isActive }) =>
        cn(
          "flex items-center gap-1.5 w-full", // Base styles
          isActive ? "bg-slack-dark rounded-lg" : ""
        )
      }
      to={`/workspaces/${workspaceId}/channels/${id}`}
    >
      <Button
        variant="transparent"
        size="sm"
        className="w-full justify-start items-center gap-3"
        // className={cn(sideBarItemVariants({ variant }))}
      >
        <Icon className="size-3.5 mr-1" />
        <span className="text-sm">{label}</span>
      </Button>
    </NavLink>
  );
};
