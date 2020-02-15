package com.exxbrain.springbootdemo.domain.repository;

import com.exxbrain.springbootdemo.SpringBootDemoApplication;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import java.math.BigDecimal;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest(classes = SpringBootDemoApplication.class)
@AutoConfigureMockMvc
class EmployeeRepositoryIntegrationTest {
    @Autowired
    private MockMvc mvc;

    @Test
    @WithAnonymousUser
    public void hireEmployee_whenPostNewEmployeeAsAnonymous_thenStatus401() throws Exception {
        getNewEmployeeRequest().andExpect(status().isUnauthorized());
    }

    @Test
    @WithMockUser
    public void hireEmployee_whenPostNewEmployeeAsUser_thenStatus201() throws Exception {
        getNewEmployeeRequest()
                .andExpect(status().isCreated())
                .andExpect(header().exists("Location"));
    }

    private ResultActions getNewEmployeeRequest() throws Exception {
        return mvc.perform(post("/api/employees")
                .content("{ \"name\": \"test\", \"salary\": { \"value\": 50 } }")
                .contentType(MediaType.APPLICATION_JSON));
    }
}