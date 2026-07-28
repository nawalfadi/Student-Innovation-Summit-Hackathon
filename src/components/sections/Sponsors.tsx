"use client";

import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

// Tier-differentiated typography instead of a generic icon repeated on
// every single tile — without real sponsor logos, treating each name as a
// confident wordmark (size + weight scaling by tier) reads as an
// intentional design choice, not a placeholder waiting for assets.
const tierStyles = {
  platinum: {
    card: "border-t-2 border-t-gold bg-white/70 px-8 py-6 shadow-[0_12px_36px_rgba(201,162,39,0.12)]",
    text: "text-xl font-black tracking-tight text-navy sm:text-2xl",
    label: "text-gold",
  },
  gold: {
    card: "bg-white/55 px-7 py-5",
    text: "text-lg font-bold tracking-tight text-navy",
    label: "text-navy/55",
  },
  silver: {
    card: "bg-white/40 px-5 py-3.5",
    text: "text-sm font-semibold text-navy/75",
    label: "text-navy/40",
  },
} as const;

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
        className="blue-spray spray-deep blue-spray-soft -left-[12%] bottom-[0%] hidden h-64 w-80 sm:block lg:h-80 lg:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft left-[28%] top-[45%] hidden h-48 w-60 lg:block"
        style={{ animation: "none" }}
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            badge={t.sponsors.badge}
            title={t.sponsors.title}
            subtitle={t.sponsors.subtitle}
          />
        </Reveal>

        <div className="mt-16 space-y-12">
          {t.sponsors.tiers.map((tier, tierIndex) => {
            const style =
              tierStyles[tier.tier as keyof typeof tierStyles] ??
              tierStyles.silver;
            return (
              <Reveal key={tier.tier} delay={tierIndex * 0.08}>
                <div className="mb-6 flex items-center justify-center gap-3">
                  <span
                    className="h-px w-10 bg-current opacity-20"
                    style={{ color: "var(--color-navy)" }}
                    aria-hidden
                  />
                  <h3
                    className={cn(
                      "text-xs font-black uppercase tracking-[0.2em]",
                      style.label
                    )}
                  >
                    {tier.label}
                  </h3>
                  <span
                    className="h-px w-10 bg-current opacity-20"
                    style={{ color: "var(--color-navy)" }}
                    aria-hidden
                  />
                </div>
                <RevealGroup
                  className="flex flex-wrap items-center justify-center gap-4"
                  stagger={0.06}
                >
                  {tier.sponsors.map((sponsor, sponsorIndex) => (
                    <RevealItem
                      // Index-based, not the name itself — a couple of
                      // sponsor names differ slightly between locales
                      // (e.g. the ministry name), which would otherwise
                      // force a remount on every language switch.
                      key={`${tier.tier}-${sponsorIndex}`}
                      whileHover={{ y: -3, scale: 1.03 }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 20,
                      }}
                      className={cn(
                        "glass-card flex min-w-[160px] items-center justify-center text-center",
                        style.card
                      )}
                    >
                      <span className={style.text}>{sponsor}</span>
                    </RevealItem>
                  ))}
                </RevealGroup>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
