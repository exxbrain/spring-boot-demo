package com.exxbrain.springbootdemo;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(
		locations = "classpath:application-integration-test.properties")
class SpringBootDemoApplicationTests {

	@Test
	void contextLoads() {
	}

}
