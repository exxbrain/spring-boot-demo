package com.exxbrain.springbootdemo.config;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.Collections;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.options;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class WebConfigTest {

    private WebConfig webConfig;
    private AppProperties props;

    @BeforeEach
    public void setup() {
        props = new AppProperties();
        webConfig = new WebConfig(props);
    }

    @Test
    public void testCorsFilterOnApiPath() throws Exception {
        props.getCors().setAllowedOrigins(Collections.singletonList("*"));
        props.getCors().setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
        props.getCors().setAllowedHeaders(Collections.singletonList("*"));
        props.getCors().setMaxAge(1800L);
        props.getCors().setAllowCredentials(true);

        MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new WebConfigTestController())
                .addFilters(webConfig.corsFilter())
                .build();

        mockMvc.perform(
                options("/api/test-cors")
                        .header(HttpHeaders.ORIGIN, "other.domain.com")
                        .header(HttpHeaders.ACCESS_CONTROL_REQUEST_METHOD, "POST"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "other.domain.com"))
                .andExpect(header().string(HttpHeaders.VARY, "Origin"))
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, "GET,POST,PUT,DELETE"))
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, "true"))
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_MAX_AGE, "1800"));

        mockMvc.perform(
                get("/api/test-cors")
                        .header(HttpHeaders.ORIGIN, "other.domain.com"))
                .andExpect(status().isOk())
                .andExpect(header().string(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, "other.domain.com"));
    }
}