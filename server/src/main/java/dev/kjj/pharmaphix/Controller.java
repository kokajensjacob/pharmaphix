package dev.kjj.pharmaphix;

import dev.kjj.pharmaphix.domain.PharmaPhixService;
import dev.kjj.pharmaphix.dtos.InventoryResponseDto;
import dev.kjj.pharmaphix.dtos.ProblemResponseDto;
import dev.kjj.pharmaphix.dtos.SparePartDto;
import dev.kjj.pharmaphix.dtos.ToolDto;
import dev.kjj.pharmaphix.model.Problem;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
        return ResponseEntity.ok(new InventoryResponseDto(3));
    }

    @GetMapping("/machines/{machine_id}/problems/{problem_id}")
    public ResponseEntity<ProblemResponseDto> getProblemData(@PathVariable("machine_id") String machineId, @PathVariable("problem_id") String problemId) {
        Problem problem = service.getProblem(problemId);
        return ResponseEntity.ok(ProblemResponseDto.convertToDto(problem));
    }
}
