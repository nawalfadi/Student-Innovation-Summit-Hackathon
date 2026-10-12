package com.yu.sish.admin;

import com.yu.sish.registration.TeamMemberResponse;

import java.time.OffsetDateTime;
import java.util.Arrays;
import java.util.List;

public class RegistrationDetailResponseTestDataBuilder {

    private Long id = 42L;
    private String fullName = "Ahmed Qassem";
    private String email = "ahmed@example.com";
    private String phone = "0512345678";
    private String universityId = "442100123";
    private String universityName = "Al Yamamah University";
    private String major = "Software Engineering";
    private String participationType = "hackathon";
    private String track = "academic";
    private String universityYear = "3";
    private String graduationYear = null;
    private Boolean isTeam = true;
    private String teamName = "Team Falcon";
    private String projectIdea = "A platform that matches students with study groups.";
    private String fileOriginalName = "proposal.pdf";
    private Long fileSizeBytes = 2048L;
    private String status = "pending";
    private OffsetDateTime createdAt = OffsetDateTime.parse("2026-10-01T10:00:00+03:00");
    private List<TeamMemberResponse> members = List.of();

    public static RegistrationDetailResponseTestDataBuilder aRegistrationDetail() {
        return new RegistrationDetailResponseTestDataBuilder();
    }

    public static RegistrationDetailResponseTestDataBuilder aShowcaseDetail() {
        return new RegistrationDetailResponseTestDataBuilder()
                .withParticipationType("showcase")
                .withUniversityId(null)
                .withTrack(null)
                .withUniversityYear(null)
                .withGraduationYear("2027")
                .withIsTeam(false)
                .withTeamName(null);
    }

    public RegistrationDetailResponseTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withUniversityId(String universityId) {
        this.universityId = universityId;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withUniversityName(String universityName) {
        this.universityName = universityName;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withMajor(String major) {
        this.major = major;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withParticipationType(String participationType) {
        this.participationType = participationType;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withTrack(String track) {
        this.track = track;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withUniversityYear(String universityYear) {
        this.universityYear = universityYear;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withIsTeam(Boolean isTeam) {
        this.isTeam = isTeam;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withTeamName(String teamName) {
        this.teamName = teamName;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withFileOriginalName(String fileOriginalName) {
        this.fileOriginalName = fileOriginalName;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withFileSizeBytes(Long fileSizeBytes) {
        this.fileSizeBytes = fileSizeBytes;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public RegistrationDetailResponseTestDataBuilder withMembers(TeamMemberResponse... members) {
        this.members = Arrays.asList(members);
        return this;
    }

    public RegistrationDetailResponse build() {
        return new RegistrationDetailResponse(
                id, fullName, email, phone, universityId, universityName, major,
                participationType, track, universityYear, graduationYear, isTeam,
                teamName, projectIdea, fileOriginalName, fileSizeBytes, status,
                createdAt, members);
    }
}