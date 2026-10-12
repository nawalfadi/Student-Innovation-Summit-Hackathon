package com.yu.sish.support;

import com.yu.sish.shared.PagedResponse;

import java.util.Arrays;
import java.util.List;

public class PagedResponseTestDataBuilder<T> {

    private List<T> content = List.of();
    private int page = 0;
    private int size = 20;
    private Long totalElements;
    private Integer totalPages;

    @SafeVarargs
    public static <T> PagedResponseTestDataBuilder<T> aPageOf(T... content) {
        PagedResponseTestDataBuilder<T> builder = new PagedResponseTestDataBuilder<>();
        builder.content = Arrays.asList(content);
        return builder;
    }

    public static <T> PagedResponseTestDataBuilder<T> anEmptyPageOf(Class<T> elementType) {
        return new PagedResponseTestDataBuilder<>();
    }

    public PagedResponseTestDataBuilder<T> withPage(int page) {
        this.page = page;
        return this;
    }

    public PagedResponseTestDataBuilder<T> withSize(int size) {
        this.size = size;
        return this;
    }

    public PagedResponseTestDataBuilder<T> withTotalElements(long totalElements) {
        this.totalElements = totalElements;
        return this;
    }

    public PagedResponseTestDataBuilder<T> withTotalPages(int totalPages) {
        this.totalPages = totalPages;
        return this;
    }

    public PagedResponse<T> build() {
        long elements = totalElements != null ? totalElements : content.size();
        int pages = totalPages != null
                ? totalPages
                : (int) Math.ceil((double) elements / size);

        return new PagedResponse<>(content, page, size, elements, pages);
    }
}