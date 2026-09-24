package com.yu.sish.shared;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record ApiEnvelope(
        boolean success,

        @Schema(description = "Localized by the request's locale field.")
        String message,

        @Schema(description = "Field name to error message. Absent on success.",
                example = "{\"email\": \"This email is already registered\"}")
        Map<String, String> errors,

        @Schema(example = "42")
        Long registrationId
) {

    public static ApiEnvelope ok(String message, Long id) {
        return new ApiEnvelope(true, message, null, id);
    }

    public static ApiEnvelope error(String message, Map<String, String> errors) {
        return new ApiEnvelope(false, message, errors, null);
    }
}