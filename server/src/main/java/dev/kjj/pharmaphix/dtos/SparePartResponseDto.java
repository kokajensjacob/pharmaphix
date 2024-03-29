package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.SparePart;

public record SparePartResponseDto(
        String id,
        String name,
        int quantityInStock,
        int optimalQuantity,
        int quantityInRepair,
        double cost,
        double failureRate,
        double repairTime
) {

    public static SparePartResponseDto convertToDto(SparePart sparePart) {
        return new SparePartResponseDto(
                sparePart.getId(),
                sparePart.getName(),
                sparePart.getQuantityInStock(),
                sparePart.getOptimalQuantity(),
                sparePart.getQuantityInRepair(),
                sparePart.getCost(),
                sparePart.getFailureRate(),
                sparePart.getRepairTime()
        );
    }
}
