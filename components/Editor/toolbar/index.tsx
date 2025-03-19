"use client";

import type { Editor } from "@tiptap/react";

import TextFormatGroup from "./groups/TextFormatGroup";
import AlignmentGroup from "./groups/AlignmentGroup";
import ListGroup from "./groups/ListGroup";
import HistoryGroup from "./groups/HistoryGroup";
import HeadingGroup from "./groups/HeadingGroup";
import ColorGroup from "./groups/ColorGroup";
import { Separator } from "@/components/common/Seprator";

interface ToolbarProps {
  editor: Editor | null;
}

export default function Toolbar({ editor }: ToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b flex flex-wrap items-center gap-1 p-2 bg-gray-50">
      <HistoryGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <TextFormatGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <HeadingGroup editor={editor} />

      <ListGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <AlignmentGroup editor={editor} />

      <Separator orientation="vertical" className="mx-1 h-6" />

      <ColorGroup editor={editor} />
    </div>
  );
}
