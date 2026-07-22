"use client";

import { Compass, Zap, ArrowLeftRight } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = {
  compass: Compass,
  zap: Zap,
  bridge: ArrowLeftRight,
};

export function Tracks() {
  const { t } = useLanguage();

  return (
    <section id="tracks" className="relative overflow-hidden py-20 sm:py-28">
      <div className="section-container relative z-10">
        <SectionHeading
          badge={t.tracks.badge}
          title={t.tracks.title}
          subtitle={t.tracks.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.tracks.items.map((track, index) => {
            const Icon = iconMap[track.icon as keyof typeof iconMap] ?? Compass;
            return (
              <article
                key={track.id}
                className="glass-card group relative overflow-hidden p-8"
              >
                <div className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-gold/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <div className="pointer-events-none absolute -right-6 bottom-0 h-28 w-28 rounded-full bg-cyan/15 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy text-gold shadow-lg shadow-navy/20">
                      <Icon size={26} />
                    </div>
                    <span className="text-4xl font-black text-navy/10">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-navy">
                    {track.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-gold">
                    {track.nameEn}
                  </p>
                  <p className="mt-4 leading-8 text-navy/65">
                    {track.description}
                  </p>
                  <ul className="mt-6 space-y-3 border-t border-navy/8 pt-6">
                    {track.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 text-sm text-navy/70"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold to-cyan" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
