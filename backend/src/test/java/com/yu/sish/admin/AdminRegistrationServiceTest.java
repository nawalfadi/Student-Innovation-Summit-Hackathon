package com.yu.sish.admin;

import com.yu.sish.registration.Registration;
import com.yu.sish.registration.RegistrationMapper;
import com.yu.sish.registration.RegistrationNotFoundException;
import com.yu.sish.registration.RegistrationRepository;
import com.yu.sish.registration.RegistrationResponse;
import com.yu.sish.shared.PagedResponse;
import com.yu.sish.storage.FileStorageService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Optional;

import static com.yu.sish.admin.RegistrationDetailResponseTestDataBuilder.aRegistrationDetail;
import static com.yu.sish.registration.RegistrationResponseTestDataBuilder.aRegistrationResponse;
import static com.yu.sish.registration.RegistrationTestDataBuilder.aRegistration;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminRegistrationServiceTest {

    private static final Sort NEWEST_FIRST = Sort.by(Sort.Direction.DESC, "createdAt");

    @Mock private RegistrationRepository registrationRepository;
    @Mock private RegistrationMapper registrationMapper;
    @Mock private AdminRegistrationMapper adminRegistrationMapper;
    @Mock private FileStorageService fileStorageService;

    @InjectMocks private AdminRegistrationService adminRegistrationService;


    @Test
    void findAll_shouldCopyPageMetadataOntoTheEnvelope() {
        Registration registration = aRegistration().build();
        RegistrationResponse mapped = aRegistrationResponse().withId(1L).build();

        Page<Registration> page =
                new PageImpl<>(List.of(registration), PageRequest.of(0, 20, NEWEST_FIRST), 1);

        when(registrationRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(page);
        when(registrationMapper.toResponse(registration)).thenReturn(mapped);

        PagedResponse<RegistrationResponse> result =
                adminRegistrationService.findAll(null, null, PageRequest.of(0, 20));

        assertThat(result.content()).containsExactly(mapped);
        assertThat(result.page()).isZero();
        assertThat(result.size()).isEqualTo(20);
        assertThat(result.totalElements()).isEqualTo(1);
        assertThat(result.totalPages()).isEqualTo(1);
    }

    @Test
    void findAll_shouldKeepSortFieldsThatAreOnTheWhitelist() {
        when(registrationRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(emptyPage());

        adminRegistrationService.findAll(null, null,
                PageRequest.of(1, 5, Sort.by(Sort.Direction.ASC, "email")));

        Pageable used = capturePageable();
        assertThat(used.getSort()).isEqualTo(Sort.by(Sort.Direction.ASC, "email"));
        assertThat(used.getPageNumber()).isEqualTo(1);
        assertThat(used.getPageSize()).isEqualTo(5);
    }

    @Test
    void findAll_shouldDropUnknownSortFields_andFallBackToNewestFirst() {
        when(registrationRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(emptyPage());

        adminRegistrationService.findAll(null, null,
                PageRequest.of(0, 20, Sort.by("banana")));

        assertThat(capturePageable().getSort()).isEqualTo(NEWEST_FIRST);
    }

    @Test
    void findAll_shouldDropOnlyTheUnknownPart_whenSortMixesKnownAndUnknownFields() {
        when(registrationRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(emptyPage());

        adminRegistrationService.findAll(null, null,
                PageRequest.of(0, 20, Sort.by("banana").and(Sort.by("email"))));

        assertThat(capturePageable().getSort()).isEqualTo(Sort.by("email"));
    }

    @Test
    void findAll_shouldSortByNewestFirst_whenNoSortIsRequested() {
        when(registrationRepository.findAll(any(Specification.class), any(Pageable.class)))
                .thenReturn(emptyPage());

        adminRegistrationService.findAll(null, null, PageRequest.of(0, 20));

        assertThat(capturePageable().getSort()).isEqualTo(NEWEST_FIRST);
    }


    @Test
    void findById_shouldReturnTheMappedDetail() {
        Registration registration = aRegistration().build();
        RegistrationDetailResponse expected = aRegistrationDetail().build();

        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));
        when(adminRegistrationMapper.toDetailResponse(registration)).thenReturn(expected);

        assertThat(adminRegistrationService.findById(1L)).isEqualTo(expected);
    }

    @Test
    void findById_shouldThrowNotFound_whenNoRowHasThatId() {
        when(registrationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminRegistrationService.findById(99L))
                .isInstanceOf(RegistrationNotFoundException.class)
                .hasMessageContaining("99");

        verifyNoInteractions(adminRegistrationMapper);
    }

    @Test
    void updateStatus_shouldStoreTheStatusUppercased() {
        Registration registration = aRegistration().withStatus("PENDING").build();
        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));

        adminRegistrationService.updateStatus(1L, new StatusUpdateRequest("reviewed"));

        assertThat(registration.getStatus()).isEqualTo("REVIEWED");
    }

    @Test
    void updateStatus_shouldRelyOnDirtyChecking_andNotCallSave() {
        Registration registration = aRegistration().build();
        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));

        adminRegistrationService.updateStatus(1L, new StatusUpdateRequest("accepted"));

        verify(registrationRepository, never()).save(any(Registration.class));
    }

    @Test
    void updateStatus_shouldThrow_andLeaveTheRowUntouched_whenStatusIsUnknown() {
        Registration registration = aRegistration().withStatus("PENDING").build();
        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));

        assertThatThrownBy(() ->
                adminRegistrationService.updateStatus(1L, new StatusUpdateRequest("banana")))
                .isInstanceOf(IllegalArgumentException.class);

        assertThat(registration.getStatus()).isEqualTo("PENDING");
    }

    @Test
    void updateStatus_shouldThrowNotFound_whenNoRowHasThatId() {
        when(registrationRepository.findById(99L)).thenReturn(Optional.empty());

        assertThatThrownBy(() ->
                adminRegistrationService.updateStatus(99L, new StatusUpdateRequest("reviewed")))
                .isInstanceOf(RegistrationNotFoundException.class);
    }


    @Test
    void getFileUrl_shouldPresignTheStoredObjectKey() {
        Registration registration = aRegistration()
                .withFileObjectKey("registrations/abc_x.pdf").build();

        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));
        when(fileStorageService.getPresignedDownloadUrl("registrations/abc_x.pdf"))
                .thenReturn("https://r2.example.com/signed");

        assertThat(adminRegistrationService.getFileUrl(1L).url())
                .isEqualTo("https://r2.example.com/signed");
    }

    @Test
    void getFileUrl_shouldThrowNotFound_andSkipStorage_whenTheRowHasNoFile() {
        Registration registration = aRegistration().withFileObjectKey(null).build();
        when(registrationRepository.findById(1L)).thenReturn(Optional.of(registration));

        assertThatThrownBy(() -> adminRegistrationService.getFileUrl(1L))
                .isInstanceOf(RegistrationNotFoundException.class);

        verifyNoInteractions(fileStorageService);
    }

    private Page<Registration> emptyPage() {
        return new PageImpl<>(List.of());
    }

    private Pageable capturePageable() {
        ArgumentCaptor<Pageable> captor = ArgumentCaptor.forClass(Pageable.class);
        verify(registrationRepository).findAll(any(Specification.class), captor.capture());
        return captor.getValue();
    }
}