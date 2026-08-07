/**
 * Soft page atmosphere — cool white + electric-blue mist (brand paper look).
 * Radial gradients only (no SVG filters, no blur(), no drift animation).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #f5f8fc 0%, #e8eef6 100%)",
      }}
    >
      <div className="dot-grid absolute inset-0 opacity-40" />

      {/* Base washes */}
      <div className="ambient-blob ambient-blob-indigo -left-[18%] top-[-12%] h-[36rem] w-[36rem]" />
      <div className="ambient-blob ambient-blob-electric -right-[16%] top-[-6%] h-[38rem] w-[38rem]" />
      <div className="ambient-blob ambient-blob-blue left-[30%] top-[48%] h-[28rem] w-[28rem]" />

      {/* Top spray pair */}
      <div className="blue-spray spray-deep blue-spray-soft -left-[18%] top-[-10%] h-[34rem] w-[40rem]" />
      <div className="blue-spray spray-sky blue-spray-soft -right-[18%] top-[-8%] h-[36rem] w-[42rem]" />

      {/* Mid spray pair */}
      <div className="blue-spray spray-mid blue-spray-soft -left-[12%] top-[36%] h-[30rem] w-[34rem]" />
      <div className="blue-spray spray-sky blue-spray-soft -right-[10%] top-[40%] h-[28rem] w-[32rem]" />

      {/* Lower spray pair */}
      <div className="blue-spray spray-deep blue-spray-soft -left-[14%] top-[68%] h-[32rem] w-[36rem]" />
      <div className="blue-spray spray-sky blue-spray-soft -right-[14%] top-[72%] h-[30rem] w-[34rem]" />

      <div className="grain absolute inset-0 opacity-15" />
    </div>
  );
}
