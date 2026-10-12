package com.yu.sish.admin;

import com.yu.sish.auth.JwtUtil;
import com.yu.sish.registration.RegistrationNotFoundException;
import com.yu.sish.registration.RegistrationResponse;
import com.yu.sish.shared.JacksonConfig;
import com.yu.sish.shared.MessageConfig;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.yu.sish.admin.RegistrationDetailResponseTestDataBuilder.aRegistrationDetail;
import static com.yu.sish.registration.RegistrationResponseTestDataBuilder.aRegistrationResponse;
import static com.yu.sish.registration.TeamMemberResponseTestDataBuilder.aTeamMemberResponse;
import static com.yu.sish.support.PagedResponseTestDataBuilder.aPageOf;
import static com.yu.sish.support.PagedResponseTestDataBuilder.anEmptyPageOf;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AdminRegistrationController.class)
@AutoConfigureMockMvc(addFilters = false)
@Import({MessageConfig.class, JacksonConfig.class})
class AdminRegistrationControllerTest {

    private static final String BASE = "/api/v1/admin/registrations";

    @Autowired private MockMvc mockMvc;

    @MockitoBean private AdminRegistrationService adminRegistrationService;
    @MockitoBean private JwtUtil jwtUtil;



    @Test
    void list_shouldReturn200_andTheEnvelopeShape() throws Exception {
        when(adminRegistrationService.findAll(any(), any(), any(Pageable.class)))
                .thenReturn(aPageOf(aRegistrationResponse().build()).build());

        mockMvc.perform(get(BASE))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content[0].id").value(42))
                .andExpect(jsonPath("$.content[0].status").value("pending"))
                .andExpect(jsonPath("$.content[0].participationType").value("hackathon"))
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(20))
                .andExpect(jsonPath("$.totalElements").value(1))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    void list_shouldPassTheFiltersThrough() throws Exception {
        when(adminRegistrationService.findAll(any(), any(), any(Pageable.class)))
                .thenReturn(anEmptyPageOf(RegistrationResponse.class).build());

        mockMvc.perform(get(BASE)
                        .param("participationType", "hackathon")
                        .param("status", "pending"))
                .andExpect(status().isOk());

        verify(adminRegistrationService)
                .findAll(eq("hackathon"), eq("pending"), any(Pageable.class));
    }

    @Test
    void list_shouldPassNullFilters_whenNoQueryParamsAreGiven() throws Exception {
        when(adminRegistrationService.findAll(any(), any(), any(Pageable.class)))
                .thenReturn(anEmptyPageOf(RegistrationResponse.class).build());

        mockMvc.perform(get(BASE)).andExpect(status().isOk());

        verify(adminRegistrationService).findAll(eq(null), eq(null), any(Pageable.class));
    }



    @Test
    void getOne_shouldReturn200_withTheTeamMembers() throws Exception {
        when(adminRegistrationService.findById(42L))
                .thenReturn(aRegistrationDetail()
                        .withMembers(aTeamMemberResponse().build())
                        .build());

        mockMvc.perform(get(BASE + "/42"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(42))
                .andExpect(jsonPath("$.status").value("pending"))
                .andExpect(jsonPath("$.members[0].name").value("Sara Ahmed"))
                .andExpect(jsonPath("$.fileOriginalName").value("proposal.pdf"));
    }

    @Test
    void getOne_shouldNeverExposeTheStorageKey() throws Exception {
        when(adminRegistrationService.findById(42L)).thenReturn(aRegistrationDetail().build());

        mockMvc.perform(get(BASE + "/42"))
                .andExpect(jsonPath("$.fileObjectKey").doesNotExist());
    }

    @Test
    void getOne_shouldReturn404_whenTheRegistrationDoesNotExist() throws Exception {
        when(adminRegistrationService.findById(99L))
                .thenThrow(new RegistrationNotFoundException(99L));

        mockMvc.perform(get(BASE + "/99"))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").isNotEmpty());
    }



    @Test
    void updateStatus_shouldReturn200_andTheUpdatedRegistration() throws Exception {
        when(adminRegistrationService.updateStatus(eq(42L), any(StatusUpdateRequest.class)))
                .thenReturn(aRegistrationDetail().withStatus("reviewed").build());

        mockMvc.perform(patch(BASE + "/42/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"reviewed\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(42))
                .andExpect(jsonPath("$.status").value("reviewed"));
    }

    @Test
    void updateStatus_shouldReturn400_whenTheStatusIsNotOneOfTheThree() throws Exception {
        mockMvc.perform(patch(BASE + "/42/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"banana\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.status").isNotEmpty());

        verifyNoInteractions(adminRegistrationService);
    }

    @Test
    void updateStatus_shouldReturn404_whenTheRegistrationDoesNotExist() throws Exception {
        when(adminRegistrationService.updateStatus(eq(99L), any(StatusUpdateRequest.class)))
                .thenThrow(new RegistrationNotFoundException(99L));

        mockMvc.perform(patch(BASE + "/99/status")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"status\":\"reviewed\"}"))
                .andExpect(status().isNotFound());
    }



    @Test
    void getFileUrl_shouldReturnTheLinkAsJson_notTheFile() throws Exception {
        when(adminRegistrationService.getFileUrl(42L))
                .thenReturn(new FileUrlResponse("https://r2.example.com/signed"));

        mockMvc.perform(get(BASE + "/42/file"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.url").value("https://r2.example.com/signed"));
    }

    @Test
    void getFileUrl_shouldReturn404_whenTheRegistrationHasNoFile() throws Exception {
        when(adminRegistrationService.getFileUrl(42L))
                .thenThrow(new RegistrationNotFoundException(42L));

        mockMvc.perform(get(BASE + "/42/file"))
                .andExpect(status().isNotFound());
    }
}