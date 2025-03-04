import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { NavLink, useParams } from "react-router-dom";

const userItemVariants = cva(
  "flex items-center gap-1.5 justify-start font-normal h-7 mt-2 text-sm transition-colors",
  {
    variants: {
      variant: {
        default: "text-[#f9edffcc]", // Default text color
        active: "bg-gray-200", // Only background color changes when active
      },
    },
    defaultVariants: { variant: "default" },
  }
);

export const UserItem = ({ id, label = "Member", avatar }) => {
  const { workspaceId } = useParams();

  return (
    <NavLink
      to={`/workspaces/${workspaceId}/members/${id}`}
      className={({ isActive }) =>
        cn(
          "w-full flex items-center justify-start gap-2 rounded-md", // Base styles
          isActive ? "bg-slack-dark" : "" // Apply bg-gray-200 only when active
        )
      }
    >
      <Button
        variant="transparent"
        size="sm"
        className="w-full flex items-center gap-2 justify-start"
      >
        <Avatar>
          <AvatarImage src={avatar} className="rounded-md" />
          <AvatarFallback className="rounded-md bg-sky-500 text-white">
            {label.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm truncate">{label}</span>
      </Button>
    </NavLink>
  );
};
