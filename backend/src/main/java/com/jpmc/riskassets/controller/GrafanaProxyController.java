package com.jpmc.riskassets.controller;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.Enumeration;

@RestController
@RequestMapping("/grafana")
@CrossOrigin(origins = "*")
public class GrafanaProxyController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String GRAFANA_BASE_URL = "http://localhost:3000";

    @RequestMapping(value = "/**", method = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
    public ResponseEntity<String> proxyGrafana(
            HttpServletRequest request,
            @RequestBody(required = false) String body) {
        
        try {
            String path = request.getRequestURI().substring("/grafana".length());
            String queryString = request.getQueryString();
            
            UriComponentsBuilder uriBuilder = UriComponentsBuilder.fromHttpUrl(GRAFANA_BASE_URL + path);
            if (queryString != null) {
                uriBuilder.query(queryString);
            }
            
            URI uri = uriBuilder.build().toUri();
            
            HttpHeaders headers = new HttpHeaders();
            Enumeration<String> headerNames = request.getHeaderNames();
            while (headerNames.hasMoreElements()) {
                String headerName = headerNames.nextElement();
                if (!headerName.equalsIgnoreCase("host") && 
                    !headerName.equalsIgnoreCase("content-length")) {
                    headers.add(headerName, request.getHeader(headerName));
                }
            }
            
            // Add basic auth for Grafana
            headers.setBasicAuth("admin", "admin");
            
            HttpEntity<String> entity = new HttpEntity<>(body, headers);
            
            ResponseEntity<String> response = restTemplate.exchange(
                uri, 
                HttpMethod.valueOf(request.getMethod()), 
                entity, 
                String.class
            );
            
            return response;
            
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error proxying request: " + e.getMessage());
        }
    }
}