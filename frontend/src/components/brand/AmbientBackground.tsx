/**
 * Deep navy landing atmosphere — almost black, minimal ambient wash.
 * Glow is reserved for logo + primary CTAs, not the page canvas.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse 70% 50% at 70% 35%, rgba(112,0,255,0.07), transparent 60%), linear-gradient(180deg, #050510 0%, #070818 45%, #050510 100%)",
      }}
    />
  );
}
