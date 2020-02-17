package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.domain.entity.Employee;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.security.test.context.support.WithMockUser;

import java.math.BigDecimal;
import java.util.NoSuchElementException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
class EmployeeRepositoryTest {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Test
    @WithMockUser
    public void save_whenSaveNewEmployee_thenItFound() {
        Employee test = new Employee("test", new BigDecimal(50));

        // when
        Employee saved = employeeRepository.save(test);
        Employee found = employeeRepository.findById(saved.getId())
                .orElseThrow(NoSuchElementException::new);

        // then
        assertThat(found.getName()).isEqualTo(test.getName());
    }
}

