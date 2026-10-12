package com.yu.sish.registration;

public class TeamMemberResponseTestDataBuilder {

    private String name = "Sara Ahmed";
    private String email = "sara@example.com";

    public static TeamMemberResponseTestDataBuilder aTeamMemberResponse() {
        return new TeamMemberResponseTestDataBuilder();
    }

    public TeamMemberResponseTestDataBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public TeamMemberResponseTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public TeamMemberResponse build() {
        return new TeamMemberResponse(name, email);
    }
}