package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.domain.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;

@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, String> {

    /**
     * <p>Creates or updates employee</p>
     * User has to have "USER" role to be able to create employee.
     * Anybody can update.
     *
     * @param employee to create or update
     * @return saved employee
     */
    @Override
    @PreAuthorize("(#employee.id != null && @employeeRepository.existsById(#employee.id)) || hasRole('USER')")
    <S extends Employee> S save(@Param("employee") S employee);

    @Override
    @EntityGraph(attributePaths = {"salary"}, type = EntityGraph.EntityGraphType.LOAD)
    Page<Employee> findAll(Pageable pageable);
}
