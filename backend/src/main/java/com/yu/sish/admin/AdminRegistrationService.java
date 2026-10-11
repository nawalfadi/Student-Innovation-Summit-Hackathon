package com.yu.sish.admin;

import com.yu.sish.registration.Registration;
import com.yu.sish.registration.RegistrationMapper;
import com.yu.sish.registration.RegistrationNotFoundException;
import com.yu.sish.registration.RegistrationRepository;
import com.yu.sish.registration.RegistrationResponse;
import com.yu.sish.registration.RegistrationStatus;
import com.yu.sish.shared.PagedResponse;
import com.yu.sish.storage.FileStorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
class AdminRegistrationService {

    private static final Set<String> SORTABLE = Set.of(
            "id", "fullName", "email", "participationType", "status", "createdAt");

    private static final Sort DEFAULT_SORT = Sort.by(Sort.Direction.DESC, "createdAt");

    private final RegistrationRepository registrationRepository;
    private final RegistrationMapper registrationMapper;
    private final AdminRegistrationMapper adminRegistrationMapper;
    private final FileStorageService fileStorageService;

    @Transactional(readOnly = true)
    public PagedResponse<RegistrationResponse> findAll(String participationType,
                                                       String status,
                                                       Pageable pageable) {

        Specification<Registration> spec = Specification.allOf(
                RegistrationSpecifications.hasParticipationType(participationType),
                RegistrationSpecifications.hasStatus(status));

        return PagedResponse.from(
                registrationRepository.findAll(spec, sanitize(pageable))
                        .map(registrationMapper::toResponse));
    }

    @Transactional(readOnly = true)
    public RegistrationDetailResponse findById(Long id) {
        return adminRegistrationMapper.toDetailResponse(findOrThrow(id));
    }

    @Transactional
    public RegistrationDetailResponse updateStatus(Long id, StatusUpdateRequest request) {
        Registration registration = findOrThrow(id);
        registration.setStatus(RegistrationStatus.from(request.status()).name());

        log.info("Status updated — id: {}, status: {}", id, registration.getStatus());
        return adminRegistrationMapper.toDetailResponse(registration);
    }

    @Transactional(readOnly = true)
    public FileUrlResponse getFileUrl(Long id) {
        Registration registration = findOrThrow(id);

        if (registration.getFileObjectKey() == null) {
            throw new RegistrationNotFoundException(id);
        }
        return new FileUrlResponse(
                fileStorageService.getPresignedDownloadUrl(registration.getFileObjectKey()));
    }

    private Registration findOrThrow(Long id) {
        return registrationRepository.findById(id)
                .orElseThrow(() -> new RegistrationNotFoundException(id));
    }

    private Pageable sanitize(Pageable pageable) {
        Sort safe = Sort.by(pageable.getSort().stream()
                .filter(order -> SORTABLE.contains(order.getProperty()))
                .toList());

        return PageRequest.of(
                pageable.getPageNumber(),
                pageable.getPageSize(),
                safe.isSorted() ? safe : DEFAULT_SORT);
    }
}