package com.jpmc.riskassets.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {
    
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Risk Asset Inventory Management API")
                        .description("Comprehensive API for managing risk assets with inventory tracking, risk assessment, and performance monitoring")
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("JPMC Risk Management Team")
                                .email("risk-team@jpmc.com"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")));
    }
}