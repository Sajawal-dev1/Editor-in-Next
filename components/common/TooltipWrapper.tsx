"use client";

import { useState, type ReactNode } from "react";

interface TooltipWrapperProps {
  content: string;
  children: ReactNode;
  position?: "top" | "right" | "bottom" | "left";
}

export const TooltipWrapper = ({
  content,
  children,
  position = "bottom",
}: TooltipWrapperProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  // Position styles
  const positionStyles = {
    top: "bottom-full left-1/2 transform -translate-x-1/2 mb-1",
    right: "left-full top-1/2 transform -translate-y-1/2 ml-1",
    bottom: "top-full left-1/2 transform -translate-x-1/2 mt-1",
    left: "right-full top-1/2 transform -translate-y-1/2 mr-1",
  };

  // Arrow styles
  const arrowStyles = {
    top: "-bottom-1 left-1/2 transform -translate-x-1/2 border-t-gray-900 border-b-transparent",
    right:
      "-left-1 top-1/2 transform -translate-y-1/2 border-r-gray-900 border-l-transparent",
    bottom:
      "-top-1 left-1/2 transform -translate-x-1/2 border-b-gray-900 border-t-transparent",
    left: "-right-1 top-1/2 transform -translate-y-1/2 border-l-gray-900 border-r-transparent",
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
    >
      {children}

      {showTooltip && (
        <div
          className={`absolute z-10 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded-md shadow-sm ${positionStyles[position]}`}
          style={{ whiteSpace: "nowrap" }}
        >
          {content}
          <div
            className={`absolute border-4 border-transparent ${arrowStyles[position]}`}
          ></div>
        </div>
      )}
    </div>
  );
};
