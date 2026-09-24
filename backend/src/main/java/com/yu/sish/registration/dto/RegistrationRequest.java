package com.yu.sish.registration.dto;

import com.yu.sish.registration.validation.ValidRegistration;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

@Getter
@Setter
@ValidRegistration
public class RegistrationRequest {

    @NotBlank(message = "{validation.fullName}")
    @Size(min = 3, message = "{validation.fullName}")
    @Schema(example = "Ahmed Qassem", requiredMode = REQUIRED)
    private String fullName;

    @NotBlank(message = "{validation.universityName}")
    @Schema(example = "Al Yamamah University", requiredMode = REQUIRED)
    private String universityName;

    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "{validation.email}")
    @Schema(description = "Lowercased on receipt. Unique per participationType.",
            example = "ahmed@example.com", requiredMode = REQUIRED)
    private String email;

    @Pattern(regexp = "^(\\+966|0)?5\\d{8}$", message = "{validation.phone}")
    @Schema(description = "Saudi mobile. Spaces and hyphens stripped.",
            example = "0512345678", requiredMode = REQUIRED)
    private String phone;

    @Pattern(regexp = "hackathon|showcase", message = "{validation.participationType}")
    @Schema(allowableValues = {"hackathon", "showcase"}, requiredMode = REQUIRED)
    private String participationType;

    @NotBlank(message = "{validation.projectIdea}")
    @Size(min = 20, message = "{validation.projectIdea}")
    @Schema(minLength = 20, requiredMode = REQUIRED)
    private String projectIdea;

    @NotBlank(message = "{validation.major}")
    @Size(min = 2, message = "{validation.major}")
    @Schema(example = "Software Engineering", requiredMode = REQUIRED)
    private String major;

    @Pattern(regexp = "ar|en", message = "{validation.locale}")
    @Schema(allowableValues = {"ar", "en"}, defaultValue = "ar")
    private String locale;

    @Schema(description = "Max 10MB. PDF, PPT, PPTX, DOC, DOCX, ZIP, PNG, JPG.",
            requiredMode = REQUIRED, type = "string", format = "binary")
    private MultipartFile projectFile;

    @Schema(description = "Hackathon only.", example = "442100123")
    private String universityId;

    @Schema(description = "Hackathon only.",
            allowableValues = {"academic", "campus", "digital"})
    private String track;

    @Schema(description = "Hackathon only.", allowableValues = {"1", "2", "3", "4", "5+"})
    private String universityYear;

    @Schema(description = "Showcase only.", example = "2027")
    private String graduationYear;

    @Schema(description = "Always true for hackathon.", example = "true")
    private String isTeam;

    @Schema(description = "Required for teams.", example = "Team Falcon")
    private String teamName;

    @Schema(description = "JSON array of 1-4 teammates, excluding the registrant.",
            example = "[{\"name\":\"Sara\",\"email\":\"sara@example.com\"}]")
    private String members;

    @Schema(description = "Ignored. Recomputed server-side.")
    private String memberCount;

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