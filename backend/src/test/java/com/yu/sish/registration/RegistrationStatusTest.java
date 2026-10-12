package com.yu.sish.registration;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class RegistrationStatusTest {

    @Test
    void from_shouldAcceptTheLowercaseApiValues() {
        assertThat(RegistrationStatus.from("pending")).isEqualTo(RegistrationStatus.PENDING);
        assertThat(RegistrationStatus.from("reviewed")).isEqualTo(RegistrationStatus.REVIEWED);
        assertThat(RegistrationStatus.from("accepted")).isEqualTo(RegistrationStatus.ACCEPTED);
    }

    @Test
    void from_shouldIgnoreSurroundingWhitespaceAndCase() {
        assertThat(RegistrationStatus.from("  ReViEwEd  ")).isEqualTo(RegistrationStatus.REVIEWED);
    }

    @Test
    void from_shouldThrow_whenTheValueIsNotAKnownStatus() {
        assertThatThrownBy(() -> RegistrationStatus.from("banana"))
                .isInstanceOf(IllegalArgumentException.class);
    }

    @Test
    void from_shouldThrow_whenTheValueIsNull() {
        assertThatThrownBy(() -> RegistrationStatus.from(null))
                .isInstanceOf(NullPointerException.class);
    }

    @Test
    void toApiValue_shouldLowercaseTheConstantName() {
        assertThat(RegistrationStatus.PENDING.toApiValue()).isEqualTo("pending");
        assertThat(RegistrationStatus.ACCEPTED.toApiValue()).isEqualTo("accepted");
    }
}