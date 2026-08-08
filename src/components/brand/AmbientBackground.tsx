/**
 * Deep-navy page atmosphere — the identity's dark foundation with a
 * restrained set of violet/blue/cyan/teal glow washes. Radial gradients
 * only (no SVG filters, no blur(), no drift animation), and fewer of them
 * than before: premium reads as calm, not as wall-to-wall glow.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #0b0f1e 0%, #0e1330 42%, #0b0f1e 100%)",
      }}
    >
      <div className="dot-grid absolute inset-0 opacity-60" />

      {/* Base washes — one per accent, kept apart so they read as
          deliberate light sources rather than an even haze. */}
      <div className="ambient-blob ambient-blob-indigo -left-[16%] top-[-10%] h-[34rem] w-[34rem]" />
      <div className="ambient-blob ambient-blob-electric -right-[14%] top-[-4%] h-[32rem] w-[32rem]" />
      <div className="ambient-blob ambient-blob-blue left-[32%] top-[52%] h-[26rem] w-[26rem]" />

      {/* One spray pair top, one near the bottom — enough atmosphere to
          keep the page from feeling flat without stacking dozens of
          always-on blurred layers. */}
      <div className="blue-spray spray-deep blue-spray-soft -left-[16%] top-[-8%] h-[30rem] w-[36rem]" />
      <div className="blue-spray spray-sky blue-spray-soft -right-[16%] top-[-6%] h-[32rem] w-[38rem]" />

      <div className="blue-spray spray-sky blue-spray-soft -left-[12%] top-[78%] h-[28rem] w-[32rem]" />
      <div className="blue-spray spray-deep blue-spray-soft -right-[12%] top-[80%] h-[26rem] w-[30rem]" />

      <div className="grain absolute inset-0" />
    </div>
  );
}
