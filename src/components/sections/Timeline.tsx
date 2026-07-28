"use client";

import { Calendar } from "lucide-react";
import { DecorativeSwirl } from "@/components/brand/DecorativeSwirl";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function Timeline() {
  const { t } = useLanguage();

  return (
    // A deliberate "keynote" beat — the one section on the page that isn't
    // cream-and-glass. Scrolling from Tracks into a dark, high-contrast
    // Timeline and back out into light Universities is the visual rhythm
    // the audit was asking for: the page should feel like it's progressing
    // through moments, not repeating one template.
    <section
      id="timeline"
      className="relative overflow-hidden bg-gradient-to-b from-navy via-navy to-navy-dark py-20 sm:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-96 w-96 rounded-full bg-cyan/20 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-gold/15 blur-[100px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-cyan/10 blur-[100px]"
      />

      <DecorativeSwirl
        src="/decor/swirl-timeline.png"
        left={-173}
        top={413}
        width={502}
        height={489}
        opacity={0.28}
        flipY
      />
      <DecorativeSwirl
        src="/decor/swirl-timeline.png"
        left={938}
        top={443}
        width={502}
        height={489}
        opacity={0.28}
        flipY
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            dark
            badge={t.timeline.badge}
            title={t.timeline.title}
            subtitle={t.timeline.subtitle}
          />
        </Reveal>

        <div className="relative mt-16">
          <div className="absolute right-[2.15rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-gold via-cyan/60 to-transparent lg:block rtl:right-[2.15rem] ltr:left-[2.15rem] ltr:right-auto" />

          <RevealGroup className="space-y-6" stagger={0.14}>
            {t.timeline.days.map((day, index) => (
              <RevealItem
                // A stable, locale-independent key — day.day/day.date/etc.
                // are translated strings that change with the language, so
                // keying on them made React tear down and remount every
                // card (replaying its entrance animation) on every switch.
                key={`timeline-day-${index}`}
                whileHover={{ x: 0, y: -2 }}
                transition={{ type: "spring", stiffness: 280, damping: 22 }}
                className="relative grid gap-5 lg:grid-cols-[100px_1fr]"
              >
                <div className="hidden lg:flex lg:justify-center">
                  <div className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-2xl bg-gradient-to-br from-gold to-gold-light text-sm font-black text-navy-dark shadow-xl shadow-black/20 ring-4 ring-navy">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-7 shadow-[0_20px_50px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-colors duration-300 hover:border-cyan/25 hover:bg-white/[0.09] sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-gold">{day.day}</p>
                      <h3 className="mt-1 text-xl font-extrabold text-white">
                        {day.title}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white/80">
                      <Calendar size={16} className="text-gold" />
                      <span dir="ltr">{day.date}</span>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-1">
                    {day.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-white/[0.05] px-4 py-3 text-sm leading-7 text-white/75"
                      >
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
