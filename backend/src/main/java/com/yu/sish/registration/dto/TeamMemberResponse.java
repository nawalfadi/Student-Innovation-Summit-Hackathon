package com.yu.sish.registration.dto;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamMemberResponse(
        @Schema(example = "Sara Ahmed")
        String name,

        @Schema(example = "sara@example.com")
        String email
) {}