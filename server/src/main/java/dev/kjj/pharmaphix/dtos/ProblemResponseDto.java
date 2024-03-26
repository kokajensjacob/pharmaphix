package dev.kjj.pharmaphix.dtos;

import java.util.List;

public record ProblemResponseDto(
        String problemId,
        String problemName,
        String problemDescription,
        List<SparePartDto> sparePartsNeeded,
        List<ToolDto> toolsNeeded,
        String instructions) {
}
