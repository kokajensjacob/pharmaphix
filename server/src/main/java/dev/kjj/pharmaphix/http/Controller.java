package dev.kjj.pharmaphix.http;

import dev.kjj.pharmaphix.domain.PharmaPhixService;
import dev.kjj.pharmaphix.dtos.*;
import dev.kjj.pharmaphix.model.Machine;
import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.Collection;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    private PharmaPhixService service;

    public Controller(PharmaPhixService service) {
        this.service = service;
    }

    @GetMapping("/spare-parts/in-repair")
    public ResponseEntity<SparePartInRepairDto> getTotalUnitsInRepair() {
        long unitsInRepair = service.getTotalSparePartsInRepair();
        return ResponseEntity.ok(new SparePartInRepairDto(unitsInRepair));
    }

    @GetMapping("/spare-parts/in-repair-list")
    public ResponseEntity<List<SparePartInRepairListResponseDto>> getUnitsInRepair() {
        List<SparePartInRepairListResponseDto> responseBody = service.getSparePartsInRepair().stream()
                .map(SparePartInRepairListResponseDto::convertToDto)
                .toList();
        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/problems/{problem_id}")
    public ResponseEntity<ProblemResponseDto> getProblemData(@PathVariable("problem_id") String problemId) {
        Problem problem = service.getProblem(problemId);
        return ResponseEntity.ok(ProblemResponseDto.convertToDto(problem));
    }

    @GetMapping("/spare-parts")
    public ResponseEntity<List<SparePartResponseDto>> getSpareParts() {
        List<SparePartResponseDto> spareParts = service.getAllSpareParts().stream()
                .map(SparePartResponseDto::convertToDto)
                .toList();
        return ResponseEntity.ok(spareParts);
    }

    @PostMapping("/spare-parts")
    public ResponseEntity<Void> createSparePart(@Valid @RequestBody SparePartPostRequestDto body) {
        SparePart created = service.createNewSparePart(body);
        return ResponseEntity.created(URI.create("/api/spare-parts/" + created.getId())).build();
    }

    @PatchMapping("/spare-parts")
    public ResponseEntity<Void> deductSparePartsFromInventory(@RequestBody SparePartsDeductRequestDto[] body) {
        service.deductFromInventory(body);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/spare-parts/{sparePartId}")
    public ResponseEntity<Void> repairSparePart(@PathVariable String sparePartId, @RequestBody SparePartRepairRequestDto body) {
        SparePart sparePart = service.repairSparePart(sparePartId, body.quantityToRepair());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/machines")
    public ResponseEntity<List<MachineDto>> getAllMachines() {
        List<MachineDto> machineDtos = service.getAllMachines().stream()
                .map(MachineDto::convertToDto)
                .toList();
        return ResponseEntity.ok(machineDtos);
    }

    @GetMapping("/machines/{machine_id}/problems")
    public ResponseEntity<MachineProblemsResponseDto> getProblemsForMachine(@PathVariable("machine_id") String machineId) {
        Machine retrieved = service.getMachine(machineId);
        return ResponseEntity.ok(MachineProblemsResponseDto.convertToDto(retrieved));
    }
}
