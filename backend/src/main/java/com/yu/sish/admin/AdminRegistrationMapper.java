package com.yu.sish.admin;

import com.yu.sish.registration.Registration;
import com.yu.sish.registration.RegistrationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class AdminRegistrationMapper {

    private final RegistrationMapper registrationMapper;

    RegistrationDetailResponse toDetailResponse(Registration r) {
        return new RegistrationDetailResponse(
                r.getId(),
                r.getFullName(),
                r.getEmail(),
                r.getPhone(),
                r.getUniversityId(),
                r.getUniversityName(),
                r.getMajor(),
                r.getParticipationType().toLowerCase(),
                r.getTrack(),
                r.getUniversityYear(),
                r.getGraduationYear(),
                r.getIsTeam(),
                r.getTeamName(),
                r.getProjectIdea(),
                r.getFileOriginalName(),
                r.getFileSizeBytes(),
                r.getStatus().toLowerCase(),
                r.getCreatedAt(),
                registrationMapper.toMemberResponses(r.getMembers()));
    }
}