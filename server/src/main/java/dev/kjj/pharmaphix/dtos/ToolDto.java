package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Tool;

public record ToolDto(
        String toolName
) {
    public static ToolDto convertToDto(Tool tool) {
        return new ToolDto(tool.getName());
    }
}
