package com.exxbrain.springbootdemo.web;

import com.exxbrain.springbootdemo.domain.service.EmployeeService;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

@RepositoryRestController
public class EmployeeController {

    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    /**
     * Exposes deleteAll method
     */
    @DeleteMapping("/employees")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    void deleteAll() {
        employeeService.deleteAllEmployeesWithSalaries();
    }
}
