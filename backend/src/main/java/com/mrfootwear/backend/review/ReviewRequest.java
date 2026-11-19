package com.mrfootwear.backend.review;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ReviewRequest(
    @NotBlank @Size(max = 100) String name,
    @NotBlank @Size(max = 600) String feedback,
    @Min(1) @Max(5) int rating
) {}
