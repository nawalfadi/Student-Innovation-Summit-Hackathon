"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Vision2030Mark } from "@/components/brand/Vision2030Mark";
import { UniversityMark } from "@/components/brand/UniversityMark";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openRegistration } = useRegistration();
  const { t, toggleLocale, locale } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-navy/8 bg-cream/80 shadow-[0_8px_32px_rgba(27,54,93,0.06)] backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div
        className="section-container flex items-center justify-between gap-4 pt-3"
        dir="ltr"
      >
        <Vision2030Mark compact />
        <UniversityMark />
      </div>

      <div className="section-container flex h-14 items-center justify-between gap-4 sm:h-16">
        <nav className="hidden items-center gap-7 lg:flex">
          {t.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-navy/70 transition-colors hover:text-navy"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-xl border border-navy/15 bg-white/50 px-3 py-2 text-xs font-bold text-navy backdrop-blur-sm transition-colors hover:bg-white/80"
            aria-label={t.common.language}
          >
            {t.common.language}
          </button>
          <Button size="sm" onClick={openRegistration}>
            {t.common.registerNow}
          </Button>
        </div>

        <div className="ms-auto flex items-center gap-2 lg:hidden">
          <button
            type="button"
            onClick={toggleLocale}
            className="rounded-xl border border-navy/15 bg-white/50 px-2.5 py-1.5 text-xs font-bold text-navy"
            aria-label={t.common.language}
          >
            {locale === "ar" ? "EN" : "ع"}
          </button>
          <button
            type="button"
            className="rounded-xl p-2 text-navy"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={t.common.menu}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-navy/8 bg-cream/95 px-4 py-4 shadow-lg backdrop-blur-xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {t.nav.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-xl px-3 py-2.5 text-navy hover:bg-white/70"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="mt-2 w-full" onClick={openRegistration}>
              {t.common.registerNow}
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
