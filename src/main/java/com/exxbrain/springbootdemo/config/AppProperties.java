package com.exxbrain.springbootdemo.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.web.cors.CorsConfiguration;

@ConfigurationProperties(prefix = "app", ignoreUnknownFields = false)
public class AppProperties {

    private final CorsConfiguration cors = new CorsConfiguration();
    /**
     * @return a {@link org.springframework.web.cors.CorsConfiguration} object.
     */
    public CorsConfiguration getCors() {
        return cors;
    }
}
