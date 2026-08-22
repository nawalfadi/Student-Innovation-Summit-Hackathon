"use client";

import { Handshake } from "lucide-react";
import { SectionHeading } from "@/components/layout/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

export function Partners() {
  const { locale } = useLanguage();

  return (
    <section id="partners" className="relative overflow-hidden py-20 sm:py-28">
      <div className="section-container relative z-10">
        <Reveal>
          <SectionHeading
            title={locale === "ar" ? "الشركاء" : "Partners"}
            subtitle={
              locale === "ar"
                ? "نفخر بدعم الشركاء والجهات المساهمة في إنجاح قمة الابتكار الطلابي."
                : "We are proud of the partners and organizations supporting the Student Innovation Summit."
            }
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="landing-glass mx-auto mt-12 flex max-w-2xl flex-col items-center gap-4 rounded-2xl px-8 py-10 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/10 text-cyan">
              <Handshake size={26} />
            </div>
            <p className="text-lg font-bold text-fg">
              {locale === "ar"
                ? "قائمة الشركاء ستُعلن قريباً"
                : "Partner lineup coming soon"}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
