package com.yu.sish.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

public record LoginResponse(
        @Schema(description = "Bearer token. Valid for 60 minutes.")
        String token
) {}