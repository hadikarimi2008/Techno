"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeColors } from "@/lib/normalizeColors";

export default function ProductColorsPicker({ defaultColors = [] }) {
  const [color, setColor] = useState("#3b82f6");
  const [colors, setColors] = useState(() => normalizeColors(defaultColors));

  const addColor = () => {
    if (!colors.includes(color)) {
      setColors([...colors, color]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter((c) => c !== colorToRemove));
  };

  return (
    <div className="space-y-4">
      <input type="hidden" name="colors" value={JSON.stringify(colors)} />

      <div className="flex justify-center">
        <HexColorPicker color={color} onChange={setColor} />
      </div>

      <div className="flex gap-2">
        <Input value={color} onChange={(e) => setColor(e.target.value)} />

        <Button type="button" onClick={addColor}>
          Add
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        {colors.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => removeColor(c)}
            className="w-8 h-8 rounded-full border"
            style={{ backgroundColor: c }}
            title={c}
          />
        ))}
      </div>
    </div>
  );
}
