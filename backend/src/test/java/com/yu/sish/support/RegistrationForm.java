package com.yu.sish.support;

import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockMultipartHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.LinkedHashMap;
import java.util.Map;

public final class RegistrationForm {

    private static final String URL = "/api/v1/registrations";

    private final Map<String, String> fields = new LinkedHashMap<>();
    private MockMultipartFile file = TestFiles.pdf();

    private RegistrationForm() {
    }

    public static RegistrationForm aHackathonForm() {
        RegistrationForm form = new RegistrationForm();
        form.fields.put("fullName", "Ahmed Qassem");
        form.fields.put("universityId", "442100123");
        form.fields.put("universityName", "Al Yamamah University");
        form.fields.put("email", "ahmed@example.com");
        form.fields.put("phone", "0512345678");
        form.fields.put("participationType", "hackathon");
        form.fields.put("track", "academic");
        form.fields.put("isTeam", "true");
        form.fields.put("teamName", "Team Falcon");
        form.fields.put("major", "Software Engineering");
        form.fields.put("universityYear", "3");
        form.fields.put("graduationYear", "");
        form.fields.put("projectIdea", "A platform that matches students with study groups.");
        form.fields.put("locale", "ar");
        form.fields.put("memberCount", "1");
        form.fields.put("members", """
                [{"name":"Sara Ahmed","email":"sara@example.com"}]""");
        return form;
    }

    public static RegistrationForm aShowcaseForm() {
        RegistrationForm form = new RegistrationForm();
        form.fields.put("fullName", "Ahmed Qassem");
        form.fields.put("universityId", "");
        form.fields.put("universityName", "Al Yamamah University");
        form.fields.put("email", "ahmed@example.com");
        form.fields.put("phone", "0512345678");
        form.fields.put("participationType", "showcase");
        form.fields.put("track", "");
        form.fields.put("isTeam", "false");
        form.fields.put("teamName", "");
        form.fields.put("major", "Software Engineering");
        form.fields.put("universityYear", "");
        form.fields.put("graduationYear", "2027");
        form.fields.put("projectIdea", "A platform that matches students with study groups.");
        form.fields.put("locale", "ar");
        form.fields.put("memberCount", "0");
        form.fields.put("members", "[]");
        return form;
    }

    public RegistrationForm with(String field, String value) {
        fields.put(field, value);
        return this;
    }


    public RegistrationForm without(String field) {
        fields.put(field, "");
        return this;
    }


    public RegistrationForm withoutField(String field) {
        fields.remove(field);
        return this;
    }

    public RegistrationForm withFile(MockMultipartFile file) {
        this.file = file;
        return this;
    }

    public RegistrationForm withoutFile() {
        this.file = null;
        return this;
    }

    public MockMultipartHttpServletRequestBuilder toRequest() {
        var builder = MockMvcRequestBuilders.multipart(URL);
        if (file != null) {
            builder.file(file);
        }
        fields.forEach((name, value) -> builder.param(name, value));
        return builder;
    }
}