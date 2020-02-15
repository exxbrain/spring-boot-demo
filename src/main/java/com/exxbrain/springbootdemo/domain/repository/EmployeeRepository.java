package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.domain.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.annotation.Secured;

@RepositoryRestResource
public interface EmployeeRepository extends JpaRepository<Employee, String> {
    @Override
    @Secured("ROLE_USER")
    <S extends Employee> S save(S entity);
}
