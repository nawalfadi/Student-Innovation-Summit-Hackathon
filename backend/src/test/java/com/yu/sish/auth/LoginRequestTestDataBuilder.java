package com.yu.sish.auth;

public class LoginRequestTestDataBuilder {

    private String username = "admin";
    private String password = "admin123";

    public static LoginRequestTestDataBuilder aLoginRequest() {
        return new LoginRequestTestDataBuilder();
    }

    public LoginRequestTestDataBuilder withUsername(String username) {
        this.username = username;
        return this;
    }

    public LoginRequestTestDataBuilder withPassword(String password) {
        this.password = password;
        return this;
    }

    public LoginRequest build() {
        return new LoginRequest(username, password);
    }
}
