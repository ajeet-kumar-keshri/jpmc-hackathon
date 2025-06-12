package com.jpmc.riskassets.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@RestController
@RequestMapping("/api/metrics")
@CrossOrigin(origins = "*")
@Tag(name = "Performance Metrics", description = "APIs for retrieving system performance metrics")
public class MetricsController {
    
    private final Random random = new Random();
    
    @GetMapping
    @Operation(summary = "Get system metrics", description = "Retrieve current system performance metrics")
    public Map<String, Object> getMetrics() {
        Map<String, Object> metrics = new HashMap<>();
        
        // Simulate performance metrics
        metrics.put("timestamp", LocalDateTime.now());
        metrics.put("api_requests_total", 1000 + random.nextInt(5000));
        metrics.put("api_requests_per_second", 10 + random.nextInt(50));
        metrics.put("response_time_avg_ms", 50 + random.nextInt(200));
        metrics.put("response_time_95th_percentile_ms", 100 + random.nextInt(300));
        metrics.put("error_rate_percent", random.nextDouble() * 5);
        metrics.put("cpu_usage_percent", 20 + random.nextDouble() * 60);
        metrics.put("memory_usage_percent", 30 + random.nextDouble() * 50);
        metrics.put("active_connections", 10 + random.nextInt(100));
        metrics.put("database_connections", 5 + random.nextInt(20));
        
        return metrics;
    }
    
    @GetMapping("/health")
    @Operation(summary = "Health check", description = "Check system health status")
    public Map<String, Object> getHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("timestamp", LocalDateTime.now());
        health.put("uptime_seconds", 3600 + random.nextInt(86400));
        health.put("version", "1.0.0");
        
        return health;
    }
}