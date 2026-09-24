package com.yu.sish.shared;

import com.yu.sish.storage.FileStorageException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private final MessageSource messageSource;

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiEnvelope> handleValidation(
            MethodArgumentNotValidException ex) {

        Map<String, String> errors = new LinkedHashMap<>();
        for (FieldError fe : ex.getBindingResult().getFieldErrors()) {
            errors.putIfAbsent(fe.getField(), fe.getDefaultMessage());
        }

        log.debug("Validation failed on fields: {}", errors.keySet());
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(msg("validation.genericError"), errors));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiEnvelope> handleDuplicate(
            DataIntegrityViolationException ex) {

        log.warn("Constraint violation on insert: {}", ex.getMostSpecificCause().getMessage());

        String message = msg("validation.emailAlreadyRegistered");
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiEnvelope.error(message, Map.of("email", message)));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiEnvelope> handleTooLarge(MaxUploadSizeExceededException ex) {
        String message = msg("validation.projectFileSize");
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(message, Map.of("projectFile", message)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiEnvelope> handleUnexpected(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiEnvelope.error(msg("validation.genericError"), null));
    }

    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ApiEnvelope> handleStorageFailure(FileStorageException ex) {
        log.error("File storage failure", ex);
        String message = msg("validation.projectFileUpload");
        return ResponseEntity.internalServerError()
                .body(ApiEnvelope.error(message, Map.of("projectFile", message)));
    }

    private String msg(String key) {
        return messageSource.getMessage(key, null, LocaleContextHolder.getLocale());
    }
}