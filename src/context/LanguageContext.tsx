"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { dictionaries, type Dictionary, type Locale } from "@/i18n/dictionaries";

interface LanguageContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

// Short and eased so the swap reads as a deliberate cross-dissolve, not a
// stall — long enough to mask the instant RTL/LTR layout flip (which reads
// as a jarring "jump" otherwise), short enough to never feel unresponsive.
const TRANSITION_MS = 140;

function applyDocumentLocale(locale: Locale) {
  const dir = locale === "ar" ? "rtl" : "ltr";
  document.documentElement.lang = locale;
  document.documentElement.dir = dir;
  document.title = dictionaries[locale].meta.title;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [visible, setVisible] = useState(true);
  const switchingRef = useRef(false);
  const timeoutsRef = useRef<number[]>([]);

  // Every fresh load starts in Arabic — deliberately not remembered across
  // visits/reloads via localStorage, so "the first screen" is always
  // Arabic regardless of what was toggled in a previous session.
  useEffect(() => {
    applyDocumentLocale("ar");
  }, []);

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale || switchingRef.current) return;
      switchingRef.current = true;
      setVisible(false);

      const swapId = window.setTimeout(() => {
        setLocaleState(next);
        applyDocumentLocale(next);
        setVisible(true);

        const unlockId = window.setTimeout(() => {
          switchingRef.current = false;
        }, TRANSITION_MS);
        timeoutsRef.current.push(unlockId);
      }, TRANSITION_MS);
      timeoutsRef.current.push(swapId);
    },
    [locale]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === "ar" ? "en" : "ar");
  }, [locale, setLocale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir: locale === "ar" ? "rtl" : "ltr",
      t: dictionaries[locale],
      setLocale,
      toggleLocale,
    }),
    [locale, setLocale, toggleLocale]
  );

  return (
    <LanguageContext.Provider value={value}>
      <div
        className={visible ? "opacity-100" : "pointer-events-none opacity-0"}
        style={{
          transition: `opacity ${TRANSITION_MS}ms ease`,
          willChange: "opacity",
        }}
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}
