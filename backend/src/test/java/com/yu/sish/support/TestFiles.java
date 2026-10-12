package com.yu.sish.support;

import org.springframework.mock.web.MockMultipartFile;

public final class TestFiles {

    public static final String FIELD = "projectFile";

    private TestFiles() {
    }

    public static MockMultipartFile pdf() {
        return pdf("proposal.pdf");
    }

    public static MockMultipartFile pdf(String originalFilename) {
        return of(originalFilename, "application/pdf", "pdf-content".getBytes());
    }

    public static MockMultipartFile of(String originalFilename, String contentType, byte[] content) {
        return new MockMultipartFile(FIELD, originalFilename, contentType, content);
    }

    public static MockMultipartFile empty() {
        return new MockMultipartFile(FIELD, "proposal.pdf", "application/pdf", new byte[0]);
    }

    public static MockMultipartFile unsupportedType() {
        return of("virus.exe", "application/x-msdownload", "nope".getBytes());
    }
}