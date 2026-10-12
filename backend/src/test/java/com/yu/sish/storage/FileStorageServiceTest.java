package com.yu.sish.storage;

import com.yu.sish.support.TestFiles;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;

import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class FileStorageServiceTest {

    private static final String BUCKET = "sish-test";
    private static final String PREFIX = "registrations/";

    @Mock private S3Client s3Client;
    @Mock private S3Presigner resigned;

    @InjectMocks private FileStorageService fileStorageService;

    @BeforeEach
    void injectBucketName() {
        ReflectionTestUtils.setField(fileStorageService, "bucket", BUCKET);
    }

    @Test
    void upload_shouldNamespaceTheKey_andKeepTheOriginalFilename() {
        String key = fileStorageService.upload(TestFiles.pdf("proposal.pdf"));

        assertThat(key)
                .startsWith(PREFIX)
                .endsWith("_proposal.pdf");
    }

    @Test
    void upload_shouldProduceADifferentKeyForEveryCall() {
        String first = fileStorageService.upload(TestFiles.pdf("proposal.pdf"));
        String second = fileStorageService.upload(TestFiles.pdf("proposal.pdf"));

        assertThat(first).isNotEqualTo(second);
    }

    @Test
    void upload_shouldReplaceUnsafeCharactersWithASingleUnderscore() {
        String key = fileStorageService.upload(TestFiles.pdf("my project (final)!.pdf"));

        assertThat(key).endsWith("_my_project_final_.pdf");
    }

    @Test
    void upload_shouldKeepArabicLetters() {
        String key = fileStorageService.upload(TestFiles.pdf("عرض المشروع.pdf"));

        assertThat(key).endsWith("عرض_المشروع.pdf");
    }

    @Test
    void upload_shouldTruncateTheSanitizedNameAt120Characters() {
        String key = fileStorageService.upload(TestFiles.pdf("a".repeat(200) + ".pdf"));

        String sanitized = key.substring(key.indexOf('_') + 1);
        assertThat(sanitized).hasSize(120);
    }

    @Test
    void upload_shouldFallBackToAGenericName_whenTheFilenameIsMissing() {
        String key = fileStorageService.upload(
                TestFiles.of(null, "application/pdf", "x".getBytes()));

        assertThat(key).endsWith("_file");
    }

    @Test
    void upload_shouldSendTheConfiguredBucketAndContentType() {
        ArgumentCaptor<PutObjectRequest> captor = ArgumentCaptor.forClass(PutObjectRequest.class);

        String key = fileStorageService.upload(TestFiles.pdf("proposal.pdf"));

        verify(s3Client).putObject(captor.capture(), any(RequestBody.class));

        PutObjectRequest sent = captor.getValue();
        assertThat(sent.bucket()).isEqualTo(BUCKET);
        assertThat(sent.key()).isEqualTo(key);
        assertThat(sent.contentType()).isEqualTo("application/pdf");
    }

    @Test
    void upload_shouldStreamTheFile_withoutBufferingItWhole() throws IOException {
        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("proposal.pdf");
        when(file.getContentType()).thenReturn("application/pdf");
        when(file.getSize()).thenReturn(11L);
        when(file.getInputStream()).thenReturn(new ByteArrayInputStream("pdf-content".getBytes()));

        fileStorageService.upload(file);

        verify(file).getInputStream();
        verify(file, never()).getBytes();
        verify(file, never()).transferTo(any(File.class));
    }

    @Test
    void upload_shouldWrapIOException_whenTheStreamCannotBeRead() throws IOException {
        MultipartFile file = mock(MultipartFile.class);
        when(file.getOriginalFilename()).thenReturn("proposal.pdf");
        when(file.getContentType()).thenReturn("application/pdf");
        when(file.getInputStream()).thenThrow(new IOException("stream closed"));

        assertThatThrownBy(() -> fileStorageService.upload(file))
                .isInstanceOf(FileStorageException.class)
                .hasMessageContaining("Could not read uploaded file")
                .hasCauseInstanceOf(IOException.class);
    }

    @Test
    void upload_shouldWrapS3Exception_whenTheBucketRejectsTheObject() {
        when(s3Client.putObject(any(PutObjectRequest.class), any(RequestBody.class)))
                .thenThrow(S3Exception.builder().message("access denied").build());

        assertThatThrownBy(() -> fileStorageService.upload(TestFiles.pdf()))
                .isInstanceOf(FileStorageException.class)
                .hasMessageContaining("Could not store uploaded file")
                .hasCauseInstanceOf(S3Exception.class);
    }
}