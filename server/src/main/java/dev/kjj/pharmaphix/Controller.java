package dev.kjj.pharmaphix;

import dev.kjj.pharmaphix.domain.PharmaPhixService;
import dev.kjj.pharmaphix.dtos.*;
import dev.kjj.pharmaphix.model.Problem;
import dev.kjj.pharmaphix.model.SparePart;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    private PharmaPhixService service;

    public Controller(PharmaPhixService service) {
        this.service = service;
    }

    @GetMapping("/inventoryStatus")
    public ResponseEntity<InventoryResponseDto> getInventoryStatus() {
        long needToBeOrdered = service.getTotalSparePartsInReapir();
        return ResponseEntity.ok(new InventoryResponseDto(needToBeOrdered));
    }

    @GetMapping("/machines/{machine_id}/problems/{problem_id}")
    public ResponseEntity<ProblemResponseDto> getProblemData(@PathVariable("machine_id") String machineId, @PathVariable("problem_id") String problemId) {
        Problem problem = service.getProblem(problemId);
        return ResponseEntity.ok(ProblemResponseDto.convertToDto(problem));
    }

    @PatchMapping("/spare-parts/{id}")
    public ResponseEntity<SparePartDto> deductSparePartFromInventory(@PathVariable String id, @RequestParam int amountToDeduct) {
        SparePart sparePart = service.deductFromInventory(id, amountToDeduct);
        return ResponseEntity.ok(SparePartDto.convertToDtos(sparePart));
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
}
