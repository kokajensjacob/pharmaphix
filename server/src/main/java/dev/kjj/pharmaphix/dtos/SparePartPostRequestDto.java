package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Machine;
import dev.kjj.pharmaphix.model.SparePart;
import jakarta.validation.constraints.*;

public record SparePartPostRequestDto(
        @NotBlank
        String name,

        @Positive
        double cost,

        @Min(value = 0)
        double failureRate,

        @Min(value = 0)
        int quantityInStock,

        @Min(value = 0)
        double repairTime,

        @NotNull
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
