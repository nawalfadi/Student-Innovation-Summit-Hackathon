package com.yu.sish.controller;

import com.yu.sish.dto.request.RegistrationRequest;
import com.yu.sish.dto.response.ApiEnvelope;
import com.yu.sish.service.RegistrationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/registrations")
@RequiredArgsConstructor
@Tag(name = "Registrations")
public class RegistrationController {

    private final RegistrationService registrationService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Submit a registration",
            description = "Accepts multipart form data. Required fields depend on participationType.")
    @ApiResponses({
            @ApiResponse(
                    responseCode = "201",
                    description = "Registration accepted.",
                    content = @Content(schema = @Schema(implementation = ApiEnvelope.class))),
            @ApiResponse(
                    responseCode = "400",
                    description = "Validation failed. Errors map is keyed by field name.",
                    content = @Content(schema = @Schema(implementation = ApiEnvelope.class))),
            @ApiResponse(
                    responseCode = "409",
                    description = "This email is already registered for this participationType.",
                    content = @Content(schema = @Schema(implementation = ApiEnvelope.class)))
    })
    public ResponseEntity<ApiEnvelope> register(@Valid @ModelAttribute RegistrationRequest request) {
        var response = registrationService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiEnvelope.ok("Registration received.", response.id()));
    }
}