package dev.kjj.pharmaphix.dtos;

import dev.kjj.pharmaphix.model.Problem;

public record ProblemListDto(String problemId, String problemName) {

    public static ProblemListDto convertToDto(Problem problem){
        return new ProblemListDto(problem.getId(), problem.getName());
    }
}
