package com.yu.sish.auth;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Slf4j
@Configuration
@Profile("dev-local")
@RequiredArgsConstructor
public class DevDataSeeder {
    private final AdminRepository adminRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Bean
    CommandLineRunner seedAdmin(){
        return args -> {
            if(adminRepository.count() == 0){
                Admin admin = new Admin();
                admin.setUsername("admin");
                admin.setPasswordHash(passwordEncoder.encode("admin123"));
                adminRepository.save(admin);
                log.info("Dev admin seeded via Name: admin Password: admin123");
            } else{
                log.debug("Admin already exists");
            }
        };
    }
}
