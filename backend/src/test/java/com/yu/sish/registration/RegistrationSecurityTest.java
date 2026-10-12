package com.yu.sish.registration;

import com.yu.sish.auth.JwtAuthFilter;
import com.yu.sish.auth.JwtUtil;
import com.yu.sish.shared.JacksonConfig;
import com.yu.sish.config.SecurityConfig;
import com.yu.sish.shared.MessageConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.yu.sish.registration.RegistrationResponseTestDataBuilder.aRegistrationResponse;
import static com.yu.sish.support.RegistrationForm.aHackathonForm;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RegistrationController.class)
@Import({SecurityConfig.class, JwtAuthFilter.class, JwtUtil.class,
        MessageConfig.class, JacksonConfig.class})
@TestPropertySource(properties = {
        "app.jwt.secret=test-jwt-secret-key-at-least-32-bytes-long-for-hs256",
        "app.jwt.expiry-minutes=60"
})
class RegistrationSecurityTest {

    private static final String REGISTRATIONS = "/api/v1/registrations";

    @Autowired private MockMvc mockMvc;

    @MockitoBean private RegistrationService registrationService;

    @Test
    void submitting_shouldBeOpenToStudents_withNoToken() throws Exception {
        when(registrationService.register(any(RegistrationRequest.class)))
                .thenReturn(aRegistrationResponse().build());

        mockMvc.perform(aHackathonForm().toRequest())
                .andExpect(status().isCreated());
    }

    @Test
    void listingRegistrations_shouldNotBeReachableOnThePublicRoute() throws Exception {
        mockMvc.perform(get(REGISTRATIONS))
                .andExpect(status().isUnauthorized());
    }
}