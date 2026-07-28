"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Hackathon Day 1 — 07/11/2026, 09:00 Riyadh time (UTC+3). Matches the
// dates already shown in site.dates — this isn't a fabricated deadline,
// just the real kickoff surfaced as a live, honest urgency cue.
const EVENT_START = new Date("2026-11-07T09:00:00+03:00").getTime();

export function EventCountdown({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  const { t } = useLanguage();
  const [daysLeft, setDaysLeft] = useState<number | null>(null);

  useEffect(() => {
    function update() {
      const diff = EVENT_START - Date.now();
      setDaysLeft(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))));
    }
    update();
    // Day-level precision only — a minute-interval tick is plenty for a
    // countdown measured in days, and far cheaper than a per-second timer.
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isLive = daysLeft === 0;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-2xl border px-4 py-1.5 text-sm font-bold",
        dark
          ? "border-white/15 bg-white/10 text-white"
          : "border-cyan/20 bg-cyan/10 text-navy",
        className
      )}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
      </span>
      {daysLeft === null ? (
        <span>{t.hero.statusBadge}</span>
      ) : isLive ? (
        <span>{t.hero.countdownLive}</span>
      ) : (
        <span>
          {t.hero.statusBadge}
          <span className={cn("mx-1.5", dark ? "text-white/30" : "text-navy/30")}>
            ·
          </span>
          {t.hero.countdownPrefix}{" "}
          <span className="text-gold">{daysLeft}</span>{" "}
          {t.hero.countdownSuffix}
        </span>
      )}
    </div>
  );
}
