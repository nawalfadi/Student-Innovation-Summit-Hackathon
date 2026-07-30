"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { DecorativeSwirl } from "@/components/brand/DecorativeSwirl";
import { SectionSpray } from "@/components/brand/SectionSpray";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

// Real crest artwork, trimmed of its baked-in whitespace so every logo
// reads at a consistent visual size regardless of source canvas. Falls
// back to a designed monogram (not a bare gray box) for any university
// added later without artwork on hand yet.
const universityLogos: Record<string, string> = {
  KSU: "/decor/Unis-Logo-trimmed/KSU.png",
  PNU: "/decor/Unis-Logo-trimmed/PNU.png",
  AU: "/decor/Unis-Logo-trimmed/AU.png",
  PSU: "/decor/Unis-Logo-trimmed/PSU.png",
  IMSIU: "/decor/Unis-Logo-trimmed/IMSIU.png",
  PSAU: "/decor/Unis-Logo-trimmed/PSAU.png",
  SEU: "/decor/Unis-Logo-trimmed/SEU.png",
  DAU: "/decor/Unis-Logo-trimmed/DAU.png",
};

const monogramPalettes = [
  "from-navy to-navy-light",
  "from-[#2f296f] to-[#555bc1]",
  "from-[#1f7a8c] to-cyan",
  "from-navy-dark to-[#2f296f]",
];

export function Universities() {
  const { t } = useLanguage();

  return (
    <section id="universities" className="relative overflow-hidden py-20 sm:py-28">
      <SectionSpray
        tone="sky"
        className="-left-[12%] top-[4%] h-72 w-80 lg:h-96 lg:w-[28rem]"
      />
      <SectionSpray
        tone="deep"
        className="-right-[12%] top-[38%] h-72 w-80 lg:h-96 lg:w-[28rem]"
      />

      <DecorativeSwirl
        src="/decor/swirl-universities.png"
        left={-23}
        top={-48}
        width={409}
        height={394}
        opacity={0.7}
        rotate={141}
      />
      <DecorativeSwirl
        src="/decor/swirl-universities.png"
        left={1074}
        top={-187}
        width={413}
        height={409}
        opacity={0.7}
        rotate={52}
      />

      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            badge={t.universities.badge}
            title={t.universities.title}
            subtitle={t.universities.subtitle}
          />
        </Reveal>

        <RevealGroup
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
          stagger={0.06}
        >
          {t.universities.list.map((uni, index) => (
            <RevealItem
              // uni.abbr alone is stable across locales (uni.name is
              // translated text and used to change on language switch,
              // forcing an unnecessary remount of every card).
              key={uni.abbr}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className={`glass-card relative flex flex-col items-center justify-center p-6 text-center ${
                uni.featured
                  ? "host-card-glow ring-1 ring-gold/40 sm:col-span-2 sm:p-8 lg:col-span-1"
                  : ""
              }`}
            >
              {/* Host ribbon — pinned to the card itself, not stacked in
                  the centered content flow, so it can't push Al Yamamah's
                  logo/name out of alignment with everyone else's. */}
              {uni.featured && (
                <span className="absolute -top-3 rounded-full bg-gold px-3 py-1 text-xs font-bold text-navy-dark shadow-md shadow-gold/30 ltr:right-5 rtl:left-5">
                  {t.universities.hostBadge}
                </span>
              )}
              {uni.featured ? (
                <div className="mb-4 flex h-16 w-full items-center justify-center px-2">
                  <Image
                    src="/alyamamah-logo-v2.png"
                    alt={uni.name}
                    width={200}
                    height={48}
                    className="h-11 w-auto"
                  />
                </div>
              ) : universityLogos[uni.abbr] ? (
                <div className="mb-4 flex h-16 w-full items-center justify-center px-2">
                  <Image
                    src={universityLogos[uni.abbr]}
                    alt={uni.name}
                    width={240}
                    height={160}
                    className="h-16 w-auto max-w-full object-contain"
                  />
                </div>
              ) : (
                <div
                  className={`mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-black tracking-tight text-white shadow-lg shadow-navy/15 ring-1 ring-white/20 ${monogramPalettes[index % monogramPalettes.length]}`}
                >
                  {uni.abbr}
                </div>
              )}
              {!uni.featured && !universityLogos[uni.abbr] && (
                <GraduationCap size={20} className="mb-2 text-navy/35" />
              )}
              {/* Fixed-height slot, vertically centered — keeps every
                  university's name anchored to the same baseline whether
                  it's "Prince Sattam University" (one line) or "Imam Mohammad
                  Ibn Saud Islamic University" (wraps), instead of shorter names
                  floating higher than their neighbors in the row. */}
              <div className="flex min-h-[2.75rem] w-full flex-col items-center justify-center sm:min-h-[3.25rem]">
                <h3 className="text-sm font-bold leading-tight text-navy sm:text-base">
                  {uni.name}
                </h3>
                {uni.subtitle ? (
                  <p className="mt-1 text-xs font-semibold tracking-wide text-navy/50">
                    {uni.subtitle}
                  </p>
                ) : null}
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
