package dev.kjj.pharmaphix;

public record SparePartDto(
        String sparePartId,
        String sparePartName,
        int quantityNeeded,
        int quantityInStock
) {
}
