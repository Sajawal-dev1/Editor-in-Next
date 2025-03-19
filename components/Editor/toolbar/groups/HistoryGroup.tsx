"use client";

import type { Editor } from "@tiptap/react";
import { Undo, Redo } from "lucide-react";
import Button from "../Button";

interface HistoryGroupProps {
  editor: Editor;
}

export default function HistoryGroup({ editor }: HistoryGroupProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        icon={<Undo className="h-4 w-4" />}
        tooltip="Undo"
      />
      <Button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        icon={<Redo className="h-4 w-4" />}
        tooltip="Redo"
      />
    </div>
  );
}
