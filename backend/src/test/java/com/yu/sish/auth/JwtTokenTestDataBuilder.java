package com.yu.sish.auth;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

public class JwtTokenTestDataBuilder {

    public static final String SECRET =
            "test-jwt-secret-key-at-least-32-bytes-long-for-hs256";

    public static final String OUTSIDER_SECRET =
            "an-entirely-different-secret-key-that-the-api-does-not-trust";

    private String subject = "admin";
    private Instant issuedAt = Instant.now();
    private Instant expiresAt = Instant.now().plus(60, ChronoUnit.MINUTES);
    private String signingSecret = SECRET;

    public static JwtTokenTestDataBuilder anAdminToken() {
        return new JwtTokenTestDataBuilder();
    }

    public static JwtTokenTestDataBuilder anExpiredToken() {
        return new JwtTokenTestDataBuilder()
                .issuedAt(Instant.now().minus(2, ChronoUnit.HOURS))
                .expiringAt(Instant.now().minus(1, ChronoUnit.HOURS));
    }

    public static JwtTokenTestDataBuilder aTokenSignedByAnOutsider() {
        return new JwtTokenTestDataBuilder().signedWith(OUTSIDER_SECRET);
    }

    public JwtTokenTestDataBuilder withSubject(String subject) {
        this.subject = subject;
        return this;
    }

    public JwtTokenTestDataBuilder issuedAt(Instant issuedAt) {
        this.issuedAt = issuedAt;
        return this;
    }

    public JwtTokenTestDataBuilder expiringAt(Instant expiresAt) {
        this.expiresAt = expiresAt;
        return this;
    }

    public JwtTokenTestDataBuilder signedWith(String signingSecret) {
        this.signingSecret = signingSecret;
        return this;
    }

    public String build() {
        return Jwts.builder()
                .subject(subject)
                .issuedAt(Date.from(issuedAt))
                .expiration(Date.from(expiresAt))
                .signWith(Keys.hmacShaKeyFor(signingSecret.getBytes(StandardCharsets.UTF_8)))
                .compact();
    }

    public String asHeader() {
        return "Bearer " + build();
    }
}