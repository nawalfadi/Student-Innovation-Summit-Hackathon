package com.yu.sish.util;

import com.yu.sish.auth.Admin;

public class AdminTestDataBuilder {

    private Long id = 1L;
    private String username = "admin";
    private String passwordHash = "$2a$10$hashedpassword";

    public static AdminTestDataBuilder anAdmin() {
        return new AdminTestDataBuilder();
    }

    public AdminTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public AdminTestDataBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public AdminTestDataBuilder withPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
        return this;
    }

    public Admin build() {
        Admin admin = new Admin();
        admin.setId(id);
        admin.setUsername(username);
        admin.setPasswordHash(passwordHash);
        return admin;
    }
}