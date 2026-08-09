import type { Metadata, Viewport } from "next";
import { Cairo, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { dictionaries } from "@/i18n/dictionaries";

const themeBootScript = `(function(){try{var k='sis-theme';var t=localStorage.getItem(k);if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'}document.documentElement.setAttribute('data-theme',t);document.documentElement.style.colorScheme=t}catch(e){document.documentElement.setAttribute('data-theme','dark')}})();`;

// Brand typography: Cairo (Arabic) + Montserrat (English), per identity board.
const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
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
    "قمة الابتكار الطلابي",
    "Student Innovation Summit",
    "Hackathon 2026",
    "Al Yamamah University",
  ],
  openGraph: {
    title: dictionaries.ar.meta.title,
    description: dictionaries.ar.meta.description,
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: dictionaries.ar.meta.title,
    description: dictionaries.ar.meta.description,
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0f1e",
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
      data-locale="ar"
      data-theme="dark"
      suppressHydrationWarning
      className={`${cairo.variable} ${montserrat.variable}`}
    >
      <body className={`${cairo.className} font-sans antialiased`}>
        <Script
          id="theme-boot"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeBootScript }}
        />
        <a href="#main-content" className="skip-link">
          تخطَّ إلى المحتوى الرئيسي · Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
