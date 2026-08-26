package com.yu.sish.service;

import com.yu.sish.exception.FileStorageException;
import lombok.RequiredArgsConstructor;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.GetObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;
import software.amazon.awssdk.services.s3.presigner.S3Presigner;
import software.amazon.awssdk.services.s3.presigner.model.GetObjectPresignRequest;

import java.io.IOException;
import java.time.Duration;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class FileStorageService {
    private final S3Client s3Client;
    private final S3Presigner resigned;

    @Value("${app.storage.bucket}")
    private String bucket;

    public String upload(MultipartFile file){
        String key = buildKey(file.getOriginalFilename());

        try {
            PutObjectRequest request = PutObjectRequest.builder()
                    .bucket(bucket)
                    .key(key)
                    .contentType(file.getContentType())
                    .build();

            s3Client.putObject(request,
                    RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

            log.info("Uploaded file — key: {}, size: {} bytes", key, file.getSize());
            return key;

        } catch (IOException e) {
            log.error("Failed to read uploaded file stream", e);
            throw new FileStorageException("Could not read uploaded file", e);
        } catch (S3Exception e) {
            log.error("S3 upload failed for key: {}", key, e);
            throw new FileStorageException("Could not store uploaded file", e);
        }
    }


    public String getPresignedDownloadUrl(String objectKey) {
        GetObjectRequest getRequest = GetObjectRequest.builder()
                .bucket(bucket)
                .key(objectKey)
                .build();

        GetObjectPresignRequest presignRequest = GetObjectPresignRequest.builder()
                .signatureDuration(Duration.ofMinutes(15))
                .getObjectRequest(getRequest)
                .build();

        return resigned.presignGetObject(presignRequest).url().toString();
    }



    private String buildKey(String originalFilename) {
        String sanitized = sanitize(originalFilename);
        return "registrations/" + UUID.randomUUID() + "_" + sanitized;
    }

    private String sanitize(String filename){
        if(filename == null || filename.isBlank()) return "file";
        String cleaned = filename
                .replaceAll("[^\\p{L}\\p{N}._-]", "_")
                .replaceAll("_+", "_");
        return cleaned.length() > 120 ? cleaned.substring(0,120) : cleaned;
    }
}
