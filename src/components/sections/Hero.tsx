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
    <section className="relative min-h-screen overflow-x-clip pt-32 sm:pt-36 lg:pt-40">
      {/* Soft mist (kept under swirls) */}
      <div
        aria-hidden
        className="blue-spray spray-deep blue-spray-soft -left-[14%] top-[2%] h-80 w-96 sm:h-[28rem] sm:w-[32rem]"
        style={{ animation: "none" }}
      />
      <div
        aria-hidden
        className="blue-spray spray-sky blue-spray-soft -right-[12%] top-[4%] h-80 w-96 sm:h-[28rem] sm:w-[30rem]"
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

      {/*
        Hero rings — alignment matched to Figma:
        left mid-low | top-center peek | right mid-high
      */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block"
      >
        {/* Left — beside the map, mid-to-lower */}
        <img
          src="/decor/swirl-hero-left.png"
          alt=""
          width={420}
          height={244}
          className="absolute left-[-3%] top-[42%] w-[min(26vw,360px)] max-w-none -translate-y-1/2 -rotate-[18deg] object-contain opacity-65"
          draggable={false}
        />
        {/* Top-center — small arc under the nav, above the logo */}
        <img
          src="/decor/swirl-hero-top.png"
          alt=""
          width={360}
          height={209}
          className="absolute left-[48%] top-[6%] w-[min(22vw,300px)] max-w-none -translate-x-1/2 object-contain opacity-55"
          draggable={false}
        />
        {/* Right — open loop, higher than the left ring */}
        <img
          src="/decor/swirl-hero-right.png"
          alt=""
          width={440}
          height={255}
          className="absolute right-[-4%] top-[28%] w-[min(28vw,380px)] max-w-none -translate-y-1/2 rotate-[6deg] object-contain opacity-65"
          draggable={false}
        />
      </div>

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
