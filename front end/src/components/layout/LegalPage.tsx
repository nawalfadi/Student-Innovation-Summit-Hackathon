"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { AmbientBackground } from "@/components/brand/AmbientBackground";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useLanguage } from "@/context/LanguageContext";

interface LegalPageProps {
  title: string;
  updated: string;
  sections: { heading: string; body: string }[];
}

export function LegalPage({ title, updated, sections }: LegalPageProps) {
  const { t, locale } = useLanguage();
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  return (
    <div className="landing-page">
      <AmbientBackground />
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="section-container relative z-10 outline-none"
      >
        <article className="mx-auto max-w-3xl pb-20 pt-36 sm:pb-28 sm:pt-40">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-fg/60 transition-colors hover:text-fg"
          >
            <BackIcon size={16} />
            {t.registerPage.backHome}
          </Link>
          <h1 className="text-3xl font-extrabold text-fg sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-fg/50">{updated}</p>
          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-bold text-fg">
                  {section.heading}
                </h2>
                <p className="mt-3 text-base leading-8 text-fg/70 whitespace-pre-line">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
}
