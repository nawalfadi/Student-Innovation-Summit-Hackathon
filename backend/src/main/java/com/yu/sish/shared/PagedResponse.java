package com.yu.sish.shared;

import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.data.domain.Page;

import java.util.List;

public record PagedResponse<T>(
        List<T> content,

        @Schema(description = "Starts at 0.", example = "0")
        int page,

        @Schema(example = "20")
        int size,

        long totalElements,

        int totalPages
) {
    public static <T> PagedResponse<T> from(Page<T> page) {
        return new PagedResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages());
    }
}
