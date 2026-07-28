"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Vision2030Mark } from "@/components/brand/Vision2030Mark";
import { UniversityMark } from "@/components/brand/UniversityMark";
import { cn } from "@/lib/utils";

function MagneticButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const onMove = (e: MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    setOffset({ x: x * 0.2, y: y * 0.25 });
  };

  const onLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={cn("header-magnetic-cta btn-shine", className)}
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      <span className="btn-shine__sweep" aria-hidden />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeHref, setActiveHref] = useState("");
  const { openRegistration } = useRegistration();
  const { t, toggleLocale, locale } = useLanguage();
  const CtaIcon = locale === "ar" ? ArrowLeft : ArrowRight;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = t.nav.map((link) => link.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveHref(`#${entry.target.id}`);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [t.nav]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out",
        scrolled
          ? "border-b border-white/40 bg-white/55 shadow-[0_8px_32px_rgba(27,54,93,0.08)] backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent shadow-none backdrop-blur-0"
      )}
    >
      {/* Immersive brand rail — collapses when scrolled */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-out",
          scrolled ? "max-h-0 opacity-0" : "max-h-16 opacity-100"
        )}
      >
        <div
          className="section-container flex items-center justify-between gap-4 pt-3 sm:pt-4"
          dir="ltr"
        >
          <Vision2030Mark compact />
          <UniversityMark />
        </div>
      </div>

      {/* Compact sticky bar — 3-column grid keeps the nav dead-centered
          no matter how wide the logo cluster or action buttons get. */}
      <div
        className={cn(
          "section-container grid grid-cols-[auto_1fr_auto] items-center gap-2 transition-all duration-300 ease-out sm:gap-3",
          scrolled ? "h-14 py-0 sm:h-[3.5rem]" : "h-16 py-1 sm:h-[4.25rem]"
        )}
      >
        {/* Logo cluster — only in compact scrolled state */}
        <div
          className={cn(
            "flex shrink-0 items-center gap-3 overflow-hidden transition-all duration-300 ease-out",
            scrolled
              ? "max-w-[20rem] scale-100 opacity-100"
              : "pointer-events-none max-w-0 scale-95 opacity-0"
          )}
          dir="ltr"
        >
          <UniversityMark className="[&_img]:!h-7" />
          <span className="hidden h-6 w-px bg-navy/10 sm:block" aria-hidden />
          <Vision2030Mark compact className="hidden sm:block [&_img]:!h-8" />
        </div>

        {/* Nav — always centered, same size whether at the top of the
            page or scrolled deep into the content. */}
        <div className="flex min-w-0 items-center justify-center overflow-hidden">
          <nav
            className="flex max-w-full items-center gap-0.5 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Primary"
          >
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "header-nav-link shrink-0",
                  activeHref === link.href && "is-active"
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <button
            type="button"
            onClick={toggleLocale}
            className={cn(
              "header-lang-toggle transition-all duration-300",
              scrolled && "scale-[0.95]"
            )}
            aria-label={t.common.language}
          >
            <span
              className={cn("header-lang-thumb", locale === "en" && "is-en")}
              aria-hidden
            />
            <span
              className={cn(
                "header-lang-option",
                locale === "ar" && "is-active"
              )}
            >
              {t.common.langAr}
            </span>
            <span
              className={cn(
                "header-lang-option",
                locale === "en" && "is-active"
              )}
            >
              {t.common.langEn}
            </span>
          </button>

          <MagneticButton
            className={cn(
              "header-magnetic-cta--glow transition-all duration-300",
              scrolled && "header-magnetic-cta--compact"
            )}
            onClick={openRegistration}
          >
            {t.common.registerNow}
            <CtaIcon size={14} className="hidden sm:inline" />
          </MagneticButton>
        </div>
      </div>
    </header>
  );
}
