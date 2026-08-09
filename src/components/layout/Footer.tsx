"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, CalendarDays } from "lucide-react";
import { siteConstants } from "@/data/content";
import { Vision2030Mark } from "@/components/brand/Vision2030Mark";
import { UniversityMark } from "@/components/brand/UniversityMark";
import { Reveal } from "@/components/motion/Reveal";
import { useLanguage } from "@/context/LanguageContext";

function SocialSvg({
  children,
  size = 18,
}: {
  children: React.ReactNode;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function InstagramIcon() {
  return (
    <SocialSvg>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </SocialSvg>
  );
}

function XIcon() {
  return (
    <SocialSvg>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.727-8.835L1.254 2.25H8.08l4.259 5.685L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </SocialSvg>
  );
}

function LinkedInIcon() {
  return (
    <SocialSvg>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </SocialSvg>
  );
}

function YouTubeIcon() {
  return (
    <SocialSvg>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </SocialSvg>
  );
}

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <SocialSvg size={size}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </SocialSvg>
  );
}

const socialLinks = [
  {
    key: "instagram",
    href: siteConstants.social.instagram,
    label: "Instagram",
    icon: InstagramIcon,
  },
  {
    key: "x",
    href: siteConstants.social.x,
    label: "X",
    icon: XIcon,
  },
  {
    key: "linkedin",
    href: siteConstants.social.linkedin,
    label: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    key: "youtube",
    href: siteConstants.social.youtube,
    label: "YouTube",
    icon: YouTubeIcon,
  },
] as const;

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="relative overflow-hidden bg-navy-dark text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-violet),var(--color-cyan),var(--color-teal),transparent)] opacity-60" />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-violet/15 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-teal/12 blur-3xl" />
      </div>

      <Reveal y={20} className="section-container relative z-10 py-12 sm:py-14">
        <div
          className="mb-10 flex flex-wrap items-center justify-between gap-6"
          dir="ltr"
        >
          <Vision2030Mark variant="light" />
          <UniversityMark onDark />
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div>
            <h4 className="font-semibold text-teal">{t.footer.eventInfo}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li className="flex items-start gap-2.5">
                <CalendarDays size={16} className="mt-0.5 shrink-0 text-cyan" />
                <span dir="ltr" className="text-start">
                  {t.site.dates}
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-cyan" />
                <a
                  href={siteConstants.locationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-teal"
                >
                  {t.site.location}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-teal">{t.footer.contact}</h4>
            <ul className="mt-4 space-y-3 text-sm text-white/65">
              <li>
                <a
                  href={`mailto:${siteConstants.email}`}
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-teal"
                >
                  <Mail size={16} className="shrink-0 text-cyan" />
                  <span dir="ltr">{siteConstants.email}</span>
                </a>
              </li>
              {siteConstants.phones.map((phone) => (
                <li key={phone.href}>
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2.5 transition-colors hover:text-teal"
                    dir="ltr"
                  >
                    <Phone size={16} className="shrink-0 text-cyan" />
                    {phone.display}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-teal">{t.footer.social}</h4>
            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks.map(({ key, href, label, icon: Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/80 transition-colors hover:border-teal/40 hover:bg-teal/15 hover:text-teal"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-teal">{t.footer.community}</h4>
            <p className="mt-4 text-sm leading-6 text-white/55">
              {t.footer.whatsappHint}
            </p>
            <a
              href={siteConstants.whatsappCommunityUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 rounded-2xl bg-[#25D366] px-4 py-2.5 text-sm font-bold text-navy-dark transition-opacity hover:opacity-90"
            >
              <WhatsAppIcon size={18} />
              {t.footer.whatsappCta}
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm text-white/45 sm:flex-row">
          <p>
            © 2026 {t.site.university}. {t.footer.rights}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-teal">
              {t.footer.privacy}
            </Link>
            <Link href="/terms" className="transition-colors hover:text-teal">
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
