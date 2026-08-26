package com.yu.sish.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "registrations")
@Getter
@Setter
@NoArgsConstructor
public class Registration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(name = "university_id")
    private String universityId;

    @Column(name = "university_name", nullable = false)
    private String universityName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String phone;

    @Column(name = "participation_type", nullable = false)
    private String participationType;

    private String track;

    @Column(name = "is_team", nullable = false)
    private Boolean isTeam;

    @Column(name = "team_name")
    private String teamName;

    private String major;

    @Column(name = "university_year")
    private String universityYear;

    @Column(name = "graduation_year")
    private String graduationYear;

    @Column(name = "project_idea", nullable = false, columnDefinition = "TEXT")
    private String projectIdea;

    @Column(name = "file_object_key")
    private String fileObjectKey;

    @Column(name = "file_original_name")
    private String fileOriginalName;

    @Column(name = "file_content_type")
    private String fileContentType;

    @Column(name = "file_size_bytes")
    private Long fileSizeBytes;

    @Column(nullable = false)
    private String locale = "ar";

    @Column(nullable = false)
    private String status = "PENDING";

    @Column(nullable = false)
    private String source = "API";

    @Column(name = "created_at", nullable = false, updatable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "registration",
            cascade = CascadeType.ALL,
            orphanRemoval = true,
            fetch = FetchType.LAZY)
    private List<TeamMember> members = new ArrayList<>();

    @PrePersist
    void prePersist() {
        if (createdAt == null) createdAt = OffsetDateTime.now();
    }
}
