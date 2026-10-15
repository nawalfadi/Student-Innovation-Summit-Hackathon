package com.yu.sish.admin;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

import static io.swagger.v3.oas.annotations.media.Schema.RequiredMode.REQUIRED;

record StatusUpdateRequest(

        @NotBlank(message = "{validation.status}")
        @Pattern(regexp = "pending|reviewed|accepted", message = "{validation.status}")
        @Schema(allowableValues = {"pending", "reviewed", "accepted"}, requiredMode = REQUIRED)
        String status
) {}