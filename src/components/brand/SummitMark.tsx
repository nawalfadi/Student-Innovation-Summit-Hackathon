/** Small navbar mark — purple → blue → cyan mountain + star */
export function SummitMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="sm-g" x1="6" y1="42" x2="42" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7000FF" />
          <stop offset="50%" stopColor="#007BFF" />
          <stop offset="100%" stopColor="#00D4FF" />
        </linearGradient>
      </defs>
      <path
        d="M24 10 L8 40 H16 L24 22 Z"
        fill="url(#sm-g)"
      />
      <path
        d="M21 18 L11 38"
        stroke="url(#sm-g)"
        strokeWidth="1.4"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M24.5 10 L40 40 H32 L28 30 L25.5 34 L24.5 22 Z"
        fill="url(#sm-g)"
      />
      <path
        d="M24 4 C24.8 7 26 8 29 9 C26 10 24.8 11 24 14 C23.2 11 22 10 19 9 C22 8 23.2 7 24 4 Z"
        fill="#E0F7FF"
      />
    </svg>
  );
}
