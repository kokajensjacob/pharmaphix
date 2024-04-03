package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Machine;

import java.util.List;

public record MachineProblemsResponseDto(
        String machineName,
        int machineQuantity,
        double machineCost,
        List<ProblemListDto> problems
) {
    public static MachineProblemsResponseDto convertToDto(Machine machine) {
        return new MachineProblemsResponseDto(
                machine.getName(),
                machine.getQuantity(),
                machine.getCost(),
                machine.getProblems().stream()
                        .map(ProblemListDto::convertToDto)
                        .toList()
        );
    }
}
