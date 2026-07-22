"use client";

import { Target, Users, Lightbulb, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Target, Lightbulb, Users];

export function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative overflow-hidden py-20 sm:py-28">
      <div className="section-container relative z-10">
        <SectionHeading
          badge={t.about.badge}
          title={t.about.title}
          subtitle={t.about.subtitle}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-2 lg:gap-8">
          <div className="glass-card relative overflow-hidden p-8 sm:p-10">
            <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-cyan/15 blur-2xl" />
            <div className="relative">
              <div className="mb-5 inline-flex items-center gap-2 rounded-2xl bg-navy px-3 py-1.5 text-xs font-bold text-gold">
                <Sparkles size={14} />
                {t.about.missionBadge}
              </div>
              <h3 className="text-2xl font-extrabold text-navy">
                {t.about.missionTitle}
              </h3>
              <p className="mt-4 leading-9 text-navy/70">{t.about.missionBody}</p>
              <div className="mt-8 rounded-2xl border border-navy/8 bg-navy/[0.03] p-5">
                <p className="text-sm font-bold text-navy">{t.about.goalTitle}</p>
                <p className="mt-2 text-sm leading-7 text-navy/65">
                  {t.about.goalBody}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {t.journey.map((step, index) => {
              const Icon = icons[index];
              return (
                <div
                  key={step.step}
                  className="glass-card flex gap-5 p-6"
                  style={{ animationDelay: `${index * 0.08}s` }}
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-navy to-navy-light text-lg font-black text-gold shadow-lg shadow-navy/20">
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
