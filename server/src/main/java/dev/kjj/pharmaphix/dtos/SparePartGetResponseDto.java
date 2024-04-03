package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.ProblemSparePart;
import dev.kjj.pharmaphix.model.SparePart;

import java.util.List;

public record SparePartGetResponseDto(
        SparePartResponseDto sparePart,
        MachineDto associatedMachine,
        List<ProblemListDto> associatedProblems
) {
    public static SparePartGetResponseDto convertToDto(SparePart sparePart) {
        return new SparePartGetResponseDto(
                SparePartResponseDto.convertToDto(sparePart),
                MachineDto.convertToDto(sparePart.getMachine()),
                sparePart.getAssociatedProblems().stream()
                        .map(psp -> ProblemListDto.convertToDto(psp.getProblem()))
                        .toList()
        );
    }
}
