import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { dictionaries } from "@/i18n/dictionaries";

// Self-hosted, Arabic-capable webfont — replaces the old "Segoe UI" stack,
// which silently fails (and falls back to whatever the OS has) on every
// non-Windows device, i.e. most of this audience.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: dictionaries.ar.meta.title,
  description: dictionaries.ar.meta.description,
  keywords: [
    "هاكاثون",
    "جامعة اليمامة",
    "الابتكار الطلابي",
    "Student Innovation Summit",
    "Hackathon 2026",
    "Al Yamamah University",
  ],
  openGraph: {
    title: dictionaries.ar.meta.title,
    description: dictionaries.ar.meta.description,
    images: [{ url: "/hackathon-logo-clear.png", width: 1200, height: 520 }],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dictionaries.ar.meta.title,
    description: dictionaries.ar.meta.description,
    images: ["/hackathon-logo-clear.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#1b365d",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      suppressHydrationWarning
      className={cairo.variable}
    >
      <body className="font-sans antialiased">
        <a href="#main-content" className="skip-link">
          تخطَّ إلى المحتوى الرئيسي · Skip to main content
        </a>
        <LanguageProvider>
          <SmoothScroll>{children}</SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
