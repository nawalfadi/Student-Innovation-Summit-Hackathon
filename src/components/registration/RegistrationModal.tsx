"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { X, CheckCircle2, Loader2, Users, UserPlus, UsersRound } from "lucide-react";
import { useRegistration } from "@/context/RegistrationContext";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import type {
  RegistrationPayload,
  TeamMember,
  TrackId,
} from "@/types/registration";

const emptyMember = (): TeamMember => ({ name: "", email: "" });

const initialForm: RegistrationPayload = {
  fullName: "",
  universityId: "",
  universityName: "",
  email: "",
  phone: "",
  track: "mowajjih",
  teamName: "",
  memberCount: 3,
  members: [emptyMember(), emptyMember(), emptyMember()],
  projectIdea: "",
  needsTeam: false,
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function RegistrationModal() {
  const { isOpen, closeRegistration } = useRegistration();
  const { t, locale } = useLanguage();
  const [form, setForm] = useState<RegistrationPayload>(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const panelRef = useRef<HTMLDivElement>(null);
  const formStateRef = useRef(form);
  const successRef = useRef(success);
  formStateRef.current = form;
  successRef.current = success;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setForm(initialForm);
        setErrors({});
        setSuccess(false);
        setServerMessage("");
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // A visitor who has typed real information into this form and then
  // fat-fingers a click on the backdrop shouldn't silently lose it — this
  // is the single most punishing possible failure mode for a conversion
  // form, so it gets a confirmation instead of a silent wipe.
  function isDirty() {
    const f = formStateRef.current;
    return Boolean(
      f.fullName ||
        f.universityId ||
        f.universityName ||
        f.email ||
        f.phone ||
        f.teamName ||
        f.projectIdea ||
        f.members.some((m) => m.name || m.email)
    );
  }

  function requestClose() {
    if (!successRef.current && isDirty()) {
      const confirmed = window.confirm(t.validation.confirmDiscard ?? "");
      if (!confirmed) return;
    }
    closeRegistration();
  }

  // Focus trap + Escape-to-close. Screen readers and keyboard users
  // currently had no way to close this modal without a mouse, and could
  // tab straight through into the page behind it — both fixed here.
  useEffect(() => {
    if (!isOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const getFocusable = () =>
      Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter(
        (el) => el.offsetParent !== null
      );

    const toFocus = getFocusable()[0] ?? panel;
    toFocus.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
        return;
      }
      if (e.key === "Tab") {
        const items = getFocusable();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  if (!isOpen) return null;

  const updateMemberCount = (count: number) => {
    const members = [...form.members];
    while (members.length < count) members.push(emptyMember());
    while (members.length > count) members.pop();
    setForm({ ...form, memberCount: count, members });
  };

  const updateMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const members = [...form.members];
    members[index] = { ...members[index], [field]: value };
    setForm({ ...form, members });
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerMessage("");

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, locale }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.errors) setErrors(result.errors);
        setServerMessage(result.message ?? t.validation.genericError);
        return;
      }

      setSuccess(true);
      setServerMessage(result.message ?? t.validation.successFallback);
    } catch {
      setServerMessage(t.validation.networkError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={requestClose}
        aria-label={t.common.close}
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="registration-modal-title"
        // Lenis takes over wheel/touch scrolling for the whole document;
        // without this it also swallows scroll input meant for this
        // modal's own internal overflow, making the long form feel frozen.
        data-lenis-prevent
        className="animate-modal-in relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/60 bg-cream/95 shadow-2xl backdrop-blur-xl sm:rounded-3xl"
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-navy/8 bg-cream/90 px-6 py-5 backdrop-blur-xl">
          <div>
            <h2
              id="registration-modal-title"
              className="text-xl font-bold text-navy"
            >
              {t.form.title}
            </h2>
            <p className="text-sm text-navy/60">{t.form.subtitle}</p>
          </div>
          <button
            type="button"
            onClick={requestClose}
            className="rounded-xl p-2 text-navy/60 hover:bg-white/70 hover:text-navy"
            aria-label={t.common.close}
          >
            <X size={22} />
          </button>
        </div>

        {success ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan/15">
              <CheckCircle2 size={40} className="text-navy" />
            </div>
            <h3 className="text-2xl font-bold text-navy">{t.form.successTitle}</h3>
            <p className="mx-auto mt-4 max-w-md leading-8 text-navy/70">
              {serverMessage}
            </p>
            <Button className="mt-8" onClick={closeRegistration}>
              {t.common.close}
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8 px-6 py-6">
            <section>
              <div className="mb-4 flex items-center gap-2">
                <UserPlus size={18} className="text-gold" />
                <h3 className="font-bold text-navy">{t.form.personal}</h3>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  label={t.form.fullName}
                  name="fullName"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm({ ...form, fullName: e.target.value })
                  }
                  error={errors.fullName}
                  placeholder={t.form.placeholders.fullName}
                  required
                />
                <Input
                  label={t.form.universityId}
                  name="universityId"
                  value={form.universityId}
                  onChange={(e) =>
                    setForm({ ...form, universityId: e.target.value })
                  }
                  error={errors.universityId}
                  placeholder={t.form.placeholders.universityId}
                  required
                />
                <Input
                  label={t.form.universityName}
                  name="universityName"
                  value={form.universityName}
                  onChange={(e) =>
                    setForm({ ...form, universityName: e.target.value })
                  }
                  error={errors.universityName}
                  placeholder={t.form.placeholders.universityName}
                  required
                />
                <Input
                  label={t.form.email}
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  error={errors.email}
                  placeholder={t.form.placeholders.email}
                  dir="ltr"
                  className="text-left"
                  required
                />
                <Input
                  label={t.form.phone}
                  name="phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  error={errors.phone}
                  placeholder={t.form.placeholders.phone}
                  dir="ltr"
                  className="text-left sm:col-span-2"
                  required
                />
              </div>
            </section>

            <section>
              <Select
                label={t.form.track}
                name="track"
                value={form.track}
                onChange={(e) =>
                  setForm({ ...form, track: e.target.value as TrackId })
                }
                error={errors.track}
                options={t.form.trackOptions.map((option) => ({
                  value: option.value,
                  label: option.label,
                }))}
              />
            </section>

            <section>
              <div className="mb-4 flex items-center gap-2">
                <Users size={18} className="text-gold" />
                <h3 className="font-bold text-navy">{t.form.team}</h3>
              </div>

              {/* Solo / no-team-yet path — the audit's #1 UX finding was
                  that a hard-locked 3-5 member requirement silently turns
                  away individually-motivated students. This keeps the
                  default team flow intact but adds an explicit escape
                  hatch instead of a wall. */}
              <label
                className={`mb-5 flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition-colors ${
                  form.needsTeam
                    ? "border-cyan/40 bg-cyan/10"
                    : "border-navy/10 bg-white/50 hover:bg-white/70"
                }`}
              >
                <input
                  type="checkbox"
                  checked={form.needsTeam}
                  onChange={(e) =>
                    setForm({ ...form, needsTeam: e.target.checked })
                  }
                  className="mt-0.5 h-5 w-5 shrink-0 rounded-md border-navy/30 text-cyan focus:ring-2 focus:ring-cyan/30"
                />
                <span>
                  <span className="flex items-center gap-2 font-bold text-navy">
                    <UsersRound size={16} className="text-gold" />
                    {t.form.needsTeamLabel}
                  </span>
                  {form.needsTeam && (
                    <span className="mt-1 block text-sm leading-6 text-navy/65">
                      {t.form.needsTeamHint}
                    </span>
                  )}
                </span>
              </label>

              {!form.needsTeam && (
                <>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input
                      label={t.form.teamName}
                      name="teamName"
                      value={form.teamName}
                      onChange={(e) =>
                        setForm({ ...form, teamName: e.target.value })
                      }
                      error={errors.teamName}
                      placeholder={t.form.placeholders.teamName}
                      required
                    />
                    <Select
                      label={t.form.memberCount}
                      name="memberCount"
                      value={String(form.memberCount)}
                      onChange={(e) => updateMemberCount(Number(e.target.value))}
                      error={errors.memberCount}
                      options={[3, 4, 5].map((n) => ({
                        value: String(n),
                        label: t.form.membersLabel(n),
                      }))}
                    />
                  </div>

                  <div className="mt-4 space-y-4">
                    {form.members.map((member, index) => (
                      <div
                        key={index}
                        className="rounded-2xl border border-navy/8 bg-white/60 p-4"
                      >
                        <p className="mb-3 text-sm font-semibold text-navy">
                          {t.form.member} {index + 1}
                        </p>
                        <div className="grid gap-3 sm:grid-cols-2">
                          <Input
                            label={t.form.memberName}
                            name={`member-name-${index}`}
                            value={member.name}
                            onChange={(e) =>
                              updateMember(index, "name", e.target.value)
                            }
                            placeholder={t.form.placeholders.memberName}
                          />
                          <Input
                            label={t.form.memberEmail}
                            name={`member-email-${index}`}
                            type="email"
                            value={member.email}
                            onChange={(e) =>
                              updateMember(index, "email", e.target.value)
                            }
                            placeholder={t.form.placeholders.memberEmail}
                            dir="ltr"
                            className="text-left"
                          />
                        </div>
                      </div>
                    ))}
                    {errors.members && (
                      <p className="text-sm text-red-600">{errors.members}</p>
                    )}
                  </div>
                </>
              )}
            </section>

            <section>
              <Textarea
                label={
                  form.needsTeam ? t.form.projectIdeaOptional : t.form.projectIdea
                }
                name="projectIdea"
                value={form.projectIdea}
                onChange={(e) =>
                  setForm({ ...form, projectIdea: e.target.value })
                }
                error={errors.projectIdea}
                placeholder={t.form.placeholders.projectIdea}
                required={!form.needsTeam}
              />
            </section>

            {serverMessage && !success && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {serverMessage}
              </div>
            )}

            <div className="sticky bottom-0 flex flex-col gap-3 border-t border-navy/8 bg-cream/95 pb-2 pt-4 sm:flex-row">
              <Button type="submit" className="flex-1" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t.common.submitting}
                  </>
                ) : (
                  t.common.submit
                )}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={requestClose}
                disabled={submitting}
              >
                {t.common.cancel}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
