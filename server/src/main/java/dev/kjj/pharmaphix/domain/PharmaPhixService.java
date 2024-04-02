package dev.kjj.pharmaphix.domain;

import dev.kjj.pharmaphix.domain.exceptions.MachineEntityNotFoundException;
import dev.kjj.pharmaphix.domain.exceptions.ProblemEntityNotFoundException;
import dev.kjj.pharmaphix.domain.exceptions.SparePartEntityNotFoundException;
import dev.kjj.pharmaphix.domain.exceptions.InsufficientInventoryException;
import dev.kjj.pharmaphix.dtos.SparePartPostRequestDto;
import dev.kjj.pharmaphix.dtos.SparePartsDeductRequestDto;
import dev.kjj.pharmaphix.model.Machine;
import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
import dev.kjj.pharmaphix.model.SparePartCalculator;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

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
        return problemRepo.findById(problemId).orElseThrow(ProblemEntityNotFoundException::new);
    }

    public SparePart[] deductFromInventory(SparePartsDeductRequestDto[] spRequests) {

        SparePart[] spareParts = getSpareParts(spRequests);
        for (int i = 0; i < spRequests.length; i++) {
            spareParts[i].setQuantityInStock(spareParts[i].getQuantityInStock() - spRequests[i].amountToDeduct());
            spareParts[i].setQuantityInRepair(spareParts[i].getQuantityInRepair() + spRequests[i].amountToDeduct());
            spareParts[i] = spRepo.save(spareParts[i]);
        }
        return spareParts;
    }

    private SparePart[] getSpareParts(SparePartsDeductRequestDto[] spRequests) {
        SparePart[] retrievedSpareParts = new SparePart[spRequests.length];
        for (int i = 0; i < spRequests.length; i++) {
            SparePart sp = spRepo.findById(spRequests[i].sparePartId()).orElseThrow(SparePartEntityNotFoundException::new);
            if (sp.getQuantityInStock() < spRequests[i].amountToDeduct()) {
                throw new InsufficientInventoryException();
            } else {
                retrievedSpareParts[i] = sp;
            }
        }
        return retrievedSpareParts;
    }

    public SparePart createNewSparePart(SparePartPostRequestDto body) {
        Machine associatedMachine = machineRepo.findById(body.machineId()).orElseThrow(MachineEntityNotFoundException::new);
        return spRepo.save(body.toSparePart(associatedMachine));
    }

    public long getTotalSparePartsInRepair() {
        return this.getSparePartsInRepair().stream()
                .map(SparePart::getQuantityInRepair)
                .reduce(Integer::sum)
                .orElse(0);
    }

    public List<Machine> getAllMachines() {
        return machineRepo.findAll();
    }

    public List<SparePart> getAllSpareParts() {
        return spRepo.findAll();
    }

    public Machine getMachine(String machineId) {
        return machineRepo.findById(machineId).orElseThrow(MachineEntityNotFoundException::new);
    }

    public List<SparePart> getSparePartsInRepair() {
        return spRepo.findSparePartsByQuantityInRepairGreaterThan(0);
    }

    public SparePart repairSparePart(String sparePartId, int quantityToRepair) {
        SparePart sparePart = spRepo.findById(sparePartId).orElseThrow(SparePartEntityNotFoundException::new);
        if (sparePart.getQuantityInRepair() < quantityToRepair) {
            throw new InsufficientInventoryException();
        }
        sparePart.setQuantityInRepair(sparePart.getQuantityInRepair() - quantityToRepair);
        sparePart.setQuantityInStock(sparePart.getQuantityInStock() + quantityToRepair);
        return spRepo.save(sparePart);
    }

    private List<SparePart> getSparePartsOverstocked() {
        return spRepo.findAll().stream()
                .filter(sp -> sp.getQuantityInRepair() + sp.getQuantityInStock() > sp.getOptimalQuantity())
                .toList();
    }

    private List<SparePart> getSparePartsUnderstocked() {
        return spRepo.findAll().stream()
                .filter(sp -> sp.getQuantityInRepair() + sp.getQuantityInStock() < sp.getOptimalQuantity())
                .toList();
    }

    public int getSparePartsOverstockedCount() {
        return this.getSparePartsOverstocked().size();
    }

    public int getSparePartUnitsCountOverstocked() {
        return this.getSparePartsOverstocked().stream()
                .map(sp -> sp.getQuantityInStock() + sp.getQuantityInRepair() - sp.getOptimalQuantity())
                .reduce(Integer::sum)
                .orElse(0);
    }

    public int getSparePartsUnderstockedCount() {
        return this.getSparePartsUnderstocked().size();
    }

    public int getSparePartUnitsCountUnderstocked() {
        return getSparePartsUnitsDeviation(getSparePartsUnderstocked());
    }

    private int getSparePartsUnitsDeviation(List<SparePart> spareParts) {
        return spareParts.stream()
                .map(sp -> Math.abs(sp.getQuantityInStock() + sp.getQuantityInRepair() - sp.getOptimalQuantity()))
                .reduce(Integer::sum)
                .orElse(0);
    }
}
