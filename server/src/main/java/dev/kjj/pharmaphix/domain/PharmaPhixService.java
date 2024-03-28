package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.dtos.SparePartPostRequestDto;
import dev.kjj.pharmaphix.dtos.SparePartsDeductRequestDto;
import dev.kjj.pharmaphix.model.Machine;
import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
import dev.kjj.pharmaphix.model.SparePartCalculator;
import org.springframework.stereotype.Service;

@Service
public class PharmaPhixService {
    private IProblemRepository problemRepo;
    private ISparePartRepository spRepo;
    private IMachineRepository machineRepo;

    public PharmaPhixService(IProblemRepository problemRepo, ISparePartRepository spRepo, IMachineRepository machineRepo) {
        this.problemRepo = problemRepo;
        this.spRepo = spRepo;
        this.machineRepo = machineRepo;
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

    private void setOptimalQuantity(SparePart sparePart) {
        if (sparePart.getOptimalQuantity() == 0) {
            sparePart.setOptimalQuantity(SparePartCalculator.optimalStockValue(
                    sparePart.getFailureRate(),
                    sparePart.getCost(),
                    sparePart.getMachine().getCost()
            ));
            spRepo.save(sparePart);
        }
    }

    public SparePart createNewSparePart(SparePartPostRequestDto body) {
        Machine associatedMachine = machineRepo.findById(body.machineId()).orElseThrow();
        return spRepo.save(body.toSparePart(associatedMachine));
    }
}
