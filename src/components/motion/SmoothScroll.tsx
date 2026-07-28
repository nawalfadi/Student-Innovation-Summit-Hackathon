"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";

/**
 * Apple-style inertial smooth scrolling (Lenis) + automatic
 * silky scrolling for any in-page anchor link (`href="#section"`),
 * with a fixed-header offset baked in.
 *
 * Respects prefers-reduced-motion by skipping the RAF-driven easing
 * entirely and falling back to the browser's native scroll.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  // Browsers restore the previous scroll position on reload by default —
  // on a long single-page site that means a refresh can land you mid-page
  // (e.g. at Tracks) instead of at the top. Every load of this page should
  // start at the top, so take manual control and force it.
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Pause the always-on decorative blur/blob animations whenever the tab
  // isn't visible — they cost real GPU/battery for zero visual payoff while
  // backgrounded.
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
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
    });
    lenisRef.current = lenis;

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Smoothly drive any `<a href="#id">` through Lenis, offset for
    // the fixed header so the target doesn't land underneath it.
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
      lenis.scrollTo(target as HTMLElement, {
        offset: -88,
        duration: 1.4,
        easing: (t: number) => 1 - Math.pow(1 - t, 3),
      });
      history.pushState(null, "", id);
    }
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
