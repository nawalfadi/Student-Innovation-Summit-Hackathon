"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { EventCountdown } from "@/components/brand/EventCountdown";
import { SectionSpray } from "@/components/brand/SectionSpray";

export function CTA() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <SectionSpray
        tone="sky"
        className="-left-[12%] top-[0%] h-64 w-80 lg:h-80 lg:w-96"
      />
      <SectionSpray
        tone="deep"
        className="-right-[10%] bottom-[-5%] h-64 w-80 lg:h-80 lg:w-96"
      />

      <div className="section-container relative z-10">
        <Reveal
          y={36}
          className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-center shadow-[0_24px_80px_rgba(27,54,93,0.28)] sm:px-16 sm:py-16"
        >
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative">
            <div className="mb-5 flex justify-center">
              <EventCountdown dark />
            </div>
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              {t.cta.title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/75">
              {t.cta.body}
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="mt-8"
              onClick={() => router.push("/register")}
            >
              {t.common.registerNow}
              <CtaIcon size={20} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
