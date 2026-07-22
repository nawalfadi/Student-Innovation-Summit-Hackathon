"use client";

import { Building2 } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Sponsors() {
  const { t } = useLanguage();

  return (
    <section id="sponsors" className="relative overflow-hidden py-20 sm:py-28">
      {/* Layered color stacks */}
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -right-[12%] top-[5%] hidden h-72 w-80 sm:block lg:h-96 lg:w-[28rem]"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft -right-[2%] top-[18%] hidden h-56 w-64 sm:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft right-[10%] top-[30%] hidden h-44 w-56 lg:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -left-[12%] bottom-[0%] hidden h-64 w-80 sm:block lg:h-80 lg:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -left-[2%] bottom-[12%] hidden h-52 w-64 sm:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft left-[28%] top-[45%] hidden h-48 w-60 lg:block"
        style={{ animation: "none" }}
      />

      <div className="section-container relative z-10">
        <SectionHeading
          badge={t.sponsors.badge}
          title={t.sponsors.title}
          subtitle={t.sponsors.subtitle}
        />

        <div className="mt-16 space-y-10">
          {t.sponsors.tiers.map((tier) => (
            <div key={tier.tier}>
              <h3 className="mb-5 text-center text-sm font-bold tracking-wide text-navy/50">
                {tier.label}
              </h3>
              <div className="flex flex-wrap items-center justify-center gap-4">
                {tier.sponsors.map((sponsor) => (
                  <div
                    key={sponsor}
                    className="glass-card flex min-w-[160px] items-center justify-center gap-2 px-6 py-5"
                  >
                    <Building2 size={18} className="text-gold" />
                    <span className="text-sm font-bold text-navy">
                      {sponsor}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
