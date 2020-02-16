package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.SpringBootDemoApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(classes = { SpringBootDemoApplication.class })
@TestPropertySource(
        locations = "classpath:application-integration-test.properties")
@AutoConfigureMockMvc
class EmployeeRepositoryIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    @WithAnonymousUser
    public void createEmployee_asAnonymous_thenStatus401() throws Exception {
        performCreateEmployeeRequest().andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    public void createEmployee_asUser_thenStatus201() throws Exception {
        performCreateEmployeeRequest()
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    @Test
    @WithMockUser
    public void createEmployee_noSalary_thenStatus400() throws Exception {
        performCreateEmployeeRequest("{ \"name\": \"test\" }")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[0].propertyPath").value("salary"));
    }

    @Test
    @WithMockUser
    public void createEmployee_noSalaryValue_thenStatus400() throws Exception {
        performCreateEmployeeRequest("{ \"name\": \"test\", \"salary\": {} }")
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$[0].propertyPath").value("value"));
    }

    private ResultActions performCreateEmployeeRequest() throws Exception {
        return performCreateEmployeeRequest("{ \"name\": \"test\", \"salary\": { \"value\": 50 } }");
    }

    private ResultActions performCreateEmployeeRequest(String json) throws Exception {
        return mvc.perform(post("/api/employees")
                .content(json)
                .contentType(MediaType.APPLICATION_JSON));
    }
}