import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { dictionaries } from "@/i18n/dictionaries";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} antialiased`}>
        <LanguageProvider>
          <RegistrationProvider>{children}</RegistrationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
