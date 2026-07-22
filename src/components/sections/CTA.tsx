"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function CTA() {
  const { openRegistration } = useRegistration();
  const { t, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      {/* Layered color stacks */}
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -left-[12%] top-[0%] hidden h-64 w-80 sm:block lg:h-80 lg:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft -left-[2%] top-[15%] hidden h-48 w-60 sm:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -right-[10%] bottom-[-5%] hidden h-64 w-80 sm:block lg:h-80 lg:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -right-[0%] bottom-[10%] hidden h-48 w-60 sm:block"
        style={{ animation: "none" }}
      />

      <div className="section-container relative z-10">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy px-8 py-14 text-center shadow-[0_24px_80px_rgba(27,54,93,0.28)] sm:px-16 sm:py-16">
          <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-cyan/30 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-gold/25 blur-3xl" />
          <div className="relative">
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
              onClick={openRegistration}
            >
              {t.common.registerNow}
              <CtaIcon size={20} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
