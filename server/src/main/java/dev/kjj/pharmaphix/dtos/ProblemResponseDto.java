package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Problem;

import java.util.List;

public record ProblemResponseDto(
        String problemId,
        String problemName,
        String problemDescription,
        List<SparePartDto> sparePartsNeeded,
        List<ToolDto> toolsNeeded,
        String instructions) {
    public static ProblemResponseDto convertToDto(Problem problem) {
        return new ProblemResponseDto(
                problem.getId(),
                problem.getName(),
                problem.getDescription(),
                problem.getSparePartsNeeded().stream().map(spn ->
                        new SparePartDto(
                                spn.getSparePart().getId(),
                                spn.getSparePart().getName(),
                                spn.getSpQuantityNeeded(),
                                spn.getSparePart().getQuantityInStock())
                ).toList(),
                problem.getTools().stream().map(ToolDto::convertToDto).toList(),
                problem.getInstructions()
        );
    }
}
