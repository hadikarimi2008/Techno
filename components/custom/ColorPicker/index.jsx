"use client";

import { HexColorPicker } from "react-colorful";

export default function ColorPicker({ color, setColor }) {
  return (
    <div className="space-y-3">
      <HexColorPicker color={color} onChange={setColor} />

      <div className="flex items-center gap-2">
        <div
          className="w-10 h-10 rounded border"
          style={{ backgroundColor: color }}
        />

        <input
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
        />
      </div>
    </div>
  );
}