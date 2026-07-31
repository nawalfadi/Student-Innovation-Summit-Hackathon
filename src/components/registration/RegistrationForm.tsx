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
  return {
    fullName: "",
    universityId: "",
    universityName: "",
    email: "",
    phone: "",
    participationType,
    track: participationType === "hackathon" ? "academic" : undefined,
    teamName: "",
    memberCount: MIN_TEAMMATES + 1,
    members: Array.from({ length: MIN_TEAMMATES }, () => emptyMember()),
    projectIdea: "",
    major: "",
    universityYear: "",
    graduationYear: "",
  };
}

interface RegistrationFormProps {
  participationType: ParticipationType;
  onBack: () => void;
}

export function RegistrationForm({
  participationType,
  onBack,
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
    if (form.members.length <= MIN_TEAMMATES) return;
    const members = form.members.filter((_, i) => i !== index);
    setForm({ ...form, members, memberCount: members.length + 1 });
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

    if (isShowcase) {
      const fileError = validateLocalFile(projectFile);
      if (fileError) {
        setErrors({ projectFile: fileError });
        setSubmitting(false);
        return;
      }
    }

    try {
      let response: Response;

      if (isShowcase && projectFile) {
        const fd = new FormData();
        fd.append("fullName", form.fullName);
        fd.append("universityId", form.universityId);
        fd.append("universityName", form.universityName);
        fd.append("email", form.email);
        fd.append("phone", form.phone);
        fd.append("participationType", "showcase");
        fd.append("teamName", "");
        fd.append("memberCount", "1");
        fd.append("members", JSON.stringify([]));
        fd.append("projectIdea", form.projectIdea);
        fd.append("major", form.major ?? "");
        fd.append("graduationYear", form.graduationYear ?? "");
        fd.append("locale", locale);
        fd.append("projectFile", projectFile);
        response = await fetch("/api/register", {
          method: "POST",
          body: fd,
        });
      } else {
        response = await fetch("/api/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...form,
            participationType,
            memberCount: form.members.length + 1,
            locale,
          }),
        });
      }

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
          <CheckCircle2 size={40} className="text-navy" />
        </div>
        <h3 className="text-2xl font-bold text-navy">{t.form.successTitle}</h3>
        <p className="mx-auto mt-4 max-w-md leading-8 text-navy/70">
          {serverMessage}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="btn-shine group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-navy px-6 py-3 text-base font-bold text-white shadow-[0_8px_24px_rgba(27,54,93,0.25)] transition-[background-color,box-shadow] duration-200 hover:bg-navy-light hover:shadow-[0_12px_32px_rgba(27,54,93,0.3)]"
          >
            {t.registerPage.backHome}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section>
        <div className="mb-4 flex items-center gap-2">
          <UserPlus size={18} className="text-gold" />
          <h3 className="font-bold text-navy">
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

      {!isShowcase && (
        <section>
          <div className="mb-4 flex items-center gap-2">
            <Users size={18} className="text-gold" />
            <h3 className="font-bold text-navy">{t.form.teammates}</h3>
          </div>
          <p className="mb-4 text-sm leading-7 text-navy/65">
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
                className="rounded-2xl border border-navy/8 bg-white/60 p-4"
              >
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-navy">
                    {t.form.teammate} {index + 1}{" "}
                    <span className="font-normal text-navy/50">
                      ({t.form.member} {index + 2})
                    </span>
                  </p>
                  {form.members.length > MIN_TEAMMATES && (
                    <button
                      type="button"
                      onClick={() => removeTeammate(index)}
                      className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs font-semibold text-red-600 hover:bg-red-50"
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
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-navy/20 bg-white/40 px-4 py-3 text-sm font-bold text-navy transition-colors hover:border-cyan/40 hover:bg-cyan/5"
              >
                <Plus size={16} className="text-gold" />
                {t.form.addTeammate}
                <span className="font-normal text-navy/45">
                  ({form.members.length}/{MAX_TEAMMATES})
                </span>
              </button>
            ) : (
              <p className="rounded-2xl border border-cyan/25 bg-cyan/10 px-4 py-3 text-center text-sm text-navy/70">
                {t.form.teammatesMaxReached}
              </p>
            )}

            {errors.members && (
              <p className="text-sm text-red-600">{errors.members}</p>
            )}
            {errors.memberCount && (
              <p className="text-sm text-red-600">{errors.memberCount}</p>
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

      {isShowcase && (
        <section>
          <p className="mb-2 text-sm font-semibold text-navy">
            {t.form.projectFile}
            <span className="ms-0.5 text-red-500" aria-hidden>
              *
            </span>
          </p>
          <p className="mb-3 text-sm text-navy/60">{t.form.projectFileHint}</p>
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
                  ? "border-red-400 bg-red-50"
                  : "border-cyan/30 bg-cyan/10"
              }`}
            >
              <FileUp size={18} className="shrink-0 text-navy" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-navy">
                  {projectFile.name}
                </p>
                <p className="text-xs text-navy/55">
                  {(projectFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  onFileChange(null);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="rounded-lg p-2 text-navy/50 hover:bg-white/70 hover:text-navy"
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
                  ? "border-red-400 bg-red-50"
                  : "border-navy/20 bg-white/50 hover:border-cyan/40 hover:bg-cyan/5"
              }`}
            >
              <Upload size={22} className="text-gold" />
              <span className="text-sm font-bold text-navy">
                {t.form.projectFile}
              </span>
            </button>
          )}
          {errors.projectFile && (
            <p className="mt-2 text-sm text-red-600">{errors.projectFile}</p>
          )}
        </section>
      )}

      {serverMessage && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {serverMessage}
        </div>
      )}

      <div className="flex flex-col gap-3 border-t border-navy/8 pt-4 sm:flex-row">
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
          onClick={onBack}
          disabled={submitting}
        >
          {t.registerPage.backToChoice}
        </Button>
      </div>
    </form>
  );
}
