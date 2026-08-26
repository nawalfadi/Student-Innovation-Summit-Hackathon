package com.yu.sish.validation;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = RegistrationValidator.class)
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidRegistration {
    String message() default "Invalid registration";
    Class<?>[] groups() default{};
    Class<? extends Payload>[] payload() default{};
}
