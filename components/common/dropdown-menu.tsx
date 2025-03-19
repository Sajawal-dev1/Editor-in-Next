"use client";

import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// Context for the dropdown state
type DropdownContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement>;
};

const DropdownContext = createContext<DropdownContextType | undefined>(
  undefined
);

function useDropdown() {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown components must be used within a DropdownMenu");
  }
  return context;
}

// Main DropdownMenu component
interface DropdownMenuProps {
  children: ReactNode;
}

export function DropdownMenu({ children }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !document
          .getElementById("dropdown-content")
          ?.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // Close dropdown when pressing Escape
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <DropdownContext.Provider value={{ open, setOpen, triggerRef }}>
      {children}
    </DropdownContext.Provider>
  );
}

// Trigger component
interface DropdownMenuTriggerProps {
  children: ReactNode;
  asChild?: boolean;
  className?: string;
  id?: string;
}

export function DropdownMenuTrigger({
  children,
  asChild = false,
  className,
  id,
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerRef } = useDropdown();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(!open);
  };

  const triggerProps = {
    onClick: handleClick,
    "aria-expanded": open,
    "aria-haspopup": true,
    ref: triggerRef as React.RefObject<any>,
    className: cn(className),
    id,
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, triggerProps);
  }

  return (
    <button type="button" {...triggerProps}>
      {children}
    </button>
  );
}

// Content component
interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

export function DropdownMenuContent({
  children,
  className,
  align = "center",
  sideOffset = 5,
}: DropdownMenuContentProps) {
  const { open, triggerRef } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open && triggerRef.current && contentRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      let left = 0;

      // Horizontal alignment
      if (align === "start") {
        left = triggerRect.left;
      } else if (align === "end") {
        left = triggerRect.right - contentRect.width;
      } else {
        // center
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      }

      // Make sure dropdown doesn't go off screen
      const rightEdge = left + contentRect.width;
      if (rightEdge > window.innerWidth) {
        left = window.innerWidth - contentRect.width - 10;
      }
      if (left < 10) {
        left = 10;
      }

      setPosition({
        top: triggerRect.bottom + sideOffset + window.scrollY,
        left: left + window.scrollX,
      });
    }
  }, [open, align, sideOffset]);

  if (!mounted || !open) {
    return null;
  }

  return createPortal(
    <div
      id="dropdown-content"
      ref={contentRef}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-white p-1 shadow-md animate-in fade-in-80 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1",
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      role="menu"
    >
      {children}
    </div>,
    document.body
  );
}

// Menu item component
interface DropdownMenuItemProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export function DropdownMenuItem({
  children,
  onClick,
  className,
  disabled = false,
}: DropdownMenuItemProps) {
  const { setOpen } = useDropdown();

  const handleClick = () => {
    if (disabled) return;
    onClick?.();
    setOpen(false);
  };

  return (
    <button
      type="button"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-indigo-50 hover:text-indigo-700 focus:bg-indigo-50 focus:text-indigo-700",
        disabled && "pointer-events-none opacity-50",
        className
      )}
      onClick={handleClick}
      role="menuitem"
      disabled={disabled}
    >
      {children}
    </button>
  );
}
