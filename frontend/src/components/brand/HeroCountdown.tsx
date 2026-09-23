"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

/** Hackathon Day 1 — 29/01/2027, 09:00 Riyadh (UTC+3). */
const EVENT_START = new Date("2027-01-29T09:00:00+03:00").getTime();

type Parts = { days: number; hours: number; minutes: number; seconds: number };

/** Purple → blue → cyan across the four units. */
const UNIT_COLORS = ["#A855F7", "#8B5CF6", "#3B82F6", "#22D3EE"] as const;

function getParts(target: number): Parts {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownDigit({ value, color }: { value: number; color: string }) {
  const display = pad(value);
  return (
    <span className="relative inline-flex h-[1.15em] min-w-[2.1ch] items-center justify-center overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={display}
          initial={{ opacity: 0, y: 10, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.92 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-x-0 font-en font-light"
          style={{ color }}
        >
          {display}
        </motion.span>
      </AnimatePresence>
      <span className="invisible font-en font-light" aria-hidden>
        {display}
      </span>
    </span>
  );
}

export function HeroCountdown({ className }: { className?: string }) {
  const { t, locale } = useLanguage();
  const [parts, setParts] = useState<Parts | null>(null);

  useEffect(() => {
    const tick = () => setParts(getParts(EVENT_START));
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    { key: "days", value: parts?.days ?? 0, label: t.hero.countdownDays },
    { key: "hours", value: parts?.hours ?? 0, label: t.hero.countdownHours },
    {
      key: "minutes",
      value: parts?.minutes ?? 0,
      label: t.hero.countdownMinutes,
    },
    {
      key: "seconds",
      value: parts?.seconds ?? 0,
      label: t.hero.countdownSeconds,
    },
  ] as const;

  const live =
    parts !== null &&
    parts.days === 0 &&
    parts.hours === 0 &&
    parts.minutes === 0 &&
    parts.seconds === 0;

  return (
    <div
      className={cn(
        "relative w-full rounded-2xl border border-white/20 px-5 py-6 sm:rounded-3xl sm:px-8 sm:py-7",
        className
      )}
      dir="ltr"
    >
      <p
        className={cn(
          "text-center text-sm font-semibold tracking-wide text-white/55 sm:text-base",
          locale === "ar" ? "font-ar" : "font-en"
        )}
      >
        {live ? t.hero.countdownLive : t.hero.countdownTitle}
      </p>

      {!live && (
        <div
          className="mt-5 flex flex-col gap-5 sm:mt-6 sm:flex-row sm:items-stretch sm:gap-0"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
        >
          {units.map((unit, index) => (
            <div
              key={unit.key}
              className="flex flex-1 flex-col items-center justify-center px-2 text-center sm:px-5"
            >
              <p className="text-3xl font-light leading-none tracking-tight sm:text-4xl md:text-5xl">
                <CountdownDigit
                  value={unit.value}
                  color={UNIT_COLORS[index]}
                />
              </p>
              <p
                className={cn(
                  "mt-2.5 text-xs font-medium text-white/55 sm:mt-3 sm:text-sm",
                  locale === "ar" ? "font-ar" : "font-en"
                )}
              >
                {unit.label}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
