package com.yu.sish.controller;

import com.yu.sish.registration.dto.RegistrationResponse;
import com.yu.sish.registration.RegistrationService;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/registrations")
@RequiredArgsConstructor
@Tag(name = "Admin — Registrations")
@SecurityRequirement(name = "bearer-jwt")
@ApiResponse(responseCode = "401",
        description = "Missing, malformed or expired admin token. No response body.")
public class AdminRegistrationController {
    private final RegistrationService registrationService;

    @GetMapping
    public ResponseEntity<List<RegistrationResponse>> getRegistrations(){
        return ResponseEntity.ok(registrationService.findAll());
    }
}
