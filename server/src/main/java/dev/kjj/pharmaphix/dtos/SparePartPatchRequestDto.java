package dev.kjj.pharmaphix.dtos;

import jakarta.validation.constraints.PositiveOrZero;

public record SparePartPatchRequestDto(
        @PositiveOrZero
        int setStock
) {
}
