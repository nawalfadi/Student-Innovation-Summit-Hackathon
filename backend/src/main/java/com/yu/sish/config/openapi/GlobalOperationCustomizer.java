package com.yu.sish.config.openapi;

import io.swagger.v3.oas.models.Operation;
import io.swagger.v3.oas.models.responses.ApiResponse;
import io.swagger.v3.oas.models.responses.ApiResponses;
import org.springdoc.core.customizers.OperationCustomizer;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;

@Component
public class GlobalOperationCustomizer implements OperationCustomizer {

    @Override
    public Operation customize(Operation operation, HandlerMethod handlerMethod) {
        putIfAbsent(operation.getResponses(), "500",
                "Unexpected server error. Returns the standard envelope with a generic "
                        + "message and no errors map.");
        return operation;
    }

    private void putIfAbsent(ApiResponses responses, String statusCode, String description) {
        if (responses.containsKey(statusCode)) {
            return;
        }
        responses.addApiResponse(statusCode, new ApiResponse().description(description));
    }
}