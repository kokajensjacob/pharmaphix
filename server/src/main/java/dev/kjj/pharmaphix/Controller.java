package dev.kjj.pharmaphix;

import dev.kjj.pharmaphix.dtos.InventoryResponseDto;
import dev.kjj.pharmaphix.dtos.ProblemResponseDto;
import dev.kjj.pharmaphix.dtos.SparePartDto;
import dev.kjj.pharmaphix.dtos.ToolDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/inventoryStatus")
    public ResponseEntity<InventoryResponseDto> getInventoryStatus() {
        return ResponseEntity.ok(new InventoryResponseDto(3));
    }

    @GetMapping("/machines/{machine_id}/problems/{problem_id}")
    public ResponseEntity<ProblemResponseDto> getProblemData(@PathVariable("machine_id") String machineId, @PathVariable("problem_id") String problemId) {
        return ResponseEntity.ok(new ProblemResponseDto(
                "123",
                "Faulty wiring",
                "im a description, hello",
                List.of(new SparePartDto("567", "Laser X14", 1, 10)),
                List.of(new ToolDto("Hammer")),
                "1. Do Stuff\n2.Implant laser"
        ));
    }
}
