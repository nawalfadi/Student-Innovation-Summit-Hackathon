"use client";

import { SectionSpray } from "@/components/brand/SectionSpray";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Sourced from /Universities (Arabic filenames), served from /public/universities.
 * Cache-bust query updated whenever assets are refreshed from that folder.
 */
const CACHE_BUST = "v20260817a";

const universityLogos: { abbr: string; src: string; alt: string }[] = [
  { abbr: "YU", src: `/alyamamah-logo-white.png?${CACHE_BUST}`, alt: "Al Yamamah University" },
  { abbr: "KSU", src: `/universities/ksu.png?${CACHE_BUST}`, alt: "King Saud University" },
  { abbr: "PNU", src: `/universities/pnu.png?${CACHE_BUST}`, alt: "Princess Nourah University" },
  { abbr: "AU", src: `/universities/au.png?${CACHE_BUST}`, alt: "Alfaisal University" },
  { abbr: "DAU", src: `/universities/dau.png?${CACHE_BUST}`, alt: "Dar Al Uloom University" },
  { abbr: "PSU", src: `/universities/psu.png?${CACHE_BUST}`, alt: "Prince Sultan University" },
  {
    abbr: "IMSIU",
    src: `/universities/imsiu.png?${CACHE_BUST}`,
    alt: "Imam Mohammad Ibn Saud Islamic University",
  },
  { abbr: "PSAU", src: `/universities/psau.png?${CACHE_BUST}`, alt: "Prince Sattam University" },
  { abbr: "SEU", src: `/universities/seu.png?${CACHE_BUST}`, alt: "Saudi Electronic University" },
];

export function Universities() {
  const { t } = useLanguage();

  return (
    <section id="venue" className="relative overflow-hidden py-20 sm:py-28">
      <SectionSpray
        tone="sky"
        className="-left-[12%] top-[4%] h-72 w-80 lg:h-96 lg:w-[28rem]"
      />
      <SectionSpray
        tone="deep"
        className="-right-[12%] top-[38%] h-72 w-80 lg:h-96 lg:w-[28rem]"
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            title={t.universities.title}
            subtitle={t.universities.subtitle}
          />
        </Reveal>

        <Reveal>
          <div className="landing-glass relative mx-auto mt-14 min-h-[18rem] max-w-6xl overflow-hidden rounded-3xl px-6 py-10 sm:min-h-[22rem] sm:px-10 sm:py-12 lg:min-h-[24rem] lg:px-14 lg:py-14">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-violet),var(--color-blue),var(--color-cyan),transparent)] opacity-70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-20 h-56 w-56 rounded-full bg-violet/35 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-14 top-1/3 h-52 w-52 rounded-full bg-blue/30 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-[-20%] left-1/3 h-48 w-64 rounded-full bg-indigo/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(112,0,255,0.14),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(0,123,255,0.16),transparent_50%)]"
            />

            <RevealGroup
              className="relative z-10 flex h-full min-h-[inherit] flex-col items-center justify-center gap-10 sm:gap-12 lg:gap-14"
              stagger={0.05}
            >
              {[universityLogos.slice(0, 5), universityLogos.slice(5, 10)].map(
                (row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex w-full flex-wrap items-center justify-center gap-x-8 gap-y-8 sm:gap-x-10 lg:gap-x-12"
                  >
                    {row.map((logo) => (
                      <RevealItem
                        key={logo.abbr}
                        className="flex h-20 w-32 items-center justify-center sm:h-24 sm:w-36 lg:h-28 lg:w-40"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={logo.src}
                          alt={logo.alt}
                          className={
                            logo.abbr === "YU"
                              ? "h-full w-full max-h-full scale-[1.25] object-contain"
                              : "h-full w-full max-h-full object-contain"
                          }
                        />
                      </RevealItem>
                    ))}
                  </div>
                )
              )}
            </RevealGroup>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
