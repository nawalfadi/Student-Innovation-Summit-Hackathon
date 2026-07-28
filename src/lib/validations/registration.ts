import type { RegistrationPayload } from "@/types/registration";
import { dictionaries, type Locale } from "@/i18n/dictionaries";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^(\+966|0)?5\d{8}$/;

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof RegistrationPayload | "members", string>>;
}

export function validateRegistration(
  data: RegistrationPayload,
  locale: Locale = "ar"
): ValidationResult {
  const v = dictionaries[locale].validation;
  const errors: ValidationResult["errors"] = {};

  if (!data.fullName.trim() || data.fullName.trim().length < 3) {
    errors.fullName = v.fullName;
  }

  if (!data.universityId.trim()) {
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

  if (!["mowajjih", "muhaffiz", "jisr"].includes(data.track)) {
    errors.track = v.track;
  }

  // Solo / "no full team yet" path: skip team-composition requirements
  // entirely rather than forcing someone without teammates to invent one
  // just to get through the form.
  if (!data.needsTeam) {
    if (!data.teamName.trim()) {
      errors.teamName = v.teamName;
    }

    if (data.memberCount < 3 || data.memberCount > 5) {
      errors.memberCount = v.memberCount;
    }

    const filledMembers = data.members.filter(
      (member) => member.name.trim() || member.email.trim()
    );

    if (filledMembers.length !== data.memberCount) {
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

  // A project idea is still encouraged but not required for solo
  // registrants — not having one yet is often exactly why they don't have
  // a team, and demanding 20+ characters here is pure friction.
  if (
    !data.needsTeam &&
    (!data.projectIdea.trim() || data.projectIdea.trim().length < 20)
  ) {
    errors.projectIdea = v.projectIdea;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
