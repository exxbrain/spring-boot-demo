package com.exxbrain.springbootdemo.web;

import org.springframework.http.ResponseEntity;
import org.springframework.transaction.TransactionSystemException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static class FieldValidationError {
        private final String propertyPath;
        private final String message;
        FieldValidationError(ConstraintViolation violation) {
            this.propertyPath = violation.getPropertyPath().toString();
            this.message = violation.getMessage();
        }
        public String getPropertyPath() {
            return propertyPath;
        }
        public String getMessage() {
            return message;
        }
    }

    @ExceptionHandler(TransactionSystemException.class)
    public ResponseEntity<List<FieldValidationError>> handleConstraintViolation(TransactionSystemException ex) {
        Throwable cause = ex.getRootCause();
        if (cause instanceof ConstraintViolationException) {
            Set<ConstraintViolation<?>> constraintViolations =
                    ((ConstraintViolationException) cause).getConstraintViolations();
            List<FieldValidationError> errors =
                    constraintViolations.stream().map(FieldValidationError::new).collect(Collectors.toList());
            return ResponseEntity.badRequest().body(errors);
        }
        throw ex;
    }
}
