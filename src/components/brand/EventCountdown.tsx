"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Hackathon Day 1 — 08/10/2026, 09:00 Riyadh time (UTC+3).
const EVENT_START = new Date("2026-10-08T09:00:00+03:00").getTime();

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
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  const isLive = daysLeft === 0;
  const dayLabel =
    daysLeft === 1 ? t.hero.countdownSuffixOne : t.hero.countdownSuffix;

  if (isLive) {
    return (
      <motion.p
        className={cn(
          "text-2xl font-black text-cyan sm:text-3xl",
          className
        )}
        animate={{ opacity: [1, 0.55, 1] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        {t.hero.countdownLive}
      </motion.p>
    );
  }

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-sm text-center",
        dark ? "text-white" : "text-fg",
        className
      )}
    >
      <p className="text-xs font-bold tracking-[0.2em] text-teal">
        {t.hero.statusBadge}
      </p>

      <div className="mt-2 flex items-end justify-center gap-2">
        <motion.span
          key={daysLeft ?? "x"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl font-black leading-none tracking-tight text-teal sm:text-7xl"
        >
          {daysLeft ?? "—"}
        </motion.span>
        <span
          className={cn(
            "mb-1.5 text-lg font-bold",
            dark ? "text-white/65" : "text-fg/55"
          )}
        >
          {dayLabel}
        </span>
      </div>

      <p
        className={cn(
          "mt-1 text-sm font-semibold",
          dark ? "text-white/50" : "text-fg/45"
        )}
      >
        {t.hero.countdownUntil}
      </p>
    </div>
  );
}
