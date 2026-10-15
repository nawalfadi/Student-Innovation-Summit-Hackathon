package com.yu.sish.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

record LoginRequest(
        @NotBlank(message = "{validation.invalidCredentials}")
        @Schema(example = "admin", requiredMode = REQUIRED)
        String username,

        @NotBlank(message = "{validation.invalidCredentials}")
        @Schema(example = "admin123", requiredMode = REQUIRED)
        String password
) {}