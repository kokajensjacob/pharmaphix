package dev.kjj.pharmaphix;

import dev.kjj.pharmaphix.domain.PharmaPhixService;
import dev.kjj.pharmaphix.dtos.*;
import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
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
    public ResponseEntity<Void> createSparePart(@RequestBody SparePartPostRequestDto body) {
        SparePart created = service.createNewSparePart(body);
        return ResponseEntity.created(URI.create("/api/spare-parts/" + created.getId())).build();
    }

    @PatchMapping("/spare-parts")
    public ResponseEntity<Void> deductSparePartsFromInventory(@RequestBody SparePartsDeductRequestDto[] body) {
        service.deductFromInventory(body);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/machines")
    public ResponseEntity<List<MachineDto>> getAllMachines() {
        List<MachineDto> machineDtos = service.getAllMachines().stream()
                .map(MachineDto::convertToDto)
                .toList();
        return ResponseEntity.ok(machineDtos);
    }

    @GetMapping("/machines/{machine_id}/problems")
    public ResponseEntity<List<ProblemListDto>> getProblemsForMachine(@PathVariable("machine_id") String machineId) {
        List<ProblemListDto> problemList = service.getProblemsForMachine(machineId)
                .stream()
                .map(ProblemListDto::convertToDto)
                .toList();
        return ResponseEntity.ok(problemList);
    }
}
