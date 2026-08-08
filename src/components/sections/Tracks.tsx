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
  "shadow-teal/25 ring-teal/20 group-hover:shadow-teal/40",
];

const iconChips = [
  "bg-[linear-gradient(140deg,var(--color-blue),var(--color-cyan))]",
  "bg-[linear-gradient(140deg,var(--color-violet),var(--color-blue))]",
  "bg-[linear-gradient(140deg,var(--color-cyan),var(--color-teal))]",
];

const numberColors = [
  "text-cyan/40 group-hover:text-cyan/70",
  "text-violet/40 group-hover:text-violet/70",
  "text-teal/40 group-hover:text-teal/70",
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
                <div className="pointer-events-none absolute -left-8 top-0 h-32 w-32 rounded-full bg-teal/15 blur-2xl transition-transform duration-500 group-hover:scale-150" />
                <div className="pointer-events-none absolute -right-6 bottom-0 h-28 w-28 rounded-full bg-cyan/15 blur-2xl" />

                <div className="relative z-10 flex h-full flex-col">
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-2xl text-white shadow-lg ring-1 transition-all duration-500 ease-out group-hover:-rotate-6 group-hover:scale-110 ${iconChips[index % iconChips.length]} ${accents[index % accents.length]}`}
                    >
                      <Icon size={26} />
                    </div>
                    <span
                      className={`text-4xl font-black transition-colors duration-300 ${numberColors[index % numberColors.length]}`}
                    >
                      0{index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold leading-snug text-white sm:text-2xl">
                    {track.name}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-blue">
                    {track.nameEn}
                  </p>
                  <p className="mt-4 leading-8 text-white/65">
                    {track.description}
                  </p>
                  <ul className="mt-6 flex flex-1 flex-col gap-2.5 border-t border-white/8 pt-6">
                    {track.highlights.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.04] px-3.5 py-3 text-sm font-bold leading-6 text-white shadow-[0_4px_16px_rgba(0,0,0,0.2)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-cyan/30 group-hover:bg-white/[0.07] group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.3)]"
                      >
                        <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(140deg,var(--color-violet),var(--color-cyan))] text-white">
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
