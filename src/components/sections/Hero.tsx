"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, MapPin, ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { siteConstants } from "@/data/content";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { SectionSpray } from "@/components/brand/SectionSpray";

export function Hero() {
  const router = useRouter();
  const { t, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-screen overflow-x-clip pt-32 sm:pt-36 lg:pt-40">
      <SectionSpray
        tone="deep"
        className="-left-[14%] top-[2%] h-80 w-96 sm:h-[28rem] sm:w-[32rem]"
      />
      <SectionSpray
        tone="sky"
        className="-right-[12%] top-[4%] h-80 w-96 sm:h-[28rem] sm:w-[30rem]"
      />

      <div className="section-container relative z-10 flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center py-12 text-center">
        <div className="animate-fade-up relative mx-auto w-full max-w-3xl">
          <h1 className="relative aspect-[1200/520] w-full">
            <Image
              // Both lockups share the same canvas size so switching
              // locale doesn't change the logo footprint.
              src={
                locale === "en"
                  ? "/hackathon-logo-en.png"
                  : "/hackathon-logo-clear.png"
              }
              alt={t.hero.logoAlt}
              className="object-contain"
              fill
              sizes="(max-width: 768px) 100vw, 48rem"
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
          <Button
            size="lg"
            className="px-10"
            onClick={() => router.push("/register")}
          >
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
      </div>
    </section>
  );
}
