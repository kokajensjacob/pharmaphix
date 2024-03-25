package dev.kjj.pharmaphix;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/inventoryStatus")
    public ResponseEntity<InventoryResponseDto> getInventoryStatus() {
        return ResponseEntity.ok(new InventoryResponseDto(3));
    }
}
