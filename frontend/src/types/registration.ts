export type TrackId = "academic" | "campus" | "digital";

/** Hackathon competition team, or project showcase without competing. */
export type ParticipationType = "hackathon" | "showcase";

export interface TeamMember {
  name: string;
  email: string;
}

export interface RegistrationPayload {
  fullName: string;
  universityId: string;
  universityName: string;
  email: string;
  phone: string;
  participationType: ParticipationType;
  /** Required for hackathon; omitted for exhibit. */
  track?: TrackId;
  teamName: string;
  /** Total team size including the leader (2–5 = leader + 1–4 teammates). */
  memberCount: number;
  /** Teammates only (1–4); leader is in personal fields. */
  members: TeamMember[];
  /** Exhibit only — registering as a team (vs individual). */
  isTeam?: boolean;
  projectIdea: string;
  /** Academic major (hackathon + exhibit). */
  major?: string;
  /** Hackathon only — current year in university (e.g. "1", "2", "3", "4", "5+"). */
  universityYear?: string;
  /** Exhibit only — graduation year (e.g. "2025"). */
  graduationYear?: string;
  /** Set after server upload. */
  projectFileName?: string;
  projectFileUrl?: string;
  projectFilePath?: string;
}

export interface RegistrationRecord extends RegistrationPayload {
  id?: string;
  createdAt: string;
  status: "pending" | "reviewed" | "accepted";
}

/** Allowed exhibit project upload types and size limit. */
export const EXHIBIT_FILE_MAX_BYTES = 10 * 1024 * 1024; // 10 MB
export const EXHIBIT_FILE_ACCEPT =
  ".pdf,.ppt,.pptx,.doc,.docx,.zip,.png,.jpg,.jpeg";
export const EXHIBIT_FILE_MIME = new Set([
  "application/pdf",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/zip",
  "application/x-zip-compressed",
  "image/png",
  "image/jpeg",
]);
