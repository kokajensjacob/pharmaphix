package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Machine;
import dev.kjj.pharmaphix.model.SparePart;

public record SparePartPostRequestDto(
        String name,
        double cost,
        double failureRate,
        int quantityInStock,
        double repairTime,
        String machineId
        ) {
    public SparePart toSparePart(Machine associatedMachine) {
        return new SparePart(
                this.name(),
                this.quantityInStock(),
                this.cost(),
                this.failureRate(),
                this.repairTime(),
                associatedMachine);
    }
}
