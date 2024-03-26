package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.Problem;
import org.springframework.stereotype.Service;

@Service
public class PharmaPhixService {
    private IProblemRepository problemRepo;

    public PharmaPhixService(IProblemRepository problemRepo) {
        this.problemRepo = problemRepo;
    }

    public Problem getProblem(String problemId) {
        return problemRepo.findById(problemId).orElseThrow();
    }
}
