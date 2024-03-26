package dev.kjj.pharmaphix.dtos;

public record SparePartDto(
        String sparePartId,
        String sparePartName,
        int quantityNeeded,
        int quantityInStock
) {
}
