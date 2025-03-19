"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isActive?: boolean;
  icon: ReactNode;
  tooltip?: string;
}

export const Button = ({
  onClick,
  disabled = false,
  isActive = false,
  icon,
  tooltip,
}: ButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onFocus={() => setShowTooltip(true)}
        onBlur={() => setShowTooltip(false)}
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
          "hover:bg-indigo-50 hover:text-indigo-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
          isActive
            ? "bg-indigo-100 text-indigo-700"
            : "bg-transparent text-gray-700",
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        )}
      >
        {icon}
        <span className="sr-only">{tooltip}</span>
      </button>

      {tooltip && showTooltip && (
        <div
          className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full z-10 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded-md shadow-sm mb-1"
          style={{ whiteSpace: "nowrap" }}
        >
          {tooltip}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800"></div>
        </div>
      )}
    </div>
  );
};
