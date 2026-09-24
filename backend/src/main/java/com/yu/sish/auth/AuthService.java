package com.yu.sish.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.server.ResponseStatusException;

import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {

    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {
        Assert.notNull(request, "Login request must not be null");
        Assert.hasText(request.username(), "Username must not be blank");
        Assert.hasText(request.password(), "Password must not be blank");
        log.debug("Login attempt for username: {}", request.username());
        Admin admin = findAdminOrThrow(request.username());
        verifyPasswordOrThrow(request.password(), admin);
        log.info("Admin logged in: {}", admin.getUsername());
        return new LoginResponse(jwtUtil.generateToken(admin.getUsername()));
    }

    private Admin findAdminOrThrow(String username) {
        return adminRepository.findAdminByUsername(username)
                .orElseThrow(() -> {
                    log.warn("Login failed — username not found: {}", username);
                    return new ResponseStatusException(UNAUTHORIZED);
                });
    }

    private void verifyPasswordOrThrow(String rawPassword, Admin admin) {
        if (!passwordEncoder.matches(rawPassword, admin.getPasswordHash())) {
            log.warn("Login failed — wrong password for username: {}", admin.getUsername());
            throw new ResponseStatusException(UNAUTHORIZED);
        }
    }
}
