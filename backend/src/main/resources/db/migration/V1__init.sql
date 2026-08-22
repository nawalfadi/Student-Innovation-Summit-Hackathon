CREATE TABLE registrations (
         id BIGSERIAL PRIMARY KEY,
         full_name VARCHAR(255) NOT NULL,
         university_id VARCHAR(100),
         university_name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         phone VARCHAR(30) NOT NULL,
         participation_type VARCHAR(20) NOT NULL,
         track VARCHAR(20),
         is_team BOOLEAN NOT NULL DEFAULT TRUE,
         team_name VARCHAR(255),
         major VARCHAR(255),
         university_year VARCHAR(10),
         graduation_year VARCHAR(4),
         project_idea TEXT NOT NULL,
         file_object_key VARCHAR(500),
         file_original_name VARCHAR(255),
         file_content_type VARCHAR(120),
         file_size_bytes BIGINT,
         locale VARCHAR(5) NOT NULL DEFAULT 'ar',
         status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
         source VARCHAR(20) NOT NULL DEFAULT 'API',
         created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
         CONSTRAINT uq_reg_email_type UNIQUE (email, participation_type)
);

CREATE TABLE team_members (
         id BIGSERIAL PRIMARY KEY,
         registration_id BIGINT NOT NULL REFERENCES registrations(id) ON DELETE CASCADE,
         name VARCHAR(255) NOT NULL,
         email VARCHAR(255) NOT NULL,
         member_order INT NOT NULL DEFAULT 0
);

CREATE TABLE admins (
                        id BIGSERIAL PRIMARY KEY,
                        username VARCHAR(100) NOT NULL UNIQUE,
                        password_hash VARCHAR(255) NOT NULL,
                        created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_reg_created_at ON registrations(created_at DESC);
CREATE INDEX idx_reg_status ON registrations(status);
CREATE INDEX idx_members_reg_id ON team_members(registration_id);