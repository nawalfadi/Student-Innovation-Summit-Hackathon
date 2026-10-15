package com.yu.sish.registration;

import com.yu.sish.auth.JwtUtil;
import com.yu.sish.shared.JacksonConfig;
import com.yu.sish.shared.MessageConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.yu.sish.registration.RegistrationResponseTestDataBuilder.aRegistrationResponse;
import static com.yu.sish.support.RegistrationForm.aHackathonForm;
import static com.yu.sish.support.RegistrationForm.aShowcaseForm;
import static com.yu.sish.support.TestFiles.unsupportedType;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RegistrationController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import({MessageConfig.class, JacksonConfig.class})
class RegistrationControllerTest {

    @Autowired private MockMvc mockMvc;

    @MockitoBean private RegistrationService registrationService;
    @MockitoBean private JwtUtil jwtUtil;
    @MockitoBean private UserDetailsService userDetailsService;

    @Test
    void register_shouldReturn201_andTheSuccessEnvelope() throws Exception {
        when(registrationService.register(any(RegistrationRequest.class)))
                .thenReturn(aRegistrationResponse().build());

        mockMvc.perform(aHackathonForm().toRequest())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").isNotEmpty())
                .andExpect(jsonPath("$.registrationId").value(42))
                .andExpect(jsonPath("$.errors").doesNotExist());
    }

    @Test
    void register_shouldAcceptAShowcaseSubmission() throws Exception {
        when(registrationService.register(any(RegistrationRequest.class)))
                .thenReturn(aRegistrationResponse().withParticipationType("showcase").build());

        mockMvc.perform(aShowcaseForm().toRequest())
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.success").value(true));
    }

    @Test
    void register_shouldReturn409_whenTheEmailIsAlreadyRegistered() throws Exception {
        when(registrationService.register(any(RegistrationRequest.class)))
                .thenThrow(new DataIntegrityViolationException(
                        "ERROR: duplicate key value violates unique constraint "
                                + "\"uq_reg_email_type\""));

        mockMvc.perform(aHackathonForm().toRequest())
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.email").isNotEmpty())
                .andExpect(jsonPath("$.registrationId").doesNotExist());
    }

    @Test
    void register_shouldNotBlameTheEmail_whenSomeOtherConstraintIsViolated() throws Exception {
        when(registrationService.register(any(RegistrationRequest.class)))
                .thenThrow(new DataIntegrityViolationException(
                        "ERROR: value too long for type character varying(255)"));

        mockMvc.perform(aHackathonForm().toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors").doesNotExist());
    }

    @Test
    void register_shouldReturn400_keyedByFieldName_whenAHackathonFieldIsMissing() throws Exception {
        mockMvc.perform(aHackathonForm().without("track").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.track").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenTheFileIsMissing() throws Exception {
        mockMvc.perform(aHackathonForm().withoutFile().toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.projectFile").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenTheFileTypeIsNotAllowed() throws Exception {
        mockMvc.perform(aHackathonForm().withFile(unsupportedType()).toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.projectFile").isNotEmpty());
    }

    @Test
    void register_shouldReturn400_whenTheEmailIsMalformed() throws Exception {
        mockMvc.perform(aHackathonForm().with("email", "not-an-email").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.email").isNotEmpty());
    }

    @Test
    void register_shouldReturn400_whenTheEmailIsOmittedEntirely() throws Exception {
        mockMvc.perform(aHackathonForm().without("email").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.email").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenTheParticipationTypeIsOmittedEntirely() throws Exception {
        mockMvc.perform(aHackathonForm().without("participationType").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.participationType").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenThePhoneIsOmittedEntirely() throws Exception {
        mockMvc.perform(aHackathonForm().without("phone").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.phone").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenTheFullNameIsLongerThanTheColumn() throws Exception {
        mockMvc.perform(aHackathonForm().with("fullName", "a".repeat(300)).toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.fullName").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenTheProjectIdeaIsAbsurdlyLong() throws Exception {
        mockMvc.perform(aHackathonForm().with("projectIdea", "a".repeat(5001)).toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.projectIdea").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenATeammateNameIsLongerThanTheColumn() throws Exception {
        String longName = "a".repeat(300);
        mockMvc.perform(aHackathonForm()
                        .with("members", "[{\"name\":\"" + longName
                                + "\",\"email\":\"sara@example.com\"}]")
                        .toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.members").isNotEmpty());

        verifyNoInteractions(registrationService);
    }

    @Test
    void register_shouldReturn400_whenThePhoneIsNotASaudiMobile() throws Exception {
        mockMvc.perform(aHackathonForm().with("phone", "0712345678").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.phone").isNotEmpty());
    }

    @Test
    void register_shouldReturn400_whenThereAreMoreThanFourTeammates() throws Exception {
        String fiveMembers = """
                [{"name":"A","email":"a@example.com"},
                 {"name":"B","email":"b@example.com"},
                 {"name":"C","email":"c@example.com"},
                 {"name":"D","email":"d@example.com"},
                 {"name":"E","email":"e@example.com"}]""";

        mockMvc.perform(aHackathonForm().with("members", fiveMembers).toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.memberCount").isNotEmpty());
    }

    @Test
    void register_shouldReturnEnglishMessages_whenTheLocaleFieldSaysEn() throws Exception {
        mockMvc.perform(aHackathonForm().with("locale", "en").without("track").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.track").value("Please select a track"));
    }

    @Test
    void register_shouldReturnArabicMessages_whenTheLocaleFieldIsAbsent() throws Exception {
        mockMvc.perform(aHackathonForm().with("locale", "").without("track").toRequest())
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.errors.track").value("يرجى اختيار مسار"));
    }
}