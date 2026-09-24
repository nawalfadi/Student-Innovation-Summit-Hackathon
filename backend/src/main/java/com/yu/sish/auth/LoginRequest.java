package com.yu.sish.auth;

import io.swagger.v3.oas.annotations.media.Schema;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

public record LoginRequest(
        @Schema(example = "admin", requiredMode = REQUIRED)
        String username,

        @Schema(example = "admin123", requiredMode = REQUIRED)
        String password
) {}