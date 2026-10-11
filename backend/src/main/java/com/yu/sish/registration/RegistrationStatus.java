package com.yu.sish.registration;

public enum RegistrationStatus {
    PENDING,
    REVIEWED,
    ACCEPTED;

    public static RegistrationStatus from(String value){
        return valueOf(value.trim().toUpperCase());
    }

    public String toApiValue(){
        return name().toLowerCase();
    }
}
