"use client";

import { useEffect, type ReactNode } from "react";

const HEADER_OFFSET = 88;

function scrollToHash(id: string, behavior: ScrollBehavior = "smooth") {
  const target = document.querySelector(id);
  if (!target) return;

  const header = document.querySelector("header");
  const offset = header?.getBoundingClientRect().height ?? HEADER_OFFSET;
  const top =
    target.getBoundingClientRect().top + window.scrollY - offset;

  window.scrollTo({ top: Math.max(0, top), behavior });
}

/**
 * Native scrolling with fixed-header-aware anchor jumps.
 * Lenis was removed — its RAF loop fighting dozens of blurred layers
 * made wheel scrolling feel laggy on this page.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
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
    // Honor deep links like /#tracks without fighting browser restore.
    if (window.location.hash.length > 1) {
      requestAnimationFrame(() => {
        scrollToHash(window.location.hash, "auto");
      });
    }

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
      scrollToHash(id, "smooth");
      history.pushState(null, "", id);
    }

    function onHashChange() {
      if (window.location.hash.length > 1) {
        scrollToHash(window.location.hash, "smooth");
      }
    }

    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return <>{children}</>;
}
