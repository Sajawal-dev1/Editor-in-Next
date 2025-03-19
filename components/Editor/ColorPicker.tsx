"use client"

import type { Editor } from "@tiptap/react"

interface ColorPickerProps {
  editor: Editor
  onChange: (color: string) => void
}

const colors = [
  "#000000",
  "#434343",
  "#666666",
  "#999999",
  "#b7b7b7",
  "#cccccc",
  "#d9d9d9",
  "#efefef",
  "#f3f3f3",
  "#ffffff",
  "#980000",
  "#ff0000",
  "#ff9900",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#4a86e8",
  "#0000ff",
  "#9900ff",
  "#ff00ff",
  "#e6b8af",
  "#f4cccc",
  "#fce5cd",
  "#fff2cc",
  "#d9ead3",
  "#d0e0e3",
  "#c9daf8",
  "#cfe2f3",
  "#d9d2e9",
  "#ead1dc",
]

export default function ColorPicker({ editor, onChange }: ColorPickerProps) {
  const currentColor = editor.getAttributes("textStyle").color || "#000000"

  return (
    <div>
      <div className="mb-2 text-sm font-medium">Text Color</div>
      <div className="grid grid-cols-10 gap-1">
        {colors.map((color) => (
          <button
            key={color}
            className="w-5 h-5 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ backgroundColor: color }}
            onClick={() => onChange(color)}
            aria-label={`Color: ${color}`}
          />
        ))}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <div className="text-sm">Custom:</div>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 p-0 border-0"
        />
      </div>
    </div>
  )
}

