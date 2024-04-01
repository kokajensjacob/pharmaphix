package dev.kjj.pharmaphix.dtos;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public record SparePartsDeductRequestDto(
        @NotBlank
        String sparePartId,
        @Positive
        int amountToDeduct) {
}
