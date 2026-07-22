export type TrackId = "mowajjih" | "muhaffiz" | "jisr";

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
  track: TrackId;
  teamName: string;
  memberCount: number;
  members: TeamMember[];
  projectIdea: string;
}

export interface RegistrationRecord extends RegistrationPayload {
  id?: string;
  createdAt: string;
  status: "pending" | "reviewed" | "accepted";
}
