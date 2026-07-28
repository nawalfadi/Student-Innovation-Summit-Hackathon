/**
 * Soft layered atmosphere — stacked sky / mid / deep washes in different zones.
 *
 * Trimmed to roughly 40% fewer blurred/animated layers than the original
 * pass: each `filter: blur()` element forces its own compositor layer, and
 * on mid-range mobile GPUs a couple dozen of those simultaneously is a real
 * frame-rate and battery cost for a background nobody consciously looks at.
 * The composition still reads as a full atmosphere at every breakpoint.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #fffcf5 0%, #d8d5ca 100%)",
      }}
    >
      <svg className="absolute h-0 w-0" aria-hidden>
        <defs>
          <filter
            id="blue-spray-noise"
            x="-40%"
            y="-40%"
            width="180%"
            height="180%"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.28"
              numOctaves="2"
              stitchTiles="stitch"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0 0
                      0 0 0 0.22 0"
              result="alphaNoise"
            />
            <feComposite
              in="SourceGraphic"
              in2="alphaNoise"
              operator="in"
              result="spray"
            />
            <feGaussianBlur in="spray" stdDeviation="1.2" result="softSpray" />
            <feBlend in="SourceGraphic" in2="softSpray" mode="multiply" />
          </filter>
        </defs>
      </svg>

      {/* Base soft fields */}
      <div className="ambient-blob ambient-blob-indigo -left-[20%] top-[-15%] h-[42rem] w-[42rem] opacity-18" />
      <div
        className="ambient-blob ambient-blob-electric right-[-18%] top-[-5%] h-[44rem] w-[44rem]"
        style={{ animationDelay: "-8s", opacity: 0.18 }}
      />
      <div
        className="ambient-blob ambient-blob-blue left-[8%] top-[30%] h-[46rem] w-[46rem]"
        style={{ animationDelay: "-4s", opacity: 0.14 }}
      />

      {/* Layer stack — top-left: deep → sky */}
      <div className="blue-spray spray-deep blue-spray-soft -left-[20%] top-[-14%] h-[38rem] w-[44rem]" />
      <div
        className="blue-spray spray-sky blue-spray-soft -left-[4%] top-[0%] h-[26rem] w-[32rem]"
        style={{ animationDelay: "-9s" }}
      />

      {/* Layer stack — top-right: sky → mid */}
      <div
        className="blue-spray spray-sky blue-spray-soft -right-[22%] top-[-12%] h-[40rem] w-[46rem]"
        style={{ animationDelay: "-3s" }}
      />
      <div
        className="blue-spray spray-mid blue-spray-soft right-[2%] top-[6%] h-[24rem] w-[30rem]"
        style={{ animationDelay: "-7s" }}
      />

      {/* Layer stack — center-left */}
      <div
        className="blue-spray spray-deep blue-spray-soft -left-[18%] top-[28%] h-[40rem] w-[44rem]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="blue-spray spray-mid blue-spray-soft left-[8%] top-[42%] h-[24rem] w-[28rem]"
        style={{ animationDelay: "-2s" }}
      />

      {/* Layer stack — center-right */}
      <div
        className="blue-spray spray-sky blue-spray-soft -right-[16%] top-[32%] h-[38rem] w-[42rem]"
        style={{ animationDelay: "-10s" }}
      />
      <div
        className="blue-spray spray-mid blue-spray-soft right-[10%] top-[48%] h-[22rem] w-[28rem]"
        style={{ animationDelay: "-13s" }}
      />

      {/* Layer stack — lower-left */}
      <div
        className="blue-spray spray-sky blue-spray-soft -left-[14%] top-[60%] h-[36rem] w-[40rem]"
        style={{ animationDelay: "-12s" }}
      />
      <div
        className="blue-spray spray-mid blue-spray-soft left-[10%] top-[74%] h-[22rem] w-[28rem]"
        style={{ animationDelay: "-15s" }}
      />

      {/* Layer stack — lower-right */}
      <div
        className="blue-spray spray-deep blue-spray-soft -right-[18%] top-[64%] h-[36rem] w-[42rem]"
        style={{ animationDelay: "-9s" }}
      />
      <div
        className="blue-spray spray-mid blue-spray-soft right-[8%] bottom-[-6%] h-[24rem] w-[30rem]"
        style={{ animationDelay: "-11s" }}
      />

      <div className="grain absolute inset-0 opacity-35" />
    </div>
  );
}
