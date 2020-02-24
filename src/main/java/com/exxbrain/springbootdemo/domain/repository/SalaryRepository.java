package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.domain.entity.Salary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(exported = false)
public interface SalaryRepository extends JpaRepository<Salary, String> {
}
