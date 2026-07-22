"use client";

import Image from "next/image";
import { CalendarDays, MapPin, ArrowLeft, ArrowRight } from "lucide-react";
import { siteConstants } from "@/data/content";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";

export function Hero() {
  const { openRegistration } = useRegistration();
  const { t, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen overflow-hidden pt-32 sm:pt-36">
      <div className="section-container relative z-10 flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center">
        <div className="animate-fade-up relative w-full max-w-4xl">
          <h1 className="relative">
            <Image
              src="/hackathon-logo-clear.png"
              alt={t.hero.logoAlt}
              width={1200}
              height={520}
              className="mx-auto h-auto w-full max-w-3xl"
              priority
              unoptimized
            />
          </h1>
        </div>

        <p
          className="animate-fade-up mt-8 max-w-2xl text-base leading-9 text-navy/65 sm:text-lg"
          style={{ animationDelay: "0.12s" }}
        >
          {t.hero.tagline}
        </p>

        <div
          className="animate-fade-up mt-8 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:flex-wrap"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="glass-card flex items-center gap-3 px-5 py-4 text-start">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-navy/5 text-gold">
              <CalendarDays size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-navy/45">
                {t.site.datesLabel}
              </p>
              <p className="font-bold text-navy" dir="ltr">
                {t.site.dates}
              </p>
            </div>
          </div>
          <a
            href={siteConstants.locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card group flex items-center gap-3 px-5 py-4 text-start sm:max-w-md hover:border-cyan/30"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-navy/5 text-gold">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs font-semibold text-navy/45">
                {t.site.locationLabel}
              </p>
              <p className="font-bold leading-6 text-navy underline-offset-4 group-hover:underline">
                {t.site.location}
              </p>
            </div>
          </a>
        </div>

        <div
          className="animate-fade-up mt-10 flex flex-wrap items-center justify-center gap-4"
          style={{ animationDelay: "0.28s" }}
        >
          <Button size="lg" onClick={openRegistration}>
            {t.common.registerNow}
            <CtaIcon size={20} />
          </Button>
          <a href="#tracks">
            <Button variant="outline" size="lg">
              {t.common.exploreTracks}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
