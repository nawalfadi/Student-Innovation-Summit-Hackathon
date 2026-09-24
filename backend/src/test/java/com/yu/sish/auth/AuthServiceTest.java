package com.yu.sish.auth;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

import static com.yu.sish.auth.AdminTestDataBuilder.anAdmin;
import static com.yu.sish.util.dto.request.LoginRequestTestDataBuilder.aLoginRequest;
import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.assertj.core.api.AssertionsForClassTypes.assertThatThrownBy;
import static org.mockito.Mockito.*;
import static org.springframework.http.HttpStatus.UNAUTHORIZED;

@ExtendWith(MockitoExtension.class)
class AuthServiceTest {

    @Mock
    private AdminRepository adminRepository;
    @Mock private BCryptPasswordEncoder passwordEncoder;
    @Mock private JwtUtil jwtUtil;

    @InjectMocks
    private AuthService authService;

    @Test
    void login_shouldThrow_whenRequestIsNull() {
        assertThatThrownBy(() -> authService.login(null))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(adminRepository, passwordEncoder, jwtUtil);
    }

    @Test
    void login_shouldThrow_whenUsernameIsBlank() {
        LoginRequest request = aLoginRequest().withUsername("").build();

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(adminRepository, passwordEncoder, jwtUtil);
    }

    @Test
    void login_shouldThrow_whenPasswordIsBlank() {
        LoginRequest request = aLoginRequest().withPassword("").build();

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(IllegalArgumentException.class);
        verifyNoInteractions(adminRepository, passwordEncoder, jwtUtil);
    }

    @Test
    void login_shouldThrow401_whenUsernameNotFound() {
        LoginRequest request = aLoginRequest().withUsername("unknown").build();
        when(adminRepository.findAdminByUsername("unknown")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(
                        ((ResponseStatusException) ex).getStatusCode())
                        .isEqualTo(UNAUTHORIZED));

        verify(adminRepository).findAdminByUsername("unknown");
        verifyNoInteractions(passwordEncoder, jwtUtil);
    }

    @Test
    void login_shouldThrow401_whenPasswordIsWrong() {
        Admin admin = anAdmin().build();
        LoginRequest request = aLoginRequest().withPassword("wrongpassword").build();

        when(adminRepository.findAdminByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("wrongpassword", admin.getPasswordHash()))
                .thenReturn(false);

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(ResponseStatusException.class)
                .satisfies(ex -> assertThat(
                        ((ResponseStatusException) ex).getStatusCode())
                        .isEqualTo(UNAUTHORIZED));

        verify(adminRepository).findAdminByUsername("admin");
        verify(passwordEncoder).matches("wrongpassword", admin.getPasswordHash());
        verifyNoInteractions(jwtUtil);
    }

    @Test
    void login_shouldReturnToken_whenCredentialsAreCorrect() {
        Admin admin = anAdmin().build();
        LoginRequest request = aLoginRequest().build();

        when(adminRepository.findAdminByUsername("admin")).thenReturn(Optional.of(admin));
        when(passwordEncoder.matches("admin123", admin.getPasswordHash())).thenReturn(true);
        when(jwtUtil.generateToken("admin")).thenReturn("mocked.jwt.token");

        LoginResponse response = authService.login(request);

        assertThat(response).isNotNull();
        assertThat(response.token()).isEqualTo("mocked.jwt.token");

        verify(adminRepository).findAdminByUsername("admin");
        verify(passwordEncoder).matches("admin123", admin.getPasswordHash());
        verify(jwtUtil).generateToken("admin");
    }
}