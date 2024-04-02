package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.SparePart;

public record SparePartPostResponseDto(
        String id,
        String name,
        int optimalQuantity,
        int quantityInStock,
        int quantityInRepair,
        double cost,
        double failureRate,
        double repairTime,
        MachineDto associatedMachine
) {
    public static SparePartPostResponseDto convertToDto(SparePart sparePart) {
        return new SparePartPostResponseDto(
                sparePart.getId(),
                sparePart.getName(),
                sparePart.getOptimalQuantity(),
                sparePart.getQuantityInStock(),
                sparePart.getQuantityInRepair(),
                sparePart.getCost(),
                sparePart.getFailureRate(),
                sparePart.getRepairTime(),
                MachineDto.convertToDto(sparePart.getMachine())
        );
    }
}