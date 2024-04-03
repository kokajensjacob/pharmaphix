package dev.kjj.pharmaphix.http;

import dev.kjj.pharmaphix.domain.exceptions.*;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class PharmaPhixExceptionHandler extends ResponseEntityExceptionHandler {
    @ExceptionHandler({ProblemEntityNotFoundException.class})
    protected ResponseEntity<String> handleProblemEntityNotFound() {
        return ResponseEntity.status(404).body("Couldn't find problem entity");
    }

    @ExceptionHandler({MachineEntityNotFoundException.class})
    protected ResponseEntity<String> handleMachineEntityNotFound() {
        return ResponseEntity.status(404).body("Couldn't find machine entity");
    }

    @ExceptionHandler({SparePartEntityNotFoundException.class})
    protected ResponseEntity<String> handleSparePartEntityNotFound() {
        return ResponseEntity.status(404).body("Couldn't find spare part entity");
    }

    @ExceptionHandler({InsufficientInventoryException.class})
    protected ResponseEntity<String> handleSparePartInsufficientInventory() {
        return ResponseEntity.status(400).body("Insufficient inventory");
    }

    @ExceptionHandler({IllegalStockStateException.class})
    protected ResponseEntity<String> handleStockLessThanZero() {
        return ResponseEntity.status(400).body("Stock must be greater than 0");
    }

    @ExceptionHandler({DataIntegrityViolationException.class})
    protected ResponseEntity<String> handleNonUniqueName() {
        return ResponseEntity.status(409).body("Input not unique");
    }



}
