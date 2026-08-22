"use client";

import { Trophy } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function Prizes() {
  const { locale } = useLanguage();

  return (
    <section id="prizes" className="relative overflow-hidden py-20 sm:py-28">
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            title={locale === "ar" ? "الجوائز" : "Prizes"}
            subtitle={
              locale === "ar"
                ? "تكريم المشاريع المتميزة ودعم ابتكار الطلاب بجوائز نوعية وشراكات تقنية."
                : "Recognizing outstanding projects and supporting student innovation with meaningful prizes."
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="landing-glass mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-2xl px-8 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(140deg,var(--color-violet),var(--color-cyan))] text-white shadow-[0_10px_30px_rgba(90,56,255,0.35)]">
              <Trophy size={26} />
            </div>
            <p className="text-lg font-bold text-fg">
              {locale === "ar"
                ? "سيتم الإعلان عن تفاصيل الجوائز قريباً"
                : "Prize details will be announced soon"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
