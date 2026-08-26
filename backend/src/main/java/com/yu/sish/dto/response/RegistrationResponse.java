package com.yu.sish.dto.response;

import java.time.OffsetDateTime;

public record RegistrationResponse(
        Long id,
        String fullName,
        String email,
        String participationType,
        String status,
        OffsetDateTime createdAt
) {}