"use client";

import { useRef, useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Upload,
  Users,
  UserPlus,
  FileUp,
  X,
  Plus,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  EXHIBIT_FILE_ACCEPT,
  EXHIBIT_FILE_MAX_BYTES,
  EXHIBIT_FILE_MIME,
  type ParticipationType,
  type RegistrationPayload,
  type TeamMember,
  type TrackId,
} from "@/types/registration";

const emptyMember = (): TeamMember => ({ name: "", email: "" });

/** Teammates only (leader is separate). Team total = teammates + 1. */
const MIN_TEAMMATES = 1;
const MAX_TEAMMATES = 4;

function createInitialForm(
  participationType: ParticipationType
): RegistrationPayload {
  const isShowcase = participationType === "showcase";
  return {
    fullName: "",
    universityId: "",
    universityName: "",
    email: "",
    phone: "",
    participationType,
    track: isShowcase ? undefined : "academic",
    teamName: "",
    memberCount: isShowcase ? 1 : MIN_TEAMMATES + 1,
    members: isShowcase
      ? []
      : Array.from({ length: MIN_TEAMMATES }, () => emptyMember()),
    isTeam: false,
    projectIdea: "",
    major: "",
    universityYear: "",
    graduationYear: "",
  };
}

interface RegistrationFormProps {
  participationType: ParticipationType;
}

export function RegistrationForm({
  participationType,
}: RegistrationFormProps) {
  const { t, locale } = useLanguage();
  const isShowcase = participationType === "showcase";
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<RegistrationPayload>(() =>
    createInitialForm(participationType)
  );
  const [projectFile, setProjectFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverMessage, setServerMessage] = useState("");

  const showTeamSection = !isShowcase || Boolean(form.isTeam);
  const minTeammates = MIN_TEAMMATES;

  const updateMember = (
    index: number,
    field: keyof TeamMember,
    value: string
  ) => {
    const members = [...form.members];
    members[index] = { ...members[index], [field]: value };
    setForm({ ...form, members, memberCount: members.length + 1 });
  };

  const addTeammate = () => {
    if (form.members.length >= MAX_TEAMMATES) return;
    const members = [...form.members, emptyMember()];
    setForm({ ...form, members, memberCount: members.length + 1 });
  };

  const removeTeammate = (index: number) => {
    if (form.members.length <= minTeammates) return;
    const members = form.members.filter((_, i) => i !== index);
    setForm({ ...form, members, memberCount: members.length + 1 });
  };

  const setShowcaseIsTeam = (isTeam: boolean) => {
    if (isTeam) {
      const members =
        form.members.length > 0
          ? form.members
          : Array.from({ length: MIN_TEAMMATES }, () => emptyMember());
      setForm({
        ...form,
        isTeam: true,
        members,
        memberCount: members.length + 1,
      });
      return;
    }
    setForm({
      ...form,
      isTeam: false,
      teamName: "",
      members: [],
      memberCount: 1,
    });
  };

  function validateLocalFile(file: File | null): string | null {
    if (!file) return t.validation.projectFile;
    if (file.size > EXHIBIT_FILE_MAX_BYTES) return t.validation.projectFileSize;
    if (file.type && !EXHIBIT_FILE_MIME.has(file.type)) {
      const okExt = /\.(pdf|ppt|pptx|doc|docx|zip|png|jpe?g)$/i.test(file.name);
      if (!okExt) return t.validation.projectFileType;
    }
    return null;
  }

  function onFileChange(file: File | null) {
    setProjectFile(file);
    if (!file) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.projectFile;
        return next;
      });
      return;
    }
    const fileError = validateLocalFile(file);
    setErrors((prev) => {
      const next = { ...prev };
      if (fileError) next.projectFile = fileError;
      else delete next.projectFile;
      return next;
    });
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});
    setServerMessage("");

    {
      const fileError = validateLocalFile(projectFile);
      if (fileError) {
        setErrors({ projectFile: fileError });
        setSubmitting(false);
        return;
      }
    }

    try {
      if (!projectFile) {
        setErrors({ projectFile: t.validation.projectFile });
        setSubmitting(false);
        return;
      }

      const fd = new FormData();
      fd.append("fullName", form.fullName);
      fd.append("universityId", isShowcase ? "" : form.universityId);
      fd.append("universityName", form.universityName);
      fd.append("email", form.email);
      fd.append("phone", form.phone);
      fd.append("participationType", participationType);
      fd.append("projectIdea", form.projectIdea);
      fd.append("major", form.major ?? "");
      fd.append("locale", locale);
      fd.append("projectFile", projectFile);

      if (isShowcase) {
        const asTeam = Boolean(form.isTeam);
        fd.append("isTeam", asTeam ? "true" : "false");
        fd.append("teamName", asTeam ? form.teamName : "");
        fd.append(
          "memberCount",
          String(asTeam ? form.members.length + 1 : 1)
        );
        fd.append(
          "members",
          JSON.stringify(asTeam ? form.members : [])
        );
        fd.append("graduationYear", form.graduationYear ?? "");
      } else {
        fd.append("isTeam", "true");
        fd.append("track", form.track ?? "academic");
        fd.append("teamName", form.teamName);
        fd.append("memberCount", String(form.members.length + 1));
        fd.append("members", JSON.stringify(form.members));
        fd.append("universityYear", form.universityYear ?? "");
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: fd,
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

  if (success) {
    return (
      <div className="px-1 py-10 text-center sm:px-4 sm:py-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cyan/15">
          <CheckCircle2 size={40} className="text-fg" />
        </div>
        <h3 className="text-2xl font-bold text-fg">{t.form.successTitle}</h3>
        <p className="mx-auto mt-4 max-w-md leading-8 text-fg/70">
          {serverMessage}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-[linear-gradient(120deg,var(--color-violet)_0%,var(--color-indigo)_35%,var(--color-blue)_70%,var(--color-cyan)_100%)] px-6 py-3 text-base font-bold text-white shadow-[0_8px_28px_rgba(90,56,255,0.35)] transition-[filter,box-shadow] duration-200 hover:shadow-[0_14px_38px_rgba(0,212,255,0.4)] hover:brightness-[1.08]"
          >
            <span className="btn-shine__sweep" aria-hidden />
            <span className="relative z-10">{t.registerPage.backHome}</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <div className="mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-teal" />
          <h3 className="font-bold text-fg">
            {isShowcase ? t.form.personal : t.form.personalLeader}
          </h3>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label={isShowcase ? t.form.fullName : t.form.leaderFullName}
            name="fullName"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            error={errors.fullName}
            placeholder={t.form.placeholders.fullName}
            required
          />
          {!isShowcase && (
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
          )}
          <Select
            label={t.form.universityName}
            name="universityName"
            value={form.universityName}
            onChange={(e) =>
              setForm({ ...form, universityName: e.target.value })
            }
            error={errors.universityName}
            options={[
              { value: "", label: t.form.selectUniversity },
              ...t.form.universityOptions,
            ]}
            required
          />
          <Input
            label={t.form.major}
            name="major"
            value={form.major ?? ""}
            onChange={(e) => setForm({ ...form, major: e.target.value })}
            error={errors.major}
            placeholder={t.form.placeholders.major}
            required
          />
          {isShowcase ? (
            <Select
              label={t.form.graduationYear}
              name="graduationYear"
              value={form.graduationYear ?? ""}
              onChange={(e) =>
                setForm({ ...form, graduationYear: e.target.value })
              }
              error={errors.graduationYear}
              options={[
                { value: "", label: t.form.selectGraduationYear },
                ...t.form.graduationYearOptions,
              ]}
              required
            />
          ) : (
            <Select
              label={t.form.universityYear}
              name="universityYear"
              value={form.universityYear ?? ""}
              onChange={(e) =>
                setForm({ ...form, universityYear: e.target.value })
              }
              error={errors.universityYear}
              options={[
                { value: "", label: t.form.selectUniversityYear },
                ...t.form.universityYearOptions,
              ]}
              required
            />
          )}
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
            className="text-left"
            required
          />
        </div>
      </section>

      {!isShowcase && (
        <section>
          <Select
            label={t.form.track}
            name="track"
            value={form.track ?? "academic"}
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
      )}

      {isShowcase && (
        <section>
          <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-fg/10 bg-[var(--input-bg)] px-4 py-4 transition-colors hover:border-cyan/35">
            <input
              type="checkbox"
              checked={Boolean(form.isTeam)}
              onChange={(e) => setShowcaseIsTeam(e.target.checked)}
              className="mt-1 h-4 w-4 shrink-0 accent-cyan"
            />
            <span>
              <span className="block text-sm font-bold text-fg">
                {t.form.isTeam}
              </span>
              <span className="mt-1 block text-sm leading-6 text-fg/60">
                {t.form.isTeamHint}
              </span>
            </span>
          </label>
        </section>
      )}

      {showTeamSection && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-teal" />
            <h3 className="font-bold text-fg">{t.form.teammates}</h3>
          </div>
          <p className="mb-4 text-sm leading-7 text-fg/65">
            {t.form.teammatesHint}
          </p>

          <div className="mb-4">
            <Input
              label={t.form.teamName}
              name="teamName"
              value={form.teamName}
              onChange={(e) => setForm({ ...form, teamName: e.target.value })}
              error={errors.teamName}
              placeholder={t.form.placeholders.teamName}
              required
            />
          </div>

          <div className="space-y-4">
            {form.members.map((member, index) => (
              <div
                key={index}
                className="rounded-2xl border border-fg/8 bg-[var(--input-bg)] p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-fg">
                    {t.form.teammate} {index + 1}{" "}
                    <span className="font-normal text-fg/50">
                      ({t.form.member} {index + 2})
                    </span>
                  </p>
                  {form.members.length > minTeammates && (
                    <button
                      type="button"
                      onClick={() => removeTeammate(index)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={14} />
                      {t.form.removeTeammate}
                    </button>
                  )}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    label={t.form.memberName}
                    name={`member-name-${index}`}
                    value={member.name}
                    onChange={(e) =>
                      updateMember(index, "name", e.target.value)
                    }
                    placeholder={t.form.placeholders.memberName}
                    required
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
                    required
                  />
                </div>
              </div>
            ))}

            {form.members.length < MAX_TEAMMATES ? (
              <button
                type="button"
                onClick={addTeammate}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-fg/20 bg-[var(--input-bg)] px-4 py-3 text-sm font-bold text-fg transition-colors hover:border-cyan/40 hover:bg-cyan/5"
              >
                <Plus size={16} className="text-teal" />
                {t.form.addTeammate}
                <span className="font-normal text-fg/45">
                  ({form.members.length}/{MAX_TEAMMATES})
                </span>
              </button>
            ) : (
              <p className="rounded-2xl border border-cyan/25 bg-cyan/10 px-4 py-3 text-center text-sm text-fg/70">
                {t.form.teammatesMaxReached}
              </p>
            )}

            {errors.members && (
              <p className="text-sm text-red-400">{errors.members}</p>
            )}
            {errors.memberCount && (
              <p className="text-sm text-red-400">{errors.memberCount}</p>
            )}
          </div>
        </section>
      )}

      <section>
        <Textarea
          label={
            isShowcase ? t.form.projectIdeaShowcase : t.form.projectIdea
          }
          name="projectIdea"
          value={form.projectIdea}
          onChange={(e) => setForm({ ...form, projectIdea: e.target.value })}
          error={errors.projectIdea}
          placeholder={
            isShowcase
              ? t.form.placeholders.projectIdeaShowcase
              : t.form.placeholders.projectIdea
          }
          required
        />
      </section>

      <section>
        <p className="mb-2 text-sm font-semibold text-fg">
          {t.form.projectFile}
          <span className="ms-0.5 text-red-400" aria-hidden>
            *
          </span>
        </p>
        <p className="mb-3 text-sm text-fg/60">{t.form.projectFileHint}</p>
        <input
          ref={fileInputRef}
          type="file"
          name="projectFile"
          accept={EXHIBIT_FILE_ACCEPT}
          className="sr-only"
          onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
        />
        {projectFile ? (
          <div
            className={`flex items-center gap-3 rounded-2xl border px-4 py-3 ${
              errors.projectFile
                ? "border-red-400 bg-red-500/10"
                : "border-cyan/30 bg-cyan/10"
            }`}
          >
            <FileUp size={18} className="shrink-0 text-fg" />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-fg">
                {projectFile.name}
              </p>
              <p className="text-xs text-fg/55">
                {(projectFile.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onFileChange(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
              className="rounded-lg p-2 text-fg/50 hover:bg-fg/10 hover:text-fg"
              aria-label={t.common.cancel}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={`flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-dashed px-4 py-8 transition-colors ${
              errors.projectFile
                ? "border-red-400 bg-red-500/10"
                : "border-fg/20 bg-[var(--input-bg)] hover:border-cyan/40 hover:bg-cyan/5"
            }`}
          >
            <Upload size={22} className="text-teal" />
            <span className="text-sm font-bold text-fg">
              {t.form.projectFile}
            </span>
          </button>
        )}
        {errors.projectFile && (
          <p className="mt-2 text-sm text-red-400">{errors.projectFile}</p>
        )}
      </section>

      {serverMessage && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {serverMessage}
        </div>
      )}

      <div className="border-t border-fg/8 pt-4">
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {t.common.submitting}
            </>
          ) : (
            t.common.submit
          )}
        </Button>
      </div>
    </form>
  );
}
