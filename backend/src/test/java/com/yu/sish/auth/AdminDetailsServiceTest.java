package com.yu.sish.auth;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

import static com.yu.sish.auth.AdminTestDataBuilder.anAdmin;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AdminDetailsServiceTest {

    @Mock private AdminRepository adminRepository;

    @InjectMocks private AdminDetailsService adminDetailsService;

    @Test
    void shouldGrantRoleAdmin_whenTheSubjectIsARegisteredAdmin() {
        Admin admin = anAdmin().withUsername("rawan").build();
        when(adminRepository.findAdminByUsername("rawan")).thenReturn(Optional.of(admin));

        UserDetails details = adminDetailsService.loadUserByUsername("rawan");

        assertThat(details.getUsername()).isEqualTo("rawan");
        assertThat(details.getAuthorities())
                .extracting(GrantedAuthority::getAuthority)
                .containsExactly("ROLE_ADMIN");
    }

    @Test
    void shouldCarryTheStoredHash_soThatPasswordVerificationStaysPossible() {
        Admin admin = anAdmin().withPasswordHash("$2a$10$storedhash").build();
        when(adminRepository.findAdminByUsername("admin")).thenReturn(Optional.of(admin));

        UserDetails details = adminDetailsService.loadUserByUsername("admin");

        assertThat(details.getPassword()).isEqualTo("$2a$10$storedhash");
    }

    @Test
    void shouldThrow_whenTheSubjectIsNotInTheAdminsTable() {
        when(adminRepository.findAdminByUsername("ghost")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> adminDetailsService.loadUserByUsername("ghost"))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessageContaining("ghost");
    }
}