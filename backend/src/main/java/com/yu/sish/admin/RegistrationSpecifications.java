package com.yu.sish.admin;

import com.yu.sish.registration.Registration;
import org.springframework.data.jpa.domain.Specification;

final class RegistrationSpecifications {

    private RegistrationSpecifications() {
    }

    static Specification<Registration> hasParticipationType(String type) {
        return (root, query, cb) ->
                type == null ? null : cb.equal(root.get("participationType"), type.toUpperCase());
    }

    static Specification<Registration> hasStatus(String status) {
        return (root, query, cb) ->
                status == null ? null : cb.equal(root.get("status"), status.toUpperCase());
    }
}