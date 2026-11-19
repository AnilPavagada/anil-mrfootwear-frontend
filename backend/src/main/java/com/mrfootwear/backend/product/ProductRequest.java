package com.mrfootwear.backend.product;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ProductRequest(
    @NotBlank @Size(max = 150) String name,
    @NotBlank @Size(max = 50) String sku,
    @NotBlank @Size(max = 100) String category,
    @Min(0) int price,
    @Min(0) int stock,
    @Size(max = 2000) String description
) {}
