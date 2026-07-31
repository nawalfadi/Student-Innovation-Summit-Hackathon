"use client";

import { LegalPage } from "@/components/layout/LegalPage";
import { useLanguage } from "@/context/LanguageContext";

export default function TermsPage() {
  const { t } = useLanguage();

  return (
    <LegalPage
      title={t.termsPage.title}
      updated={t.termsPage.updated}
      sections={t.termsPage.sections}
    />
  );
}
