package com.exxbrain.springbootdemo.config;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WebConfigTestController {

    @GetMapping("/api/test-cors")
    public void testCorsOnApiPath() {
    }

    @GetMapping("/test/test-cors")
    public void testCorsOnOtherPath() {
    }
}
