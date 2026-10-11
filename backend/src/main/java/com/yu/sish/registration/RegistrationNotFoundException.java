package com.yu.sish.registration;

public class RegistrationNotFoundException extends RuntimeException {
    public RegistrationNotFoundException(Long id) {
        super("Registration not found: " + id);
    }
}
