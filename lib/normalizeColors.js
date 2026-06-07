export function normalizeColors(colors) {
  if (!Array.isArray(colors)) return [];

  if (
    colors.length === 1 &&
    typeof colors[0] === "string" &&
    colors[0].trim().startsWith("[")
  ) {
    try {
      const parsed = JSON.parse(colors[0]);
      if (Array.isArray(parsed)) return normalizeColors(parsed);
    } catch {
      // fall through to per-item cleanup
    }
  }

  return colors
    .map((color) => {
      if (typeof color !== "string") return null;

      const cleaned = color
        .replace(/^\[+/, "")
        .replace(/\]+$/, "")
        .replace(/^"+|"+$/g, "")
        .trim();

      if (!cleaned) return null;
      return cleaned.startsWith("#") ? cleaned : `#${cleaned}`;
    })
    .filter((color) => /^#[0-9a-fA-F]{3,8}$/.test(color));
}
