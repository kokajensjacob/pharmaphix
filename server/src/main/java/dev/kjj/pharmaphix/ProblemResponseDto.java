package dev.kjj.pharmaphix;

import java.util.List;

public record ProblemResponseDto(
        String problemId,
        String problemName,
        String problemDescription,
        List<SparePartDto> sparePartsNeeded,
        List<ToolDto> toolsNeeded,
        String instructions) {
}
