"use client";

import type { Editor } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, AlignJustify } from "lucide-react";
import Button from "../Button";

interface AlignmentGroupProps {
  editor: Editor;
}

export default function AlignmentGroup({ editor }: AlignmentGroupProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editor.isActive({ textAlign: "left" })}
        icon={<AlignLeft className="h-4 w-4" />}
        tooltip="Align Left"
      />
      <Button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editor.isActive({ textAlign: "center" })}
        icon={<AlignCenter className="h-4 w-4" />}
        tooltip="Align Center"
      />
      <Button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editor.isActive({ textAlign: "right" })}
        icon={<AlignRight className="h-4 w-4" />}
        tooltip="Align Right"
      />
      <Button
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editor.isActive({ textAlign: "justify" })}
        icon={<AlignJustify className="h-4 w-4" />}
        tooltip="Justify"
      />
    </div>
  );
}
