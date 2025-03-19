"use client";

import type { Editor } from "@tiptap/react";
import { Bold, Italic, Underline } from "lucide-react";
import Button from "../Button";

interface TextFormatGroupProps {
  editor: Editor;
}

export default function TextFormatGroup({ editor }: TextFormatGroupProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editor.isActive("bold")}
        icon={<Bold className="h-4 w-4" />}
        tooltip="Bold"
      />
      <Button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editor.isActive("italic")}
        icon={<Italic className="h-4 w-4" />}
        tooltip="Italic"
      />
      <Button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editor.isActive("underline")}
        icon={<Underline className="h-4 w-4" />}
        tooltip="Underline"
      />
    </div>
  );
}
