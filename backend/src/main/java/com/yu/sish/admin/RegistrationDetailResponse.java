package com.yu.sish.admin;

import com.yu.sish.registration.TeamMemberResponse;
import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;
import java.util.List;

record RegistrationDetailResponse(

        Long id,
        String fullName,
        String email,
        String phone,
        String universityId,
        String universityName,
        String major,

        @Schema(allowableValues = {"hackathon", "showcase"})
        String participationType,

        @Schema(allowableValues = {"academic", "campus", "digital"})
        String track,

        String universityYear,
        String graduationYear,
        Boolean isTeam,
        String teamName,
        String projectIdea,

        @Schema(description = "The filename they uploaded.")
        String fileOriginalName,

        Long fileSizeBytes,

        @Schema(allowableValues = {"pending", "reviewed", "accepted"})
        String status,

        OffsetDateTime createdAt,

        List<TeamMemberResponse> members
) {}