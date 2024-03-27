package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.dtos.SparePartsDeductRequestDto;
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

    public SparePart[] deductFromInventory(SparePartsDeductRequestDto[] spRequests) {

        SparePart[] spareParts = getSpareParts(spRequests);
        for( int i = 0; i < spRequests.length; i++) {
            spareParts[i].setQuantityInStock(spareParts[i].getQuantityInStock() - spRequests[i].amountToDeduct());
            spareParts[i] = spRepo.save(spareParts[i]);
        }
        return spareParts;
    }

    private SparePart[] getSpareParts(SparePartsDeductRequestDto[] spRequests) {
        SparePart[] retrievedSpareParts = new SparePart[spRequests.length];
        for (int i = 0; i < spRequests.length; i++) {
            SparePart sp = spRepo.findById(spRequests[i].sparePartId()).orElseThrow();
            if (sp.getQuantityInStock() < spRequests[i].amountToDeduct()) {
                throw new IllegalStateException("Not enough inventory.");
            } else {
                retrievedSpareParts[i] = sp;
            }
        }
        return retrievedSpareParts;
    }

    public long getInventoryStatus() {
        return spRepo.findAll().stream()
                .filter(sparePart -> sparePart.getQuantityInStock() < sparePart.getOptimalQuantity())
                .count();
    }
}
