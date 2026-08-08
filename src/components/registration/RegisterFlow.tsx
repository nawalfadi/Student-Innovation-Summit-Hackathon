"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  Swords,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { RegistrationForm } from "@/components/registration/RegistrationForm";
import type { ParticipationType } from "@/types/registration";

export function RegisterFlow() {
  const { t, locale } = useLanguage();
  const [path, setPath] = useState<ParticipationType | null>(null);
  const BackIcon = locale === "ar" ? ArrowRight : ArrowLeft;

  if (path) {
    const isShowcase = path === "showcase";
    return (
      <div className="mx-auto w-full max-w-3xl">
        <button
          type="button"
          onClick={() => setPath(null)}
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
        >
          <BackIcon size={16} />
          {t.registerPage.backToChoice}
        </button>

        <div className="mb-8">
          <p className="text-sm font-semibold text-teal">
            {isShowcase
              ? t.registerPage.exhibitTitle
              : t.registerPage.hackathonTitle}
          </p>
          <h1 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            {t.form.title}
          </h1>
          <p className="mt-2 text-white/65">
            {isShowcase ? t.form.subtitleShowcase : t.form.subtitle}
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 shadow-[0_16px_56px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:p-8">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--color-violet),var(--color-cyan),transparent)] opacity-60" />
          <RegistrationForm
            key={path}
            participationType={path}
            onBack={() => setPath(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl">
      <div className="mb-10 text-center">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/60 transition-colors hover:text-white"
        >
          <BackIcon size={16} />
          {t.registerPage.backHome}
        </Link>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          {t.registerPage.title}
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg leading-8 text-white/65">
          {t.registerPage.subtitle}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <PathCard
          icon={<Swords size={22} className="text-teal" />}
          title={t.registerPage.hackathonTitle}
          hint={t.registerPage.hackathonHint}
          points={t.registerPage.hackathonPoints}
          cta={t.registerPage.chooseHackathon}
          onSelect={() => setPath("hackathon")}
        />
        <PathCard
          icon={<GraduationCap size={22} className="text-teal" />}
          title={t.registerPage.exhibitTitle}
          hint={t.registerPage.exhibitHint}
          points={t.registerPage.exhibitPoints}
          cta={t.registerPage.chooseExhibit}
          onSelect={() => setPath("showcase")}
        />
      </div>
    </div>
  );
}

function PathCard({
  icon,
  title,
  hint,
  points,
  cta,
  onSelect,
}: {
  icon: React.ReactNode;
  title: string;
  hint: string;
  points: string[];
  cta: string;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-6 text-start shadow-[0_12px_40px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/35 hover:bg-white/[0.06] hover:shadow-[0_20px_48px_rgba(0,0,0,0.4)] sm:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-[linear-gradient(90deg,var(--color-violet),var(--color-blue),var(--color-cyan))] opacity-0 transition-all duration-300 group-hover:scale-x-100 group-hover:opacity-70" />
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan/10">
        {icon}
      </div>
      <h2 className="text-xl font-extrabold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-7 text-white/65">{hint}</p>
      <ul className="mt-5 flex-1 space-y-2.5">
        {points.map((point) => (
          <li
            key={point}
            className="flex items-start gap-2.5 text-sm leading-6 text-white/80"
          >
            <Check
              size={16}
              className="mt-0.5 shrink-0 text-cyan"
              aria-hidden
            />
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <span className="mt-7 inline-flex items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] px-5 py-3 text-sm font-bold text-white transition-all duration-300 group-hover:border-transparent group-hover:bg-[linear-gradient(120deg,var(--color-violet),var(--color-blue),var(--color-cyan))] group-hover:shadow-[0_10px_28px_rgba(90,56,255,0.4)]">
        {cta}
      </span>
    </button>
  );
}
