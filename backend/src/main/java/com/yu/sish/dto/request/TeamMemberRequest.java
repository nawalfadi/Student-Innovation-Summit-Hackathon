package com.yu.sish.dto.request;

import io.swagger.v3.oas.annotations.media.Schema;

public record TeamMemberRequest(
        @Schema(example = "Sara Ahmed")
        String name,

        @Schema(example = "sara@example.com")
        String email
) {}