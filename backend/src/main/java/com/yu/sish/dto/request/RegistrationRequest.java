package com.yu.sish.dto.request;

import com.yu.sish.validation.ValidRegistration;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@ValidRegistration
public class RegistrationRequest {
    @NotBlank(message = "{validation.fullName}")
    @Size(min = 3, message = "{validation.fullName}")
    private String fullName;

    @NotBlank(message = "{validation.universityName}")
    private String universityName;

    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
            message = "{validation.email}")
    private String email;

    @Pattern(regexp = "^(\\+966|0)?5\\d{8}$",
            message = "{validation.phone}")
    private String phone;

    @Pattern(regexp = "hackathon|showcase",
            message = "{validation.participationType}")
    private String participationType;

    @NotBlank(message = "{validation.projectIdea}")
    @Size(min = 20, message = "{validation.projectIdea}")
    private String projectIdea;

    @NotBlank(message = "{validation.major}")
    @Size(min = 2, message = "{validation.major}")
    private String major;

    @Pattern(regexp = "ar|en", message = "{validation.locale}")
    private String locale;

    private String universityId;
    private String track;
    private String universityYear;
    private String graduationYear;
    private String teamName;
    private String isTeam;
    private String memberCount;
    private String members;

    private MultipartFile projectFile;


    public void setEmail(String email) {
        this.email = email == null ? null : email.trim().toLowerCase();
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.replaceAll("[\\s-]", "");
    }

    public void setFullName(String fullName) {
        this.fullName = trimOrNull(fullName);
    }

    public void setUniversityName(String universityName) {
        this.universityName = trimOrNull(universityName);
    }

    public void setProjectIdea(String projectIdea) {
        this.projectIdea = trimOrNull(projectIdea);
    }

    public void setMajor(String major) {
        this.major = trimOrNull(major);
    }

    public void setTeamName(String teamName) {
        this.teamName = trimOrNull(teamName);
    }

    public void setUniversityId(String universityId) {
        this.universityId = blankToNull(universityId);
    }

    public void setTrack(String track) {
        this.track = blankToNull(track);
    }

    public void setUniversityYear(String universityYear) {
        this.universityYear = blankToNull(universityYear);
    }

    public void setGraduationYear(String graduationYear) {
        this.graduationYear = blankToNull(graduationYear);
    }

    private static String trimOrNull(String s) {
        return s == null ? null : s.trim();
    }

    private static String blankToNull(String s) {
        if (s == null) return null;
        String t = s.trim();
        return t.isEmpty() ? null : t;
    }

    public boolean isHackathon() {
        return "hackathon".equals(participationType);
    }

    public boolean isShowcase() {
        return "showcase".equals(participationType);
    }

    public boolean registeringAsTeam() {
        return isHackathon() || "true".equals(isTeam);
    }
}
