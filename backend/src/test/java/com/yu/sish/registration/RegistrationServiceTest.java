package com.yu.sish.registration;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.yu.sish.storage.FileStorageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InOrder;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.dao.DataIntegrityViolationException;

import static com.yu.sish.registration.RegistrationRequestTestDataBuilder.aRegistrationRequest;
import static com.yu.sish.registration.RegistrationResponseTestDataBuilder.aRegistrationResponse;
import static com.yu.sish.registration.RegistrationTestDataBuilder.aRegistration;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.assertj.core.api.Assertions.tuple;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.inOrder;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class RegistrationServiceTest {

    private static final String OBJECT_KEY =
            "registrations/11111111-2222-3333-4444-555555555555_proposal.pdf";

    @Mock private RegistrationRepository registrationRepository;
    @Mock private RegistrationMapper registrationMapper;
    @Mock private FileStorageService fileStorageService;

    @Spy private ObjectMapper objectMapper = new ObjectMapper();

    @InjectMocks private RegistrationService registrationService;

    @Test
    void register_shouldThrow_whenRequestIsNull() {
        assertThatThrownBy(() -> registrationService.register(null))
                .isInstanceOf(IllegalArgumentException.class);

        verifyNoInteractions(registrationRepository, registrationMapper, fileStorageService);
    }

    @Test
    void register_shouldReturnMappedResponse_whenRequestIsValid() {
        RegistrationRequest request = aRegistrationRequest().build();
        Registration entity = aRegistration().withId(null).withNoMembers().build();
        Registration saved = aRegistration().build();
        RegistrationResponse expected = aRegistrationResponse().withId(1L).build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(saved);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(saved)).thenReturn(saved);
        when(registrationMapper.toResponse(saved)).thenReturn(expected);

        RegistrationResponse actual = registrationService.register(request);

        assertThat(actual).isEqualTo(expected);
    }

    @Test
    void register_shouldCopyFileMetadataOntoTheEntity() {
        RegistrationRequest request = aRegistrationRequest().build();
        Registration entity = aRegistration().withNoMembers().withFileObjectKey(null).build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(entity);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(entity)).thenReturn(entity);

        registrationService.register(request);

        assertThat(entity.getFileObjectKey()).isEqualTo(OBJECT_KEY);
        assertThat(entity.getFileOriginalName()).isEqualTo("proposal.pdf");
        assertThat(entity.getFileContentType()).isEqualTo("application/pdf");
        assertThat(entity.getFileSizeBytes()).isEqualTo(request.getProjectFile().getSize());
    }

    @Test
    void register_shouldUploadTheFile_onlyAfterTheRowHasBeenFlushed() {
        RegistrationRequest request = aRegistrationRequest().build();
        Registration entity = aRegistration().withNoMembers().build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(entity);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(entity)).thenReturn(entity);

        registrationService.register(request);

        InOrder inOrder = inOrder(registrationRepository, fileStorageService);
        inOrder.verify(registrationRepository).saveAndFlush(entity);
        inOrder.verify(fileStorageService).upload(request.getProjectFile());
    }

    @Test
    void register_shouldNotUploadAnything_whenTheUniqueConstraintRejectsTheRow() {
        RegistrationRequest request = aRegistrationRequest().build();
        Registration entity = aRegistration().withNoMembers().build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity))
                .thenThrow(new DataIntegrityViolationException("uq_reg_email_type"));

        assertThatThrownBy(() -> registrationService.register(request))
                .isInstanceOf(DataIntegrityViolationException.class);

        verifyNoInteractions(fileStorageService);
        verify(registrationRepository, never()).save(any(Registration.class));
    }

    @Test
    void register_shouldAttachMembersInOrder_andLowercaseTheirEmails() {
        RegistrationRequest request = aRegistrationRequest()
                .withMembers("""
                        [{"name":" Sara Ahmed ","email":"SARA@EXAMPLE.COM"},
                         {"name":"Omar Khaled","email":"omar@example.com"}]""")
                .build();
        Registration entity = aRegistration().withNoMembers().build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(entity);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(entity)).thenReturn(entity);

        registrationService.register(request);

        assertThat(entity.getMembers())
                .extracting(TeamMember::getName, TeamMember::getEmail, TeamMember::getMemberOrder)
                .containsExactly(
                        tuple("Sara Ahmed", "sara@example.com", 0),
                        tuple("Omar Khaled", "omar@example.com", 1));

        assertThat(entity.getMembers())
                .allSatisfy(member -> assertThat(member.getRegistration()).isSameAs(entity));
    }

    @Test
    void register_shouldAttachNoMembers_whenTheMembersFieldIsBlank() {
        RegistrationRequest request = aRegistrationRequest().withMembers("").build();
        Registration entity = aRegistration().withNoMembers().build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(entity);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(entity)).thenReturn(entity);

        registrationService.register(request);

        assertThat(entity.getMembers()).isEmpty();
    }

    @Test
    void register_shouldAttachNoMembers_whenTheMembersJsonIsMalformed() {
        RegistrationRequest request = aRegistrationRequest().withMembers("{not json").build();
        Registration entity = aRegistration().withNoMembers().build();

        when(registrationMapper.toEntity(request)).thenReturn(entity);
        when(registrationRepository.saveAndFlush(entity)).thenReturn(entity);
        when(fileStorageService.upload(request.getProjectFile())).thenReturn(OBJECT_KEY);
        when(registrationRepository.save(entity)).thenReturn(entity);

        registrationService.register(request);

        assertThat(entity.getMembers()).isEmpty();
    }
}