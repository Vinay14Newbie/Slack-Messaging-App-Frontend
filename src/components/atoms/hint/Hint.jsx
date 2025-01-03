import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Hint = ({ children, label, side, align }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          align={align}
          className="bg-gray-600 text-white px-2 py-1 text-xs rounded-lg border border-white/5"
        >
          <p className="text-sm font-medium">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
