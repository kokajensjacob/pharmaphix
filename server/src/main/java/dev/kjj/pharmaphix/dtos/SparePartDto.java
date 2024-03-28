package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.SparePart;

import java.util.ArrayList;
import java.util.List;

public record SparePartDto(
        String sparePartId,
        String sparePartName,
        int quantityNeeded,
        int quantityInStock
) {
    public static SparePartDto convertToDtos(SparePart sparePart) {
        return new SparePartDto(
                sparePart.getId(),
                sparePart.getName(),
                sparePart.getOptimalQuantity(),
                sparePart.getQuantityInStock());
    }

    public static List<SparePartDto> convertToDtos(SparePart[] spareParts) {
        List<SparePartDto> spDtoList = new ArrayList<>();
        for (var sp: spareParts) {
            spDtoList.add(convertToDtos(sp));
        }
        return spDtoList;
    }
}
