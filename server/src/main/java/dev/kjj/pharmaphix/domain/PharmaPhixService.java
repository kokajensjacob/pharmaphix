package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
import org.springframework.stereotype.Service;

@Service
public class PharmaPhixService {
    private IProblemRepository problemRepo;
    private ISparePartRepository spRepo;

    public PharmaPhixService(IProblemRepository problemRepo, ISparePartRepository spRepo) {
        this.problemRepo = problemRepo;
        this.spRepo = spRepo;
    }

    public Problem getProblem(String problemId) {
        return problemRepo.findById(problemId).orElseThrow();
    }

    public SparePart deductFromInventory(String id, int amountToDeduct) {
        SparePart sparePart = spRepo.findById(id).orElseThrow();
        sparePart.setQuantityInStock(sparePart.getQuantityInStock() - amountToDeduct);
        return spRepo.save(sparePart);
    }
}
