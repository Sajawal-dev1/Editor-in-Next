"use client";

import type { Editor } from "@tiptap/react";
import { Palette } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/common/dropdown-menu";
import ColorPicker from "../ColorPicker";
import Button from "../Button";

interface ColorGroupProps {
  editor: Editor;
}

export default function ColorGroup({ editor }: ColorGroupProps) {
  const currentColor = editor.getAttributes("textStyle").color;

  return (
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div>
            <Button
              icon={
                <div className="relative">
                  <Palette className="h-4 w-4" />
                  {currentColor && (
                    <div
                      className="absolute -bottom-1 -right-1 w-2 h-2 rounded-full border border-white"
                      style={{ backgroundColor: currentColor }}
                    />
                  )}
                </div>
              }
              tooltip="Text Color"
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-64 p-0">
          <div className="p-2">
            <ColorPicker
              editor={editor}
              onChange={(color) => {
                editor.chain().focus().setColor(color).run();
              }}
            />
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
