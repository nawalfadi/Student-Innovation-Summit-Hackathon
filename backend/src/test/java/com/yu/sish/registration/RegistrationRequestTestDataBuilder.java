package com.yu.sish.registration;

import com.yu.sish.support.TestFiles;
import org.springframework.web.multipart.MultipartFile;

public class RegistrationRequestTestDataBuilder {

    private String fullName = "Ahmed Qassem";
    private String universityId = "442100123";
    private String universityName = "Al Yamamah University";
    private String email = "ahmed@example.com";
    private String phone = "0512345678";
    private String participationType = "hackathon";
    private String track = "academic";
    private String isTeam = "true";
    private String teamName = "Team Falcon";
    private String major = "Software Engineering";
    private String universityYear = "3";
    private String graduationYear = "";
    private String projectIdea = "A platform that matches students with study groups.";
    private String locale = "ar";
    private String memberCount = "1";
    private String members = """
            [{"name":"Sara Ahmed","email":"sara@example.com"}]""";
    private MultipartFile projectFile = TestFiles.pdf();

    public static RegistrationRequestTestDataBuilder aRegistrationRequest() {
        return new RegistrationRequestTestDataBuilder();
    }

    public static RegistrationRequestTestDataBuilder aShowcaseRequest() {
        return new RegistrationRequestTestDataBuilder()
                .withParticipationType("showcase")
                .withUniversityId("")
                .withTrack("")
                .withUniversityYear("")
                .withGraduationYear("2027")
                .withIsTeam("false")
                .withTeamName("")
                .withMembers("[]")
                .withMemberCount("0");
    }

    public RegistrationRequestTestDataBuilder withFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public RegistrationRequestTestDataBuilder withUniversityId(String universityId) {
        this.universityId = universityId;
        return this;
    }

    public RegistrationRequestTestDataBuilder withUniversityName(String universityName) {
        this.universityName = universityName;
        return this;
    }

    public RegistrationRequestTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public RegistrationRequestTestDataBuilder withPhone(String phone) {
        this.phone = phone;
        return this;
    }

    public RegistrationRequestTestDataBuilder withParticipationType(String participationType) {
        this.participationType = participationType;
        return this;
    }

    public RegistrationRequestTestDataBuilder withTrack(String track) {
        this.track = track;
        return this;
    }

    public RegistrationRequestTestDataBuilder withIsTeam(String isTeam) {
        this.isTeam = isTeam;
        return this;
    }

    public RegistrationRequestTestDataBuilder withTeamName(String teamName) {
        this.teamName = teamName;
        return this;
    }

    public RegistrationRequestTestDataBuilder withMajor(String major) {
        this.major = major;
        return this;
    }

    public RegistrationRequestTestDataBuilder withUniversityYear(String universityYear) {
        this.universityYear = universityYear;
        return this;
    }

    public RegistrationRequestTestDataBuilder withGraduationYear(String graduationYear) {
        this.graduationYear = graduationYear;
        return this;
    }

    public RegistrationRequestTestDataBuilder withProjectIdea(String projectIdea) {
        this.projectIdea = projectIdea;
        return this;
    }

    public RegistrationRequestTestDataBuilder withLocale(String locale) {
        this.locale = locale;
        return this;
    }

    public RegistrationRequestTestDataBuilder withMemberCount(String memberCount) {
        this.memberCount = memberCount;
        return this;
    }

    public RegistrationRequestTestDataBuilder withMembers(String members) {
        this.members = members;
        return this;
    }

    public RegistrationRequestTestDataBuilder withProjectFile(MultipartFile projectFile) {
        this.projectFile = projectFile;
        return this;
    }

    public RegistrationRequest build() {
        RegistrationRequest request = new RegistrationRequest();
        request.setFullName(fullName);
        request.setUniversityId(universityId);
        request.setUniversityName(universityName);
        request.setEmail(email);
        request.setPhone(phone);
        request.setParticipationType(participationType);
        request.setTrack(track);
        request.setIsTeam(isTeam);
        request.setTeamName(teamName);
        request.setMajor(major);
        request.setUniversityYear(universityYear);
        request.setGraduationYear(graduationYear);
        request.setProjectIdea(projectIdea);
        request.setLocale(locale);
        request.setMemberCount(memberCount);
        request.setMembers(members);
        request.setProjectFile(projectFile);
        return request;
    }
}