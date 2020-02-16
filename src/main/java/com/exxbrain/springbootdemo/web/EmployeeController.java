package com.exxbrain.springbootdemo.web;

import com.exxbrain.springbootdemo.domain.repository.EmployeeRepository;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RepositoryRestController
public class EmployeeController {

    private EmployeeRepository employeeRepository;

    public EmployeeController(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    /**
     * Exposes deleteAll method
     */
    @DeleteMapping("/employees")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteAll() {
        employeeRepository.deleteAll();
    }
}
