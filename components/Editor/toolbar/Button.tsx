"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  icon: ReactNode;
  tooltip?: string;
}

export default function Button({
  onClick,
  disabled = false,
  isActive = false,
  icon,
  tooltip,
}: ButtonProps) {
  const buttonContent = (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
        "hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        isActive ? "bg-gray-200" : "bg-transparent",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
      )}
    >
      {icon}
      <span className="sr-only">{tooltip}</span>
    </button>
  );

  if (tooltip) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonContent}</TooltipTrigger>
          <TooltipContent side="bottom">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return buttonContent;
}
