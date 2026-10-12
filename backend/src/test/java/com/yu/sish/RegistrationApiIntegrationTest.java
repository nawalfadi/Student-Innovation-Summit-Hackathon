package com.yu.sish;

import com.jayway.jsonpath.JsonPath;
import com.yu.sish.storage.FileStorageService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.yu.sish.support.RegistrationForm.aHackathonForm;
import static com.yu.sish.support.RegistrationForm.aShowcaseForm;
import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest(properties = {
        "app.jwt.secret=test-secret-key-for-integration-tests-only-not-a-real-key",
        "app.jwt.expiry-minutes=60",
        "app.storage.endpoint=http://localhost:19999",
        "app.storage.access-key=test-access-key",
        "app.storage.secret-key=test-secret-key",
        "app.storage.region=auto",
        "app.storage.bucket=sish-test"
})
@AutoConfigureMockMvc(addFilters = false)
@Import(TestcontainersConfiguration.class)
class RegistrationApiIntegrationTest {

    private static final String ADMIN_REGISTRATIONS = "/api/v1/admin/registrations";
    private static final String OBJECT_KEY = "registrations/test_proposal.pdf";

    @Autowired private MockMvc mockMvc;

    @MockitoBean private FileStorageService fileStorageService;

    @Test
    void theSameEmailAndTypeTwice_shouldBeRejectedByTheUniqueConstraint() throws Exception {
        stubUpload();

        mockMvc.perform(aHackathonForm().with("email", "duplicate@example.com").toRequest())
                .andExpect(status().isCreated());

        mockMvc.perform(aHackathonForm().with("email", "duplicate@example.com").toRequest())
                .andExpect(status().isConflict())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.errors.email").isNotEmpty());
    }

    @Test
    void theSameEmailUnderADifferentType_shouldBeAccepted() throws Exception {
        stubUpload();

        mockMvc.perform(aHackathonForm().with("email", "both@example.com").toRequest())
                .andExpect(status().isCreated());

        mockMvc.perform(aShowcaseForm().with("email", "both@example.com").toRequest())
                .andExpect(status().isCreated());
    }

    @Test
    void anEmailDifferingOnlyByCase_shouldBeTreatedAsADuplicate() throws Exception {
        stubUpload();

        mockMvc.perform(aHackathonForm().with("email", "case@example.com").toRequest())
                .andExpect(status().isCreated());

        mockMvc.perform(aHackathonForm().with("email", "CASE@EXAMPLE.COM").toRequest())
                .andExpect(status().isConflict());
    }

    @Test
    void aTeamSubmission_shouldPersistItsMembersInOrder() throws Exception {
        stubUpload();

        long id = submit(aHackathonForm()
                .with("email", "team@example.com")
                .with("members", """
                        [{"name":"Sara Ahmed","email":"sara@example.com"},
                         {"name":"Omar Khaled","email":"omar@example.com"}]"""));

        mockMvc.perform(get(ADMIN_REGISTRATIONS + "/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(2)))
                .andExpect(jsonPath("$.members[0].name").value("Sara Ahmed"))
                .andExpect(jsonPath("$.members[0].email").value("sara@example.com"))
                .andExpect(jsonPath("$.members[1].name").value("Omar Khaled"));
    }

    @Test
    void anIndividualShowcaseSubmission_shouldPersistWithNoMembers() throws Exception {
        stubUpload();

        long id = submit(aShowcaseForm().with("email", "solo@example.com"));

        mockMvc.perform(get(ADMIN_REGISTRATIONS + "/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.members", hasSize(0)))
                .andExpect(jsonPath("$.participationType").value("showcase"))
                .andExpect(jsonPath("$.graduationYear").value("2027"));
    }

    @Test
    void aSubmission_shouldBeStoredWithThePendingStatus_andNormalisedFields() throws Exception {
        stubUpload();

        long id = submit(aHackathonForm()
                .with("email", "  NORMALISE@Example.COM ")
                .with("phone", "05 1234 5678"));

        mockMvc.perform(get(ADMIN_REGISTRATIONS + "/" + id))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("pending"))
                .andExpect(jsonPath("$.email").value("normalise@example.com"))
                .andExpect(jsonPath("$.phone").value("0512345678"))
                .andExpect(jsonPath("$.fileOriginalName").value("proposal.pdf"));
    }

    @Test
    void theStoredFileKey_shouldNeverLeaveTheApi() throws Exception {
        stubUpload();

        long id = submit(aHackathonForm().with("email", "leak@example.com"));

        mockMvc.perform(get(ADMIN_REGISTRATIONS + "/" + id))
                .andExpect(jsonPath("$.fileObjectKey").doesNotExist());
    }

    private void stubUpload() {
        when(fileStorageService.upload(any())).thenReturn(OBJECT_KEY);
    }

    private long submit(com.yu.sish.support.RegistrationForm form) throws Exception {
        String body = mockMvc.perform(form.toRequest())
                .andExpect(status().isCreated())
                .andReturn()
                .getResponse()
                .getContentAsString();

        Number registrationId = JsonPath.read(body, "$.registrationId");
        return registrationId.longValue();
    }
}