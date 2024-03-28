package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Machine;

public record MachineDto(String machineId, String machineName) {

    public static MachineDto convertToDto(Machine machine) {
        return new MachineDto(machine.getId(), machine.getName());
    }
}
