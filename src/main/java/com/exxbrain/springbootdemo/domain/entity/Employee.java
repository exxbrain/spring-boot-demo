package com.exxbrain.springbootdemo.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(generator = "uuid", strategy=GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @NotBlank
    @NotNull
    private String name;

    @NotNull
    @OneToOne(
        fetch = FetchType.EAGER,
        targetEntity = Salary.class,
        orphanRemoval = true,
        cascade = CascadeType.ALL
    )
    private Salary salary;

    protected Employee() {}

    public Employee(String name, BigDecimal salaryValue) {
        this.name = name;
        this.salary = new Salary(salaryValue);
    }

    public String getName() {
        return name;
    }

    public Salary getSalary() {
        return salary;
    }

    public String getId() {
        return id;
    }
}
