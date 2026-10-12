package com.yu.sish.registration;

public class TeamMemberTestDataBuilder {

    private Long id = 1L;
    private String name = "Sara Ahmed";
    private String email = "sara@example.com";
    private Integer memberOrder = 0;
    private Registration registration;

    public static TeamMemberTestDataBuilder aTeamMember() {
        return new TeamMemberTestDataBuilder();
    }

    public TeamMemberTestDataBuilder withId(Long id) {
        this.id = id;
        return this;
    }

    public TeamMemberTestDataBuilder withName(String name) {
        this.name = name;
        return this;
    }

    public TeamMemberTestDataBuilder withEmail(String email) {
        this.email = email;
        return this;
    }

    public TeamMemberTestDataBuilder withMemberOrder(Integer memberOrder) {
        this.memberOrder = memberOrder;
        return this;
    }

    public TeamMemberTestDataBuilder withRegistration(Registration registration) {
        this.registration = registration;
        return this;
    }

    public TeamMember build() {
        TeamMember member = new TeamMember();
        member.setId(id);
        member.setName(name);
        member.setEmail(email);
        member.setMemberOrder(memberOrder);
        member.setRegistration(registration);
        return member;
    }
}