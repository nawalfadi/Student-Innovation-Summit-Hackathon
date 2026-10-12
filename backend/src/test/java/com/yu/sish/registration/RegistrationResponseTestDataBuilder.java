package com.yu.sish.registration;

import java.time.OffsetDateTime;

public class RegistrationResponseTestDataBuilder {

    private Long id = 42L;
    private String fullName = "Ahmed Qassem";
    private String email = "ahmed@example.com";
    private String participationType = "hackathon";
    private String status = "pending";
    private OffsetDateTime createdAt = OffsetDateTime.parse("2026-10-01T10:00:00+03:00");

    public static RegistrationResponseTestDataBuilder aRegistrationResponse() {
        return new RegistrationResponseTestDataBuilder();
    }

    public RegistrationResponseTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public RegistrationResponseTestDataBuilder withFullName(String fullName) {
        this.fullName = fullName;
        return this;
    }

    public RegistrationResponseTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public RegistrationResponseTestDataBuilder withParticipationType(String participationType) {
        this.participationType = participationType;
        return this;
    }

    public RegistrationResponseTestDataBuilder withStatus(String status) {
        this.status = status;
        return this;
    }

    public RegistrationResponseTestDataBuilder withCreatedAt(OffsetDateTime createdAt) {
        this.createdAt = createdAt;
        return this;
    }

    public RegistrationResponse build() {
        return new RegistrationResponse(
                id, fullName, email, participationType, status, createdAt);
    }
}