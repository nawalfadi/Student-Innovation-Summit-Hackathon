"use client";

import { LegalPage } from "@/components/layout/LegalPage";
import { useLanguage } from "@/context/LanguageContext";

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <LegalPage
      title={t.privacyPage.title}
      updated={t.privacyPage.updated}
      sections={t.privacyPage.sections}
    />
  );
}
