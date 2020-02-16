package com.exxbrain.springbootdemo;

import com.exxbrain.springbootdemo.config.AppProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.liquibase.LiquibaseProperties;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({AppProperties.class})
public class SpringBootDemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(SpringBootDemoApplication.class, args);
	}

}
