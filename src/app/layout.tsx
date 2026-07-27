import type { Metadata } from "next";
import "./globals.css";
import { RegistrationProvider } from "@/context/RegistrationContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { dictionaries } from "@/i18n/dictionaries";

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
      <body className="font-sans antialiased">
        <LanguageProvider>
          <RegistrationProvider>{children}</RegistrationProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
