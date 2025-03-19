"use client";

import type { Editor } from "@tiptap/react";
import { List, ListOrdered } from "lucide-react";
import Button from "../Button";

interface ListGroupProps {
  editor: Editor;
}

export default function ListGroup({ editor }: ListGroupProps) {
  return (
    <div className="flex items-center gap-1">
      <Button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editor.isActive("bulletList")}
        icon={<List className="h-4 w-4" />}
        tooltip="Bullet List"
      />
      <Button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editor.isActive("orderedList")}
        icon={<ListOrdered className="h-4 w-4" />}
        tooltip="Ordered List"
      />
    </div>
  );
}
