"use client";

import { BookOpen, Sparkles, Cpu, Check } from "lucide-react";
import { DecorativeSwirl } from "@/components/brand/DecorativeSwirl";
import { SectionSpray } from "@/components/brand/SectionSpray";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const iconMap = {
  book: BookOpen,
  campus: Sparkles,
  digital: Cpu,
};

const accents = [
  "shadow-cyan/25 ring-cyan/20 group-hover:shadow-cyan/40",
  "shadow-blue/25 ring-blue/20 group-hover:shadow-blue/40",
  "shadow-navy/25 ring-navy/15 group-hover:shadow-navy/40",
];

export function Tracks() {
  const { t } = useLanguage();

  return (
    <section id="tracks" className="relative overflow-hidden py-20 sm:py-28">
      <SectionSpray
        tone="sky"
        className="-left-[12%] top-[4%] h-80 w-96 lg:h-[28rem] lg:w-[30rem]"
      />
      <SectionSpray
        tone="deep"
        className="-right-[10%] top-[30%] h-72 w-80 lg:h-96 lg:w-[28rem]"
      />

      <DecorativeSwirl
        src="/decor/swirl-tracks.png"
        left={-7}
        top={373}
        width={666}
        height={375}
        opacity={0.5}
      />
      <DecorativeSwirl
        src="/decor/swirl-tracks.png"
        left={644}
        top={361}
        width={666}
        height={375}
        opacity={0.5}
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            badge={t.tracks.badge}
            title={t.tracks.title}
            subtitle={t.tracks.subtitle}
          />
        </Reveal>

        <RevealGroup className="mt-16 grid gap-6 lg:grid-cols-3">
          {t.tracks.items.map((track, index) => {
            const Icon = iconMap[track.icon as keyof typeof iconMap] ?? BookOpen;
            return (
              <RevealItem
                key={track.id}
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                className="glass-card group relative flex h-full flex-col overflow-hidden p-8"
              >
                <div className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-gold/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <div className="pointer-events-none absolute -right-6 bottom-0 h-28 w-28 rounded-full bg-cyan/15 blur-2xl" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-blue text-cyan shadow-lg ring-1 transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 ${accents[index % accents.length]}`}
                    >
                      <Icon size={26} />
                    </div>
                    <span className="text-4xl font-black text-navy/10 transition-colors duration-300 group-hover:text-navy/20">
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold leading-snug text-navy sm:text-2xl">
                    {track.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue">
                    {track.nameEn}
                  </p>
                  <p className="mt-4 leading-8 text-navy/65">
                    {track.description}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-navy/8 pt-6">
                    {track.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-cyan/20 bg-white/80 px-3.5 py-3 text-sm font-bold leading-6 text-navy shadow-[0_4px_16px_rgba(11,31,68,0.08)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-blue/35 group-hover:bg-white group-hover:shadow-[0_10px_28px_rgba(11,31,68,0.12)]"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-navy to-blue text-cyan">
                          <Check size={14} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
