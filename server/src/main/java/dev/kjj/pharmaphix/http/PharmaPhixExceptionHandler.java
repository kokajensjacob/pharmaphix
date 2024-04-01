package dev.kjj.pharmaphix.http;

import dev.kjj.pharmaphix.domain.exceptions.ProblemEntityNotFoundException;
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
}
