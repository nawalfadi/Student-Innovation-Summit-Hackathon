import type { RegistrationPayload } from "@/types/registration";
import {
  EXHIBIT_FILE_MAX_BYTES,
  EXHIBIT_FILE_MIME,
} from "@/types/registration";
import { dictionaries, type Locale } from "@/i18n/dictionaries";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+966|0)?5\d{8}$/;
const yearRegex = /^(19|20)\d{2}$/;
const universityYearValues = new Set(["1", "2", "3", "4", "5+"]);

export interface ValidationResult {
  valid: boolean;
  errors: Partial<
    Record<keyof RegistrationPayload | "members" | "projectFile", string>
  >;
}

function validateMembers(
  data: RegistrationPayload,
  v: (typeof dictionaries)["ar"]["validation"],
  errors: ValidationResult["errors"],
  opts: { requireTeamName: boolean; minTeammates: number }
) {
  if (opts.requireTeamName && !data.teamName.trim()) {
    errors.teamName = v.teamName;
  }

  const teammateCount = data.members.length;
  const totalSize = teammateCount + 1;

  if (
    teammateCount < opts.minTeammates ||
    teammateCount > 4 ||
    data.memberCount !== totalSize
  ) {
    errors.memberCount = v.memberCount;
  }

  const filledMembers = data.members.filter(
    (member) => member.name.trim() || member.email.trim()
  );

  if (filledMembers.length !== teammateCount) {
    errors.members = v.members;
  }

  for (const member of filledMembers) {
    if (!member.name.trim()) {
      errors.members = v.membersNames;
      break;
    }
    if (!emailRegex.test(member.email.trim())) {
      errors.members = v.membersEmails;
      break;
    }
  }
}

export function validateRegistration(
  data: RegistrationPayload,
  locale: Locale = "ar",
  options?: { hasProjectFile?: boolean; projectFile?: File | null }
): ValidationResult {
  const v = dictionaries[locale].validation;
  const errors: ValidationResult["errors"] = {};
  const isShowcase = data.participationType === "showcase";

  if (!data.fullName.trim() || data.fullName.trim().length < 3) {
    errors.fullName = v.fullName;
  }

  // University ID is required for hackathon only (removed from exhibit form).
  if (!isShowcase && !data.universityId.trim()) {
    errors.universityId = v.universityId;
  }

  if (!data.universityName.trim()) {
    errors.universityName = v.universityName;
  }

  if (!emailRegex.test(data.email.trim())) {
    errors.email = v.email;
  }

  const normalizedPhone = data.phone.replace(/\s|-/g, "");
  if (!phoneRegex.test(normalizedPhone)) {
    errors.phone = v.phone;
  }

  if (!["hackathon", "showcase"].includes(data.participationType)) {
    errors.participationType = v.participationType;
  }

  if (!data.major?.trim() || data.major.trim().length < 2) {
    errors.major = v.major;
  }

  if (!isShowcase) {
    if (!data.track || !["academic", "campus", "digital"].includes(data.track)) {
      errors.track = v.track;
    }
    if (
      !data.universityYear?.trim() ||
      !universityYearValues.has(data.universityYear.trim())
    ) {
      errors.universityYear = v.universityYear;
    }
    validateMembers(data, v, errors, {
      requireTeamName: true,
      minTeammates: 1,
    });
  }

  if (isShowcase) {
    if (
      !data.graduationYear?.trim() ||
      !yearRegex.test(data.graduationYear.trim())
    ) {
      errors.graduationYear = v.graduationYear;
    }

    if (data.isTeam) {
      validateMembers(data, v, errors, {
        requireTeamName: true,
        minTeammates: 1,
      });
    }
  }

  {
    const file = options?.projectFile;
    const hasFile = options?.hasProjectFile ?? Boolean(file && file.size > 0);
    if (!hasFile) {
      errors.projectFile = v.projectFile;
    } else if (file) {
      if (file.size > EXHIBIT_FILE_MAX_BYTES) {
        errors.projectFile = v.projectFileSize;
      } else if (file.type && !EXHIBIT_FILE_MIME.has(file.type)) {
        const name = file.name.toLowerCase();
        const okExt = /\.(pdf|ppt|pptx|doc|docx|zip|png|jpe?g)$/.test(name);
        if (!okExt) {
          errors.projectFile = v.projectFileType;
        }
      }
    }
  }

  if (!data.projectIdea.trim() || data.projectIdea.trim().length < 20) {
    errors.projectIdea = v.projectIdea;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
