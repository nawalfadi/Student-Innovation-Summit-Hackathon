"use client";

import { Calendar } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Timeline() {
  const { t } = useLanguage();

  return (
    <section id="timeline" className="relative overflow-hidden py-20 sm:py-28">
      <div className="section-container relative z-10">
        <SectionHeading
          badge={t.timeline.badge}
          title={t.timeline.title}
          subtitle={t.timeline.subtitle}
        />

        <div className="relative mt-16">
          <div className="absolute right-[2.15rem] top-4 hidden h-[calc(100%-2rem)] w-px bg-gradient-to-b from-cyan via-gold/60 to-transparent lg:block rtl:right-[2.15rem] ltr:left-[2.15rem] ltr:right-auto" />

          <div className="space-y-6">
            {t.timeline.days.map((day, index) => (
              <div
                key={day.day}
                className="relative grid gap-5 lg:grid-cols-[100px_1fr]"
              >
                <div className="hidden lg:flex lg:justify-center">
                  <div className="relative z-10 flex h-[4.3rem] w-[4.3rem] items-center justify-center rounded-2xl bg-navy text-sm font-black text-white shadow-xl shadow-navy/25 ring-4 ring-cream">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                </div>

                <article className="glass-card p-7 sm:p-8">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold text-gold">{day.day}</p>
                      <h3 className="mt-1 text-xl font-extrabold text-navy">
                        {day.title}
                      </h3>
                    </div>
                    <div className="inline-flex items-center gap-2 rounded-2xl border border-navy/8 bg-white/60 px-4 py-2 text-sm font-semibold text-navy/70">
                      <Calendar size={16} className="text-gold" />
                      <span dir="ltr">{day.date}</span>
                    </div>
                  </div>
                  <ul className="mt-6 grid gap-3 sm:grid-cols-1">
                    {day.items.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl bg-navy/[0.03] px-4 py-3 text-sm leading-7 text-navy/70"
                      >
                        <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
