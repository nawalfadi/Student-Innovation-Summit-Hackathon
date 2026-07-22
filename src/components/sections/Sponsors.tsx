"use client";

import { Building2 } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Sponsors() {
  const { t } = useLanguage();

  return (
    <section id="sponsors" className="relative py-20 sm:py-28">
      <div className="section-container">
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
