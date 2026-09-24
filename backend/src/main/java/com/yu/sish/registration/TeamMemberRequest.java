package com.yu.sish.registration;

import io.swagger.v3.oas.annotations.media.Schema;

record TeamMemberRequest(
        @Schema(example = "Sara Ahmed")
        String name,

        @Schema(example = "sara@example.com")
        String email
) {}