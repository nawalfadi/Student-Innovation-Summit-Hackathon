"use client";

import { siteConstants } from "@/data/content";
import { Vision2030Mark } from "@/components/brand/Vision2030Mark";
import { UniversityMark } from "@/components/brand/UniversityMark";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

// NOTE (pre-launch checklist): siteConstants.phone in src/data/content.ts is
// still a placeholder ("+966 11 000 0000"). A string of zeros this close to
// the bottom of the page is exactly the kind of detail a skeptical visitor
// notices — swap in the real organizing-committee number before launch.

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden border-t border-navy/8 bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-cyan/20 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
      </div>

      <Reveal y={20} className="section-container relative z-10 py-12">
        <div
          className="mb-10 flex flex-wrap items-center justify-between gap-6"
          dir="ltr"
        >
          <Vision2030Mark variant="light" />
          <UniversityMark onDark />
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold">{t.site.title}</h3>
            <p className="mt-3 text-sm leading-7 text-white/65">{t.footer.blurb}</p>
          </div>
          <div>
            <h4 className="font-semibold text-gold">{t.footer.eventInfo}</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li dir="ltr" className="text-start">
                {t.site.dates}
              </li>
              <li>
                <a
                  href={siteConstants.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {t.site.location}
                </a>
              </li>
              <li>{t.footer.teamSize}</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gold">{t.footer.contact}</h4>
            <ul className="mt-3 space-y-2 text-sm text-white/65">
              <li>{siteConstants.email}</li>
              <li dir="ltr" className="text-start">
                {siteConstants.phone}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>
            © 2026 {t.site.university}. {t.footer.rights}
          </p>
          <p>{t.site.vision2030}</p>
        </div>
      </Reveal>
    </footer>
  );
}
