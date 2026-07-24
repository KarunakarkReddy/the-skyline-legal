import logo from "@/assets/sllogohead.png";

export function Logo({ size = 44, showWordmark: _showWordmark = true }: { size?: number; showWordmark?: boolean }) {
  // Uses the official Skyline Legal logo exactly as provided (includes the wordmark).
  // `size` controls the rendered height; width scales from the source aspect ratio.
  return (
    <img
      src={logo}
      alt="Skyline Legal"
      style={{ height: size, width: "auto" }}
      className="shrink-0 object-contain select-none"
      draggable={false}
    />
  );
}
