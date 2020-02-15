package com.exxbrain.springbootdemo.domain.entity;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.Digits;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Entity
@Table(name = "salary")
public class Salary {

    @Id
    @GeneratedValue(generator = "uuid", strategy=GenerationType.IDENTITY)
    @GenericGenerator(name = "uuid", strategy = "uuid2")
    private String id;

    @DecimalMin(value = "0.0", inclusive = false)
    @Digits(integer=20, fraction=2)
    @NotNull
    private BigDecimal value;

    protected Salary() { }

    public Salary(BigDecimal value) {
        this.value = value;
    }

    public BigDecimal getValue() {
        return value;
    }

    public void setValue(BigDecimal salaryValue) {
        this.value = salaryValue;
    }
}
