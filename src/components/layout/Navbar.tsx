"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeHref, setActiveHref] = useState("#home");
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { t, toggleLocale, locale } = useLanguage();
  const isAr = locale === "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!isHome) {
      setActiveHref("");
      return;
    }

    const ids = t.nav.map((link) => link.href.replace("#", ""));

    const onScroll = () => {
      const headerH =
        document.querySelector("header")?.getBoundingClientRect().height ?? 88;
      const spyLine = headerH + 24;
      let current = ids[0] ?? "home";

      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= spyLine) current = id;
      }

      setActiveHref(`#${current}`);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [t.nav, isHome]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { style } = document.body;
    const prev = {
      overflow: style.overflow,
      position: style.position,
      top: style.top,
      width: style.width,
    };

    style.overflow = "hidden";
    style.position = "fixed";
    style.top = `-${scrollY}px`;
    style.width = "100%";

    return () => {
      style.overflow = prev.overflow;
      style.position = prev.position;
      style.top = prev.top;
      style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-white/[0.06] bg-[#050510]/90 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      {/*
        Physical chrome (matches design):
        LEFT = logo · CENTER = nav (الرئيسية closest to logo) · RIGHT = AR|EN + CTA
      */}
      <div
        dir="ltr"
        className="mx-auto flex h-[5.5rem] max-w-7xl items-center gap-3 px-5 sm:px-8 lg:px-10"
      >
        <Link
          href={isHome ? "#home" : "/"}
          className="relative flex h-[2.75rem] w-[8.5rem] shrink-0 items-center sm:h-[3.15rem] sm:w-[10.5rem] lg:w-[11.5rem]"
          onClick={() => setOpen(false)}
          aria-label={
            isAr
              ? "هاكاثون قمة الابتكار الطلابي"
              : "Student Innovation Summit Hackathon"
          }
        >
          <Image
            src="/brand-logo-header.png"
            alt={
              isAr
                ? "هاكاثون قمة الابتكار الطلابي"
                : "Student Innovation Summit Hackathon"
            }
            fill
            sizes="256px"
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 px-1 xl:flex"
          aria-label="Primary"
          dir={isAr ? "rtl" : "ltr"}
        >
          {/*
            With dir=rtl, first link (الرئيسية) sits on the right of the nav group.
            Design wants الرئيسية closest to the logo (left) — reverse visual via ltr + natural list order.
          */}
          <div className="flex items-center gap-0.5" dir="ltr">
            {t.nav.map((link) => {
              const href = isHome ? link.href : `/${link.href}`;
              const active =
                activeHref === link.href ||
                (link.href === "#home" &&
                  (activeHref === "" || activeHref === "#home"));
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "relative shrink-0 px-2 py-2 text-[0.78rem] font-bold transition-colors",
                    isAr ? "font-ar" : "font-en",
                    active ? "text-white" : "text-white/50 hover:text-white"
                  )}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-2.5 -bottom-0.5 h-[2px] rounded-full bg-gradient-to-r from-[#7000FF] via-[#007BFF] to-[#00D4FF] shadow-[0_0_10px_rgba(112,0,255,0.75)]"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="ms-auto flex shrink-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={toggleLocale}
            dir="ltr"
            className="font-en px-1.5 py-1.5 text-xs font-bold tracking-wide text-white/75 transition hover:text-white"
            aria-label={t.common.language}
          >
            <span className={isAr ? "text-white" : "text-white/35"}>AR</span>
            <span className="mx-1.5 text-white/25">|</span>
            <span className={!isAr ? "text-white" : "text-white/35"}>EN</span>
          </button>

          <Link
            href="/register"
            className={cn(
              "btn-shine hidden rounded-full bg-gradient-to-r from-[#7000FF] via-[#007BFF] to-[#00D4FF] px-5 py-2.5 text-sm font-extrabold text-white shadow-[0_0_28px_rgba(112,0,255,0.42)] transition hover:brightness-110 sm:inline-flex",
              isAr ? "font-ar" : "font-en"
            )}
          >
            <span className="btn-shine__sweep" aria-hidden />
            <span className="relative z-10">{t.common.registerNow}</span>
          </Link>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.common.close : t.common.menu}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          className="border-t border-white/[0.06] bg-[#050510]/95 px-5 py-4 backdrop-blur-xl xl:hidden"
          dir={isAr ? "rtl" : "ltr"}
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {t.nav.map((link) => (
              <Link
                key={link.href}
                href={isHome ? link.href : `/${link.href}`}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-bold text-white/70 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/register"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-[#7000FF] via-[#007BFF] to-[#00D4FF] px-5 py-3 text-center text-sm font-extrabold text-white"
            >
              {t.common.registerNow}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
