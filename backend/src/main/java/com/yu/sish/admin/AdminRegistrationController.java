package com.yu.sish.admin;

import com.yu.sish.registration.RegistrationResponse;
import com.yu.sish.shared.PagedResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springdoc.core.annotations.ParameterObject;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/admin/registrations")
@RequiredArgsConstructor
@Tag(name = "Admin — Registrations")
@SecurityRequirement(name = "bearer-jwt")
@ApiResponse(responseCode = "401", description = "No token, or the token expired.")
class AdminRegistrationController {

    private final AdminRegistrationService adminRegistrationService;

    @GetMapping
    @Operation(summary = "List registrations",
            description = "Paginated. Filter by type or status. Sort by id, fullName, email, "
                    + "participationType, status or createdAt — anything else is ignored. "
                    + "Newest first by default.")
    @ApiResponse(responseCode = "200", description = "A page of registrations.")
    ResponseEntity<PagedResponse<RegistrationResponse>> list(

            @Parameter(description = "Filter by type. Leave out for all.")
            @RequestParam(required = false) String participationType,

            @Parameter(description = "Filter by status. Leave out for all.")
            @RequestParam(required = false) String status,

            @ParameterObject Pageable pageable) {

        return ResponseEntity.ok(
                adminRegistrationService.findAll(participationType, status, pageable));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get one registration", description = "Includes team members.")
    @ApiResponse(responseCode = "200", description = "The registration.")
    @ApiResponse(responseCode = "404", description = "No registration with that id.")
    ResponseEntity<RegistrationDetailResponse> getOne(@PathVariable Long id) {
        return ResponseEntity.ok(adminRegistrationService.findById(id));
    }

    @PatchMapping("/{id}/status")
    @Operation(summary = "Update status")
    @ApiResponse(responseCode = "200", description = "The updated registration.")
    @ApiResponse(responseCode = "400",
            description = "Status must be pending, reviewed or accepted.")
    @ApiResponse(responseCode = "404", description = "No registration with that id.")
    ResponseEntity<RegistrationDetailResponse> updateStatus(
            @PathVariable Long id,
            @Valid @RequestBody StatusUpdateRequest request) {

        return ResponseEntity.ok(adminRegistrationService.updateStatus(id, request));
    }

    @GetMapping("/{id}/file")
    @Operation(summary = "Get a download link",
            description = "Returns a link to the file. Download it from there, not from this API.")
    @ApiResponse(responseCode = "200", description = "A link that expires in 15 minutes.")
    @ApiResponse(responseCode = "404", description = "No registration, or no file on it.")
    ResponseEntity<FileUrlResponse> getFileUrl(@PathVariable Long id) {
        return ResponseEntity.ok(adminRegistrationService.getFileUrl(id));
    }
}