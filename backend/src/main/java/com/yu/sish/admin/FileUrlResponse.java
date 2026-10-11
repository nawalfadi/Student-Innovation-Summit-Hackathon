package com.yu.sish.admin;

import io.swagger.v3.oas.annotations.media.Schema;

record FileUrlResponse(

        @Schema(description = "Download the file from this link directly. Expires in 15 minutes.")
        String url
) {}