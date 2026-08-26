package com.yu.sish.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiResponse(
        boolean success,
        String message,
        Map<String, String> errors,
        Long registrationId
) {

    public static ApiResponse ok(String message, Long id) {
        return new ApiResponse(true, message, null, id);
    }

    public static ApiResponse error(String message, Map<String, String> errors) {
        return new ApiResponse(false, message, errors, null);
    }
}