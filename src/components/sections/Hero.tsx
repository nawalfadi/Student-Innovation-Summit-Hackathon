"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { CalendarDays, MapPin, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { siteConstants } from "@/data/content";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { EventCountdown } from "@/components/brand/EventCountdown";

export function Hero() {
  const { openRegistration } = useRegistration();
  const { t, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Depth-of-field parallax — each ring drifts at its own rate as the
  // hero scrolls out, and the whole cluster gently dissolves.
  const yLeft = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yRight = useTransform(scrollYProgress, [0, 1], [0, 190]);
  const ringsOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-x-clip pt-32 sm:pt-36 lg:pt-40"
    >
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
      <motion.div
        aria-hidden
        style={{ opacity: ringsOpacity }}
        className="pointer-events-none absolute inset-0 z-[1] hidden overflow-hidden lg:block"
      >
        {/* Left — beside the map, mid-to-lower */}
        <motion.img
          src="/decor/swirl-hero-left.png"
          alt=""
          width={420}
          height={244}
          style={{ y: yLeft }}
          className="absolute left-[-3%] top-[42%] w-[min(26vw,360px)] max-w-none -translate-y-1/2 -rotate-[18deg] object-contain opacity-65"
          draggable={false}
        />
        {/* Top-center — small arc under the nav, above the logo */}
        <motion.img
          src="/decor/swirl-hero-top.png"
          alt=""
          width={360}
          height={209}
          style={{ y: yTop }}
          className="absolute left-[48%] top-[6%] w-[min(22vw,300px)] max-w-none -translate-x-1/2 object-contain opacity-55"
          draggable={false}
        />
        {/* Right — open loop, higher than the left ring */}
        <motion.img
          src="/decor/swirl-hero-right.png"
          alt=""
          width={440}
          height={255}
          style={{ y: yRight }}
          className="absolute right-[-4%] top-[28%] w-[min(28vw,380px)] max-w-none -translate-y-1/2 rotate-[6deg] object-contain opacity-65"
          draggable={false}
        />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="section-container relative z-10 flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center"
      >
        <div className="animate-fade-up">
          <EventCountdown />
        </div>

        <div
          className="animate-fade-up relative mt-6 w-full max-w-4xl"
          style={{ animationDelay: "0.06s" }}
        >
          <h1 className="relative">
            <Image
              // English locale gets its own wordmark lockup instead of the
              // Arabic-text logo being stretched/relabeled.
              src={
                locale === "en"
                  ? "/hackathon-logo-en.png"
                  : "/hackathon-logo-clear.png"
              }
              alt={t.hero.logoAlt}
              width={1200}
              height={520}
              className="mx-auto h-auto w-full max-w-3xl"
              priority
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
          className="animate-fade-up mt-10 flex flex-col items-center gap-5"
          style={{ animationDelay: "0.28s" }}
        >
          <Button size="lg" onClick={openRegistration} className="px-10">
            {t.common.registerNow}
            <CtaIcon size={20} />
          </Button>
          {/* Deliberately a plain link, not a second button — one clear
              primary action beats two competing calls to action. */}
          <a
            href="#tracks"
            className="group inline-flex items-center gap-1.5 text-sm font-bold text-navy/60 underline decoration-navy/20 decoration-2 underline-offset-4 transition-colors hover:text-navy hover:decoration-navy/50"
          >
            {t.common.exploreTracks}
            <ChevronDown
              size={15}
              className="transition-transform duration-300 group-hover:translate-y-0.5"
            />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
