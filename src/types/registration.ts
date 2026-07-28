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
  /** True when the registrant doesn't have a full 3-5 person team yet and
   *  is asking to be registered solo / matched later. Relaxes team-related
   *  validation on both client and server. */
  needsTeam?: boolean;
}

export interface RegistrationRecord extends RegistrationPayload {
  id?: string;
  createdAt: string;
  status: "pending" | "reviewed" | "accepted";
}
