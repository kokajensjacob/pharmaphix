package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.SparePart;

public record SparePartDto(
        String sparePartId,
        String sparePartName,
        int quantityNeeded,
        int quantityInStock
) {
    public static SparePartDto convertToDto(SparePart sparePart) {
        return new SparePartDto(sparePart.getId(), sparePart.getName(), sparePart.getOptimalQuantity(), sparePart.getQuantityInStock());
    }
}
