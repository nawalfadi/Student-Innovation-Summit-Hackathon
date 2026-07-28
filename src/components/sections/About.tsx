"use client";

import { Target, Users, Lightbulb, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Target, Lightbulb, Users];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      {/* Soft color washes */}
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -right-[10%] top-[5%] hidden h-72 w-80 sm:block lg:h-96 lg:w-[28rem]"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft -right-[2%] top-[18%] hidden h-56 w-64 sm:block lg:h-72 lg:w-80"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft right-[10%] top-[28%] hidden h-44 w-56 lg:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -left-[12%] top-[35%] hidden h-64 w-80 sm:block lg:h-80 lg:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -left-[2%] top-[48%] hidden h-52 w-64 sm:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft left-[20%] bottom-[0%] hidden h-48 w-60 lg:block"
        style={{ animation: "none" }}
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            badge={t.about.badge}
            title={t.about.title}
            subtitle={t.about.subtitle}
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Center iridescent ring — sits behind both columns like Figma */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 z-0 hidden w-[min(560px,72%)] -translate-x-1/2 -translate-y-[42%] lg:block"
          >
            <img
              src="/decor/swirl-about-a.png"
              alt=""
              className="h-auto w-full object-contain opacity-55 [filter:contrast(1.08)_saturate(1.12)]"
              draggable={false}
            />
          </div>

          {/* Asymmetric 3:2 split instead of an even 50/50 grid, and the
              mission panel breaks from the glass-card-on-cream pattern used
              everywhere else — the page needs at least one section that
              doesn't look like a repeat of the last one. */}
          <RevealGroup className="relative z-10 grid gap-6 lg:grid-cols-5 lg:gap-8">
            <RevealItem className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy via-navy to-navy-dark p-8 text-white shadow-[0_24px_64px_rgba(27,54,93,0.35)] sm:p-10 lg:col-span-3">
              <div className="pointer-events-none absolute -left-10 -top-10 h-48 w-48 rounded-full bg-cyan/25 blur-3xl" />
              <div className="pointer-events-none absolute -right-8 bottom-0 h-40 w-40 rounded-full bg-gold/20 blur-3xl" />
              <div className="relative">
                <div className="mb-5 inline-flex items-center gap-2 rounded-2xl bg-white/10 px-3 py-1.5 text-xs font-bold text-gold ring-1 ring-white/15">
                  <Sparkles size={14} />
                  {t.about.missionBadge}
                </div>
                <h3 className="text-2xl font-extrabold sm:text-[1.75rem]">
                  {t.about.missionTitle}
                </h3>
                <p className="mt-4 leading-9 text-white/75">
                  {t.about.missionBody}
                </p>
                <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm">
                  <p className="text-sm font-bold text-gold">
                    {t.about.goalTitle}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-white/70">
                    {t.about.goalBody}
                  </p>
                </div>
              </div>
            </RevealItem>

            {/* Journey rail — a connected process, not three stray cards */}
            <RevealGroup
              className="relative space-y-4 lg:col-span-2"
              stagger={0.08}
            >
              <div
                aria-hidden
                className="absolute bottom-6 top-6 hidden w-px bg-gradient-to-b from-gold/50 via-cyan/40 to-transparent sm:block ltr:left-[1.6rem] rtl:right-[1.6rem]"
              />
              {t.journey.map((step, index) => {
                const Icon = icons[index];
                return (
                  <RevealItem
                    key={step.step}
                    whileHover={{ x: 0, y: -3 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="glass-card relative flex gap-5 p-6"
                  >
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-light text-lg font-black text-gold shadow-lg shadow-navy/20 ring-4 ring-cream">
                      {step.step}
                    </div>
                    <div>
                      <div className="mb-1.5 flex items-center gap-2">
                        <Icon size={18} className="text-gold" />
                        <h4 className="font-bold text-navy">{step.title}</h4>
                      </div>
                      <p className="text-sm leading-7 text-navy/65">
                        {step.description}
                      </p>
                    </div>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
