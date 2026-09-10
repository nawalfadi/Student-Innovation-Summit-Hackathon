package com.yu.sish.config.openapi;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
@EnableConfigurationProperties(OpenApiProperties.class)
@RequiredArgsConstructor
public class OpenApiConfig {

    public static final String BEARER_SCHEME = "bearer-jwt";

    private final OpenApiProperties properties;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(info())
                .servers(servers())
                .tags(tags())
                .components(components());
    }

    private Info info() {
        return new Info()
                .title(properties.title())
                .description(properties.description())
                .version(properties.version())
                .contact(new Contact()
                        .name(properties.contactName())
                        .url(properties.contactUrl()));
    }

    private List<Server> servers() {
        return properties.servers().stream()
                .map(s -> new Server().url(s.url()).description(s.description()))
                .toList();
    }

    private List<Tag> tags() {
        return List.of(
                new Tag().name("Registrations")
                        .description("Public endpoint used by the registration form. No authentication."),
                new Tag().name("Admin — Authentication")
                        .description("Admin login. Returns the bearer token used by all admin endpoints."),
                new Tag().name("Admin — Registrations")
                        .description("Viewing and managing submitted registrations. Requires an admin token.")
        );
    }

    private Components components() {
        return new Components()
                .addSecuritySchemes(BEARER_SCHEME, new SecurityScheme()
                        .type(SecurityScheme.Type.HTTP)
                        .scheme("bearer")
                        .bearerFormat("JWT")
                        .description("Admin token from POST /api/v1/admin/login"));
    }
}