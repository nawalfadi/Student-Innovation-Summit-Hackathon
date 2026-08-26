package com.yu.sish.controller;

import com.yu.sish.dto.response.RegistrationResponse;
import com.yu.sish.service.RegistrationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/admin/registrations")
@RequiredArgsConstructor
public class AdminRegistrationController {
    private final RegistrationService registrationService;

    @GetMapping
    public ResponseEntity<List<RegistrationResponse>> getRegistrations(){
        return ResponseEntity.ok(registrationService.findAll());
    }
}
