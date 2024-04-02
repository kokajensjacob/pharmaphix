package dev.kjj.pharmaphix.domain.exceptions;

public class IllegalStockStateException extends RuntimeException{
    public IllegalStockStateException(String message) {
        super(message);
    }
}
