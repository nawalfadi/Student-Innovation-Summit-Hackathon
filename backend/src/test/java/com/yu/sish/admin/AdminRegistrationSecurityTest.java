package com.yu.sish.admin;

import com.yu.sish.auth.JwtAuthFilter;
import com.yu.sish.auth.JwtUtil;
import com.yu.sish.config.SecurityConfig;
import com.yu.sish.registration.RegistrationResponse;
import com.yu.sish.shared.JacksonConfig;
import com.yu.sish.shared.MessageConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import static com.yu.sish.auth.JwtTokenTestDataBuilder.aTokenSignedByAnOutsider;
import static com.yu.sish.auth.JwtTokenTestDataBuilder.anAdminToken;
import static com.yu.sish.auth.JwtTokenTestDataBuilder.anExpiredToken;
import static com.yu.sish.support.PagedResponseTestDataBuilder.anEmptyPageOf;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminRegistrationController.class)
@Import({SecurityConfig.class, JwtAuthFilter.class, JwtUtil.class,
        MessageConfig.class, JacksonConfig.class})
@TestPropertySource(properties = {
        "app.jwt.secret=test-jwt-secret-key-at-least-32-bytes-long-for-hs256",
        "app.jwt.expiry-minutes=60"
})
class AdminRegistrationSecurityTest {

    private static final String BASE = "/api/v1/admin/registrations";

    @Autowired private MockMvc mockMvc;

    @MockitoBean private AdminRegistrationService adminRegistrationService;
    @MockitoBean private UserDetailsService userDetailsService;


    @Test
    void list_shouldReturn200_whenTheTokenIsValid() throws Exception {
        when(userDetailsService.loadUserByUsername("admin")).thenReturn(anAdminPrincipal());
        when(adminRegistrationService.findAll(any(), any(), any(Pageable.class)))
                .thenReturn(anEmptyPageOf(RegistrationResponse.class).build());

        mockMvc.perform(get(BASE).header("Authorization", anAdminToken().asHeader()))
                .andExpect(status().isOk());
    }

    @Test
    void list_shouldReject_whenTheSubjectIsNotARegisteredAdmin() throws Exception {
        when(userDetailsService.loadUserByUsername(anyString()))
                .thenThrow(new UsernameNotFoundException("no such admin"));

        mockMvc.perform(get(BASE)
                        .header("Authorization", anAdminToken()
                                .withSubject("someone-who-is-not-in-the-admins-table")
                                .asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService);
    }

    @Test
    void list_shouldReject_whenTheAdminWasDeletedWhileTheirTokenWasStillValid() throws Exception {
        when(userDetailsService.loadUserByUsername("admin"))
                .thenThrow(new UsernameNotFoundException("admin"));

        mockMvc.perform(get(BASE).header("Authorization", anAdminToken().asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService);
    }

    @Test
    void list_shouldReturn403_whenThePrincipalIsAuthenticatedButNotAnAdmin() throws Exception {
        when(userDetailsService.loadUserByUsername("admin")).thenReturn(aPrincipalWithoutTheAdminRole());

        mockMvc.perform(get(BASE).header("Authorization", anAdminToken().asHeader()))
                .andExpect(status().isForbidden());

        verifyNoInteractions(adminRegistrationService);
    }

    @Test
    void list_shouldReject_whenThereIsNoAuthorizationHeader() throws Exception {
        mockMvc.perform(get(BASE))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheHeaderUsesTheWrongScheme() throws Exception {
        mockMvc.perform(get(BASE).header("Authorization", "Basic YWRtaW46YWRtaW4xMjM="))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheBearerValueIsEmpty() throws Exception {
        mockMvc.perform(get(BASE).header("Authorization", "Bearer "))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheTokenIsNotAJwtAtAll() throws Exception {
        mockMvc.perform(get(BASE).header("Authorization", "Bearer not.a.real.token"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheTokenWasSignedWithADifferentSecret() throws Exception {
        mockMvc.perform(get(BASE)
                        .header("Authorization", aTokenSignedByAnOutsider().asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheTokenHasExpired() throws Exception {
        mockMvc.perform(get(BASE).header("Authorization", anExpiredToken().asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheTokenExpiredOneSecondAgo() throws Exception {
        mockMvc.perform(get(BASE)
                        .header("Authorization", anAdminToken()
                                .expiringAt(Instant.now().minus(1, ChronoUnit.SECONDS))
                                .asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenTheSignatureHasBeenTamperedWith() throws Exception {
        String token = anAdminToken().build();
        String tampered = token.substring(0, token.length() - 4) + "AAAA";

        mockMvc.perform(get(BASE).header("Authorization", "Bearer " + tampered))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void list_shouldReject_whenThePayloadHasBeenTamperedWith() throws Exception {
        String[] parts = anAdminToken().build().split("\\.");
        String forgedPayload = java.util.Base64.getUrlEncoder().withoutPadding()
                .encodeToString("{\"sub\":\"attacker\"}".getBytes());

        mockMvc.perform(get(BASE)
                        .header("Authorization", "Bearer " + parts[0] + "." + forgedPayload + "." + parts[2]))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void detail_shouldReject_whenThereIsNoToken() throws Exception {
        mockMvc.perform(get(BASE + "/42"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void statusUpdate_shouldReject_whenThereIsNoToken() throws Exception {
        mockMvc.perform(patch(BASE + "/42/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"accepted\"}"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void fileLink_shouldReject_whenThereIsNoToken() throws Exception {
        mockMvc.perform(get(BASE + "/42/file"))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }

    @Test
    void fileLink_shouldReject_whenTheTokenIsExpired() throws Exception {
        mockMvc.perform(get(BASE + "/42/file")
                        .header("Authorization", anExpiredToken().asHeader()))
                .andExpect(status().isUnauthorized());

        verifyNoInteractions(adminRegistrationService, userDetailsService);
    }


    private static UserDetails anAdminPrincipal() {
        return User.withUsername("admin")
                .password("irrelevant-to-bearer-auth")
                .roles("ADMIN")
                .build();
    }

    private static UserDetails aPrincipalWithoutTheAdminRole() {
        return User.withUsername("admin")
                .password("irrelevant-to-bearer-auth")
                .roles("PARTICIPANT")
                .build();
    }
}