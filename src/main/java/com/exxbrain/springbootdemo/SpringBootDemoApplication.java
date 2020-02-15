package com.exxbrain.springbootdemo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
public class SpringBootDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootDemoApplication.class, args);
	}

}
