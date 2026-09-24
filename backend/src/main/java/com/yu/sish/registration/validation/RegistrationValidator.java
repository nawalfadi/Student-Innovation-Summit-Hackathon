package com.yu.sish.registration.validation;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yu.sish.registration.dto.RegistrationRequest;
import com.yu.sish.registration.dto.TeamMemberRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import lombok.RequiredArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Set;
import java.util.regex.Pattern;

@RequiredArgsConstructor
public class RegistrationValidator
        implements ConstraintValidator<ValidRegistration, RegistrationRequest> {

    private final ObjectMapper objectMapper;

    private static final Pattern EMAIL =
            Pattern.compile("^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$");
    private static final Pattern YEAR =
            Pattern.compile("^(19|20)\\d{2}$");

    private static final Set<String> TRACKS =
            Set.of("academic", "campus", "digital");
    private static final Set<String> UNIVERSITY_YEARS =
            Set.of("1", "2", "3", "4", "5+");

    private static final long MAX_FILE_BYTES = 10L * 1024 * 1024;
    private static final Set<String> ALLOWED_MIME = Set.of(
            "application/pdf",
            "application/vnd.ms-powerpoint",
            "application/vnd.openxmlformats-officedocument.presentationml.presentation",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "application/zip",
            "application/x-zip-compressed",
            "image/png",
            "image/jpeg"
    );
    private static final Pattern ALLOWED_EXT =
            Pattern.compile(".*\\.(pdf|ppt|pptx|doc|docx|zip|png|jpe?g)$",
                    Pattern.CASE_INSENSITIVE);

    private static final int MAX_TEAMMATES = 4;
    private static final int MIN_TEAMMATES = 1;

    @Override
    public boolean isValid(RegistrationRequest req, ConstraintValidatorContext ctx) {
        if (req == null) return true;
        ctx.disableDefaultConstraintViolation();
        Violations v = new Violations(ctx);

        validateByParticipationType(req, v);
        validateFile(req.getProjectFile(), v);

        return v.isClean();
    }


    private void validateByParticipationType(RegistrationRequest req, Violations v) {
        if (req.isHackathon()) {
            validateHackathonFields(req, v);
            validateMembers(req, v, true);
        } else if (req.isShowcase()) {
            validateShowcaseFields(req, v);
            if (req.registeringAsTeam()) {
                validateMembers(req, v, true);
            }
        }
    }

    private void validateHackathonFields(RegistrationRequest req, Violations v) {
        if (isBlank(req.getUniversityId())) {
            v.add("universityId", "{validation.universityId}");
        }
        if (req.getTrack() == null || !TRACKS.contains(req.getTrack())) {
            v.add("track", "{validation.track}");
        }
        if (req.getUniversityYear() == null
                || !UNIVERSITY_YEARS.contains(req.getUniversityYear())) {
            v.add("universityYear", "{validation.universityYear}");
        }
    }

    private void validateShowcaseFields(RegistrationRequest req, Violations v) {
        String year = req.getGraduationYear();
        if (year == null || !YEAR.matcher(year).matches()) {
            v.add("graduationYear", "{validation.graduationYear}");
        }
    }


    private void validateMembers(RegistrationRequest req,
                                 Violations v,
                                 boolean requireTeamName) {

        if (requireTeamName && isBlank(req.getTeamName())) {
            v.add("teamName", "{validation.teamName}");
        }

        List<TeamMemberRequest> members;
        try {
            members = parseMembers(req.getMembers());
        } catch (Exception e) {
            v.add("members", "{validation.members}");
            return;
        }

        if (members.size() < MIN_TEAMMATES || members.size() > MAX_TEAMMATES) {
            v.add("memberCount", "{validation.memberCount}");
            return;
        }

        for (TeamMemberRequest m : members) {
            if (isBlank(m.name())) {
                v.add("members", "{validation.membersNames}");
                return;
            }
            if (m.email() == null || !EMAIL.matcher(m.email().trim()).matches()) {
                v.add("members", "{validation.membersEmails}");
                return;
            }
        }
    }

    private List<TeamMemberRequest> parseMembers(String json) throws Exception {
        if (json == null || json.isBlank()) return List.of();
        return objectMapper.readValue(json, new TypeReference<>() {});
    }

    private void validateFile(MultipartFile file, Violations v) {
        if (file == null || file.isEmpty()) {
            v.add("projectFile", "{validation.projectFile}");
            return;
        }
        if (file.getSize() > MAX_FILE_BYTES) {
            v.add("projectFile", "{validation.projectFileSize}");
            return;
        }
        String mime = file.getContentType();
        String name = file.getOriginalFilename();
        boolean mimeOk = mime != null && ALLOWED_MIME.contains(mime);
        boolean extOk  = name != null && ALLOWED_EXT.matcher(name).matches();
        if (!mimeOk && !extOk) {
            v.add("projectFile", "{validation.projectFileType}");
        }
    }

    private static boolean isBlank(String s) {
        return s == null || s.isBlank();
    }

    private static final class Violations {
        private final ConstraintValidatorContext ctx;
        private boolean clean = true;

        Violations(ConstraintValidatorContext ctx) {
            this.ctx = ctx;
        }

        void add(String field, String messageTemplate) {
            ctx.buildConstraintViolationWithTemplate(messageTemplate)
                    .addPropertyNode(field)
                    .addConstraintViolation();
            clean = false;
        }

        boolean isClean() {
            return clean;
        }
    }
}