package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.SparePart;

public record SparePartInRepairListResponseDto(
        String id,
        String name,
        int quantityInRepair,
        String associatedMachineName
) {
    public static SparePartInRepairListResponseDto convertToDto(SparePart sparePart) {
        return new SparePartInRepairListResponseDto(
                sparePart.getId(),
                sparePart.getName(),
                sparePart.getQuantityInRepair(),
                sparePart.getMachine().getName()
        );
    }
}
