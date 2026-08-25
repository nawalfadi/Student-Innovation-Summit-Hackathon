package com.yu.sish.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yu.sish.dto.request.RegistrationRequest;
import com.yu.sish.dto.request.TeamMemberRequest;
import com.yu.sish.dto.response.RegistrationResponse;
import com.yu.sish.entity.Registration;
import com.yu.sish.entity.TeamMember;
import com.yu.sish.mapper.RegistrationMapper;
import com.yu.sish.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository registrationRepository;
    private final RegistrationMapper registrationMapper;
    private final ObjectMapper objectMapper;

    @Transactional
    public RegistrationResponse register(RegistrationRequest request) {
        Assert.notNull(request, "Registration request must not be null");

        log.debug("Registering — type: {}, email: {}",
                request.getParticipationType(), request.getEmail());

        Registration registration = registrationMapper.toEntity(request);
        attachMembers(registration, request);

        Registration saved = registrationRepository.save(registration);

        log.info("Registration saved — id: {}, email: {}, type: {}",
                saved.getId(), saved.getEmail(), saved.getParticipationType());

        return registrationMapper.toResponse(saved);
    }

    private void attachMembers(Registration registration, RegistrationRequest request) {
        List<TeamMemberRequest> parsed = parseMembers(request.getMembers());

        List<TeamMember> members = parsed.stream()
                .map(this::toTeamMember)
                .toList();

        for (int i = 0; i < members.size(); i++) {
            TeamMember member = members.get(i);
            member.setMemberOrder(i);
            member.setRegistration(registration);
            registration.getMembers().add(member);
        }
    }

    private TeamMember toTeamMember(TeamMemberRequest req) {
        TeamMember member = new TeamMember();
        member.setName(req.name().trim());
        member.setEmail(req.email().trim().toLowerCase());
        return member;
    }

    private List<TeamMemberRequest> parseMembers(String json) {
        if (json == null || json.isBlank()) {
            return List.of();
        }
        try {
            return objectMapper.readValue(json, new TypeReference<>() {});
        } catch (Exception e) {
            log.warn("Failed to parse members JSON: {}", json);
            return List.of();
        }
    }
}