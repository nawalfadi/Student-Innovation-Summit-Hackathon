package com.yu.sish.config.openapi;

import org.springframework.boot.context.properties.ConfigurationProperties;

import java.util.List;

@ConfigurationProperties(prefix = "app.openapi")
public record OpenApiProperties(
        String title,
        String description,
        String version,
        String contactName,
        String contactUrl,
        List<ServerEntry> servers
) {
    public record ServerEntry(String url, String description) {}
}