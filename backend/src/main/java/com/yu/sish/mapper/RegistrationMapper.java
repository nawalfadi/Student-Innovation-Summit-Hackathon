package com.yu.sish.mapper;

import com.yu.sish.dto.response.RegistrationResponse;
import com.yu.sish.dto.response.TeamMemberResponse;
import com.yu.sish.dto.request.RegistrationRequest;
import com.yu.sish.entity.Registration;
import com.yu.sish.entity.TeamMember;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RegistrationMapper {

    public Registration toEntity(RegistrationRequest req) {
        Registration r = new Registration();
        r.setFullName(req.getFullName());
        r.setUniversityId(req.getUniversityId());
        r.setUniversityName(req.getUniversityName());
        r.setEmail(req.getEmail());
        r.setPhone(req.getPhone());
        r.setParticipationType(req.getParticipationType().toUpperCase());
        r.setTrack(req.getTrack());
        r.setIsTeam(req.registeringAsTeam());
        r.setTeamName(req.getTeamName());
        r.setMajor(req.getMajor());
        r.setUniversityYear(req.getUniversityYear());
        r.setGraduationYear(req.getGraduationYear());
        r.setProjectIdea(req.getProjectIdea());
        r.setLocale(req.getLocale() != null ? req.getLocale() : "ar");
        return r;
    }

    public RegistrationResponse toResponse(Registration r) {
        return new RegistrationResponse(
                r.getId(),
                r.getFullName(),
                r.getEmail(),
                r.getParticipationType().toLowerCase(),
                r.getStatus().toLowerCase(),
                r.getCreatedAt()
        );
    }

    public TeamMemberResponse toMemberResponse(TeamMember m) {
        return new TeamMemberResponse(m.getName(), m.getEmail());
    }

    public List<TeamMemberResponse> toMemberResponses(List<TeamMember> members) {
        return members.stream().map(this::toMemberResponse).toList();
    }
}