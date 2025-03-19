"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import Placeholder from "@tiptap/extension-placeholder";
import Toolbar from "@/components/Editor/toolbar";
import Preview from "@/components/Editor/Preview";

export default function Editor() {
  const [content, setContent] = useState("<p>Start typing here...</p>");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextStyle,
      Color,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Placeholder.configure({
        placeholder: "Start typing...",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
        <div className="flex flex-col">
          <Toolbar editor={editor} />
          <div className="p-4 min-h-[300px] border-t">
            <EditorContent
              editor={editor}
              className="prose max-w-none h-full focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="bg-indigo-50 px-4 py-2 text-sm font-medium border-b text-indigo-800">
            Preview
          </div>
          <div className="p-4 min-h-[300px] bg-white">
            <Preview content={content} />
          </div>
        </div>
      </div>
    </div>
  );
}
