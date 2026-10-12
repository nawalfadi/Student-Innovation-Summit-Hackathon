package com.yu.sish.registration;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class RegistrationTestDataBuilder {

    private Long id = 1L;
    private String fullName = "Ahmed Qassem";
    private String universityId = "442100123";
    private String universityName = "Al Yamamah University";
    private String email = "ahmed@example.com";
    private String phone = "0512345678";
    private String participationType = "HACKATHON";
    private String track = "academic";
    private Boolean isTeam = true;
    private String teamName = "Team Falcon";
    private String major = "Software Engineering";
    private String universityYear = "3";
    private String graduationYear = null;
    private String projectIdea = "A platform that matches students with study groups.";
    private String fileObjectKey = "registrations/11111111-2222-3333-4444-555555555555_proposal.pdf";
    private String fileOriginalName = "proposal.pdf";
    private String fileContentType = "application/pdf";
    private Long fileSizeBytes = 2048L;
    private String locale = "ar";
    private String status = "PENDING";
    private OffsetDateTime createdAt = OffsetDateTime.parse("2026-10-01T10:00:00+03:00");
    private List<TeamMember> members = new ArrayList<>();

    public static RegistrationTestDataBuilder aRegistration() {
        return new RegistrationTestDataBuilder();
    }

    public static RegistrationTestDataBuilder aShowcaseRegistration() {
        return new RegistrationTestDataBuilder()
                .withParticipationType("SHOWCASE")
                .withUniversityId(null)
                .withTrack(null)
                .withUniversityYear(null)
                .withGraduationYear("2027")
                .withIsTeam(false)
                .withTeamName(null);
    }

    public RegistrationTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public RegistrationTestDataBuilder withFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public RegistrationTestDataBuilder withUniversityId(String universityId) {
        this.universityId = universityId;
        return this;
    }

    public RegistrationTestDataBuilder withUniversityName(String universityName) {
        this.universityName = universityName;
        return this;
    }

    public RegistrationTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public RegistrationTestDataBuilder withPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public RegistrationTestDataBuilder withParticipationType(String participationType) {
        this.participationType = participationType;
        return this;
    }

    public RegistrationTestDataBuilder withTrack(String track) {
        this.track = track;
        return this;
    }

    public RegistrationTestDataBuilder withIsTeam(Boolean isTeam) {
        this.isTeam = isTeam;
        return this;
    }

    public RegistrationTestDataBuilder withTeamName(String teamName) {
        this.teamName = teamName;
        return this;
    }

    public RegistrationTestDataBuilder withMajor(String major) {
        this.major = major;
        return this;
    }

    public RegistrationTestDataBuilder withUniversityYear(String universityYear) {
        this.universityYear = universityYear;
        return this;
    }

    public RegistrationTestDataBuilder withGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
        return this;
    }

    public RegistrationTestDataBuilder withProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
        return this;
    }

    public RegistrationTestDataBuilder withFileObjectKey(String fileObjectKey) {
        this.fileObjectKey = fileObjectKey;
        return this;
    }

    public RegistrationTestDataBuilder withFileOriginalName(String fileOriginalName) {
        this.fileOriginalName = fileOriginalName;
        return this;
    }

    public RegistrationTestDataBuilder withFileSizeBytes(Long fileSizeBytes) {
        this.fileSizeBytes = fileSizeBytes;
        return this;
    }

    public RegistrationTestDataBuilder withLocale(String locale) {
        this.locale = locale;
        return this;
    }

    public RegistrationTestDataBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public RegistrationTestDataBuilder withCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public RegistrationTestDataBuilder withMembers(TeamMember... members) {
        this.members = new ArrayList<>(Arrays.asList(members));
        return this;
    }

    public RegistrationTestDataBuilder withNoMembers() {
        this.members = new ArrayList<>();
        return this;
    }

    public Registration build() {
        Registration registration = new Registration();
        registration.setId(id);
        registration.setFullName(fullName);
        registration.setUniversityId(universityId);
        registration.setUniversityName(universityName);
        registration.setEmail(email);
        registration.setPhone(phone);
        registration.setParticipationType(participationType);
        registration.setTrack(track);
        registration.setIsTeam(isTeam);
        registration.setTeamName(teamName);
        registration.setMajor(major);
        registration.setUniversityYear(universityYear);
        registration.setGraduationYear(graduationYear);
        registration.setProjectIdea(projectIdea);
        registration.setFileObjectKey(fileObjectKey);
        registration.setFileOriginalName(fileOriginalName);
        registration.setFileContentType(fileContentType);
        registration.setFileSizeBytes(fileSizeBytes);
        registration.setLocale(locale);
        registration.setStatus(status);
        registration.setCreatedAt(createdAt);
        members.forEach(member -> member.setRegistration(registration));
        registration.setMembers(members);
        return registration;
    }
}