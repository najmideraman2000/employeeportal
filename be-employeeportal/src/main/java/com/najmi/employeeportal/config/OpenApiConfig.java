package com.najmi.employeeportal.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Employee Portal API")
                        .version("1.0.0")
                        .description("REST API for managing employee records and system audit history.")
                        .contact(new Contact()
                                .name("Najmi")
                                .email("your.email@example.com")));
    }
}