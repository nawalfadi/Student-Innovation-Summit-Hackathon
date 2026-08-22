"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Crosshair } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { HeroCountdown } from "@/components/brand/HeroCountdown";

/**
 * Full-bleed background.png with text layered on top
 * (dark left side of the artwork = readable text area).
 */
export function Hero() {
  const { t, locale } = useLanguage();
  const isAr = locale === "ar";

  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden"
    >
      {/* Background artwork — slightly scaled down so the graphic isn't oversized */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        <div className="relative h-[82%] w-[86%] max-w-[1480px] translate-x-14 -translate-y-1 sm:translate-x-20 sm:-translate-y-2">
          <Image
            src="/background.png"
            alt=""
            fill
            priority
            quality={100}
            sizes="(max-width: 1600px) 92vw, 1600px"
            className="object-contain object-center"
          />
        </div>
      </div>

      {/* Soft scrim on the left so centered-in-left text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-[#050510]/80 via-[#050510]/40 to-transparent lg:from-[#050510]/70 lg:via-[#050510]/25"
      />
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050510] to-transparent"
      />

      {/* Text centered within the LEFT half of the page */}
      <div
        dir="ltr"
        className="relative z-10 flex min-h-[100svh] items-center pt-24 pb-16 sm:pt-28 sm:pb-20"
      >
        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 px-5 sm:px-8 lg:grid-cols-2 lg:px-12">
          <div
            className="flex w-full max-w-xl flex-col items-center justify-self-center text-center lg:max-w-none lg:justify-self-stretch"
            lang={locale}
          >
            <p
              className={`text-sm font-bold tracking-wide text-[#00D4FF] sm:text-[0.95rem] ${isAr ? "font-ar" : "font-en"}`}
            >
              {t.hero.label}
            </p>

            <h1
              className={`mt-3 text-[2.5rem] font-black leading-[1.15] tracking-tight text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.55)] sm:text-5xl lg:text-[3.6rem] lg:leading-[1.12] ${isAr ? "font-ar" : "font-en"}`}
            >
              {t.hero.title}
            </h1>

            {/* English secondary — always Montserrat */}
            <p className="font-en mt-4 text-sm font-semibold uppercase tracking-[0.22em] text-white/90">
              {t.hero.titleEn}
            </p>

            <div className="mt-3 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-gradient-to-r from-transparent to-[#7000FF]" />
              <p className="font-en text-xs font-bold tracking-[0.4em] text-[#00D4FF] sm:text-sm">
                {t.hero.hackathonTag.split("").join(" ")}
              </p>
              <span className="h-px w-10 bg-gradient-to-l from-transparent to-[#00D4FF]" />
            </div>

            <p
              className={`mt-6 max-w-xl text-lg font-bold leading-9 text-white/85 sm:text-xl sm:leading-10 ${isAr ? "font-ar" : "font-en"}`}
            >
              {t.hero.tagline}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/register"
                className={`btn-shine inline-flex items-center justify-center gap-2.5 rounded-full bg-gradient-to-l from-[#00D4FF] via-[#007BFF] to-[#7000FF] px-8 py-3.5 text-sm font-extrabold text-white shadow-[0_0_34px_rgba(112,0,255,0.42)] transition hover:brightness-110 ${isAr ? "font-ar" : "font-en"}`}
              >
                <span className="btn-shine__sweep" aria-hidden />
                <span className="relative z-10 inline-flex items-center gap-2.5">
                  {t.common.registerNow}
                  <ArrowLeft size={18} aria-hidden />
                </span>
              </Link>
              <a
                href="#tracks"
                className={`inline-flex items-center justify-center gap-2.5 rounded-full border border-white/25 bg-black/20 px-8 py-3.5 text-sm font-extrabold text-white backdrop-blur-sm transition hover:border-[#00D4FF]/45 hover:bg-white/[0.06] ${isAr ? "font-ar" : "font-en"}`}
              >
                <Crosshair size={16} className="text-[#00D4FF]" />
                {t.hero.exploreChallenges}
              </a>
            </div>

            <HeroCountdown className="mt-8 w-full max-w-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
