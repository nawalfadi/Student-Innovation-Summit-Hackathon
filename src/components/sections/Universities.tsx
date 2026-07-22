"use client";

import Image from "next/image";
import { GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { useLanguage } from "@/context/LanguageContext";

export function Universities() {
  const { t } = useLanguage();

  return (
    <section id="universities" className="relative py-20 sm:py-28">
      <div className="section-container">
        <SectionHeading
          badge={t.universities.badge}
          title={t.universities.title}
          subtitle={t.universities.subtitle}
        />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {t.universities.list.map((uni) => (
            <div
              key={uni.abbr + uni.name}
              className={`glass-card flex flex-col items-center p-6 text-center ${
                uni.featured ? "ring-1 ring-gold/35" : ""
              }`}
            >
              {uni.featured ? (
                <div className="mb-4 flex h-14 w-full items-center justify-center px-2">
                  <Image
                    src="/alyamamah-logo-v2.png"
                    alt={uni.name}
                    width={200}
                    height={48}
                    className="h-10 w-auto"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-navy/8 text-lg font-bold text-navy">
                  {uni.abbr}
                </div>
              )}
              <GraduationCap
                size={20}
                className={`mb-2 ${uni.featured ? "text-gold" : "text-navy/35"}`}
              />
              <h3 className="text-sm font-bold leading-6 text-navy sm:text-base">
                {uni.name}
              </h3>
              {uni.featured && (
                <span className="mt-2 rounded-2xl bg-gold/15 px-3 py-0.5 text-xs font-bold text-gold-dark">
                  {t.universities.hostBadge}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
