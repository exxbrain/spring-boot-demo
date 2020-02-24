package com.exxbrain.springbootdemo.domain.service;

import com.exxbrain.springbootdemo.domain.repository.EmployeeRepository;
import com.exxbrain.springbootdemo.domain.repository.SalaryRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class EmployeeService {
    private EmployeeRepository employeeRepository;
    private SalaryRepository salaryRepository;

    public EmployeeService(EmployeeRepository employeeRepository, SalaryRepository salaryRepository) {
        this.employeeRepository = employeeRepository;
        this.salaryRepository = salaryRepository;
    }

    public void deleteAllEmployeesWithSalaries() {
        this.employeeRepository.deleteAllInBatch();
        this.salaryRepository.deleteAllInBatch();
    }
}
