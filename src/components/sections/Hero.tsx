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
    <section className="relative min-h-screen overflow-hidden pt-32 sm:pt-36 lg:pt-40">
      {/* Layered mist — offset color stacks in different places */}
      {/* Left stack: deep → mid → sky */}
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -left-[14%] top-[2%] h-80 w-96 sm:h-[28rem] sm:w-[32rem]"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft -left-[4%] top-[12%] h-64 w-72 sm:h-80 sm:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft left-[8%] top-[18%] h-52 w-64 sm:h-64 sm:w-80"
        style={{ animation: "none" }}
      />
      {/* Right stack: sky → deep → mid */}
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -right-[12%] top-[4%] h-80 w-96 sm:h-[28rem] sm:w-[30rem]"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -right-[2%] top-[16%] h-64 w-72 sm:h-80 sm:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft right-[10%] top-[28%] hidden h-48 w-60 lg:block"
        style={{ animation: "none" }}
      />
      {/* Mid / lower stacks */}
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft left-[28%] top-[45%] hidden h-64 w-80 lg:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft left-[38%] top-[55%] hidden h-48 w-64 lg:block"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-mid blue-spray-soft -left-[6%] bottom-[2%] h-64 w-80 sm:h-72 sm:w-96"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft left-[6%] bottom-[8%] h-48 w-64 sm:h-56 sm:w-72"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="hero-blue-splash -left-[8%] top-[22%] h-80 w-80 bg-[#2f296f]/10 sm:h-[26rem] sm:w-[26rem]"
      />
      <div
        aria-hidden
        className="hero-blue-splash -right-[6%] top-[8%] h-96 w-96 bg-[#81b9ec]/16 sm:h-[28rem] sm:w-[28rem]"
      />
      <div
        aria-hidden
        className="hero-blue-splash left-[40%] top-[50%] hidden h-56 w-64 bg-[#555bc1]/10 lg:block"
      />

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
