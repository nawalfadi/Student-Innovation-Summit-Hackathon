package com.yu.sish.registration;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.OffsetDateTime;

public record RegistrationResponse(
        @Schema(example = "42")
        Long id,

        @Schema(example = "Ahmed Qassem")
        String fullName,

        @Schema(example = "ahmed@example.com")
        String email,

        @Schema(allowableValues = {"hackathon", "showcase"})
        String participationType,

        @Schema(allowableValues = {"pending", "reviewed", "accepted"})
        String status,

        OffsetDateTime createdAt
) {}