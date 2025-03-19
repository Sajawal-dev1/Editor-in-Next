"use client"

import type { Editor } from "@tiptap/react"

interface ColorPickerProps {
  editor: Editor
  onChange: (color: string) => void
}

const colorGroups = [
  {
    name: "Gray",
    colors: [
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
    ],
  },
  {
    name: "Vibrant",
    colors: [
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
    ],
  },
  {
    name: "Pastel",
    colors: [
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
    ],
  },
]

export default function ColorPicker({ editor, onChange }: ColorPickerProps) {
  const currentColor = editor.getAttributes("textStyle").color || "#000000"

  return (
    <div className="p-2">
      {colorGroups.map((group, index) => (
        <div key={group.name} className={index > 0 ? "mt-3" : ""}>
          <div className="mb-1 text-xs font-medium text-gray-500">{group.name}</div>
          <div className="grid grid-cols-10 gap-1">
            {group.colors.map((color) => (
              <button
                key={color}
                className="w-5 h-5 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 relative"
                style={{ backgroundColor: color }}
                onClick={() => onChange(color)}
                aria-label={`Color: ${color}`}
              >
                {color === currentColor && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <span className={`h-2 w-2 rounded-full ${color === "#ffffff" ? "bg-gray-800" : "bg-white"}`}></span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-3 flex items-center gap-2">
        <div className="text-xs font-medium text-gray-500">Custom:</div>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onChange(e.target.value)}
          className="w-8 h-8 p-0 border-0 rounded"
        />
      </div>
    </div>
  )
}

