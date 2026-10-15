package com.yu.sish.shared;

import com.yu.sish.registration.RegistrationNotFoundException;
import com.yu.sish.storage.FileStorageException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.server.ResponseStatusException;

import java.util.LinkedHashMap;
import java.util.Map;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final String EMAIL_TYPE_CONSTRAINT = "uq_reg_email_type";

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

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiEnvelope> handleUnreadableBody(
            HttpMessageNotReadableException ex) {

        log.debug("Request body could not be parsed");
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(msg("validation.malformedRequest"), null));
    }

    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<ApiEnvelope> handleTypeMismatch(
            MethodArgumentTypeMismatchException ex) {

        log.debug("Type mismatch on parameter: {}", ex.getName());
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(msg("validation.malformedRequest"), null));
    }

    @ExceptionHandler(HttpMediaTypeNotSupportedException.class)
    public ResponseEntity<ApiEnvelope> handleUnsupportedMediaType(
            HttpMediaTypeNotSupportedException ex) {

        log.debug("Unsupported content type: {}", ex.getContentType());
        return ResponseEntity.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE)
                .body(ApiEnvelope.error(msg("validation.malformedRequest"), null));
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ApiEnvelope> handleTooLarge(MaxUploadSizeExceededException ex) {
        String message = msg("validation.projectFileSize");
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(message, Map.of("projectFile", message)));
    }

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ApiEnvelope> handleDataIntegrity(
            DataIntegrityViolationException ex) {

        if (isDuplicateRegistration(ex)) {
            log.info("Rejected a duplicate registration");
            String message = msg("validation.emailAlreadyRegistered");
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiEnvelope.error(message, Map.of("email", message)));
        }

        log.error("Unexpected constraint violation", ex);
        return ResponseEntity.badRequest()
                .body(ApiEnvelope.error(msg("validation.genericError"), null));
    }

    @ExceptionHandler(RegistrationNotFoundException.class)
    public ResponseEntity<ApiEnvelope> handleNotFound(RegistrationNotFoundException ex) {
        log.debug(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiEnvelope.error(msg("validation.notFound"), null));
    }

    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<ApiEnvelope> handleResponseStatus(ResponseStatusException ex) {
        HttpStatus status = HttpStatus.resolve(ex.getStatusCode().value());
        if (status == null) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        if (status.is5xxServerError()) {
            log.error("Server-side ResponseStatusException", ex);
        } else {
            log.debug("Request rejected with {}", status);
        }

        return ResponseEntity.status(status)
                .body(ApiEnvelope.error(messageFor(status), null));
    }

    @ExceptionHandler(FileStorageException.class)
    public ResponseEntity<ApiEnvelope> handleStorageFailure(FileStorageException ex) {
        log.error("File storage failure", ex);
        String message = msg("validation.projectFileUpload");
        return ResponseEntity.internalServerError()
                .body(ApiEnvelope.error(message, Map.of("projectFile", message)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiEnvelope> handleUnexpected(Exception ex) {
        log.error("Unhandled exception", ex);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiEnvelope.error(msg("validation.genericError"), null));
    }


    private boolean isDuplicateRegistration(DataIntegrityViolationException ex) {
        String cause = ex.getMostSpecificCause().getMessage();
        return cause != null && cause.toLowerCase().contains(EMAIL_TYPE_CONSTRAINT);
    }

    private String messageFor(HttpStatus status) {
        return status == HttpStatus.UNAUTHORIZED
                ? msg("validation.invalidCredentials")
                : msg("validation.genericError");
    }

    private String msg(String key) {
        return messageSource.getMessage(key, null, LocaleContextHolder.getLocale());
    }
}