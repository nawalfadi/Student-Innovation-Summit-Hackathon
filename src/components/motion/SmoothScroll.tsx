"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Native scrolling with fixed-header-aware anchor jumps.
 * Lenis was removed — its RAF loop fighting dozens of blurred layers
 * made wheel scrolling feel laggy on this page.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    function onVisibility() {
      document.documentElement.classList.toggle(
        "motion-paused",
        document.hidden
      );
    }
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      const top =
        target.getBoundingClientRect().top + window.scrollY - 88;
      window.scrollTo({ top, behavior: "smooth" });
      history.pushState(null, "", id);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
