package com.jpmc.riskassets.config;

import com.jpmc.riskassets.model.RiskAsset;
import com.jpmc.riskassets.model.RiskLevel;
import com.jpmc.riskassets.repository.RiskAssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private RiskAssetRepository repository;

    @Override
    public void run(String... args) throws Exception {
        if (repository.count() == 0) {
            loadSampleData();
        }
    }

    private void loadSampleData() {
        repository.save(new RiskAsset("Server Infrastructure", "IT Equipment", 
            "Critical production servers hosting customer data", 
            new BigDecimal("500000.00"), new BigDecimal("75.5"), RiskLevel.HIGH, 
            "IT Operations", "Data Center NYC"));

        repository.save(new RiskAsset("Customer Database", "Data Asset", 
            "Primary customer information database", 
            new BigDecimal("2000000.00"), new BigDecimal("85.2"), RiskLevel.HIGH, 
            "Data Team", "Cloud AWS"));

        repository.save(new RiskAsset("Trading Platform", "Software", 
            "Real-time trading application", 
            new BigDecimal("1500000.00"), new BigDecimal("92.8"), RiskLevel.CRITICAL, 
            "Trading Desk", "Data Center London"));

        repository.save(new RiskAsset("Office Building", "Physical Asset", 
            "Main office building in Manhattan", 
            new BigDecimal("10000000.00"), new BigDecimal("45.3"), RiskLevel.MEDIUM, 
            "Facilities", "New York"));

        repository.save(new RiskAsset("Backup Systems", "IT Equipment", 
            "Disaster recovery and backup infrastructure", 
            new BigDecimal("300000.00"), new BigDecimal("25.7"), RiskLevel.MEDIUM, 
            "IT Operations", "Data Center Chicago"));

        repository.save(new RiskAsset("Mobile App", "Software", 
            "Customer-facing mobile banking application", 
            new BigDecimal("800000.00"), new BigDecimal("68.9"), RiskLevel.HIGH, 
            "Mobile Team", "Cloud Azure"));

        repository.save(new RiskAsset("ATM Network", "Physical Asset", 
            "Network of automated teller machines", 
            new BigDecimal("5000000.00"), new BigDecimal("55.4"), RiskLevel.MEDIUM, 
            "Branch Operations", "Multiple Locations"));

        repository.save(new RiskAsset("Risk Analytics Engine", "Software", 
            "AI-powered risk assessment system", 
            new BigDecimal("1200000.00"), new BigDecimal("78.6"), RiskLevel.HIGH, 
            "Risk Team", "Cloud GCP"));

        repository.save(new RiskAsset("Employee Laptops", "IT Equipment", 
            "Fleet of employee laptops and workstations", 
            new BigDecimal("750000.00"), new BigDecimal("35.2"), RiskLevel.MEDIUM, 
            "IT Support", "Office Locations"));

        repository.save(new RiskAsset("Compliance Database", "Data Asset", 
            "Regulatory compliance and audit data", 
            new BigDecimal("600000.00"), new BigDecimal("88.1"), RiskLevel.CRITICAL, 
            "Compliance Team", "Secure Cloud"));

        repository.save(new RiskAsset("Network Infrastructure", "IT Equipment", 
            "Core networking equipment and switches", 
            new BigDecimal("400000.00"), new BigDecimal("42.8"), RiskLevel.MEDIUM, 
            "Network Team", "Data Centers"));

        repository.save(new RiskAsset("Payment Gateway", "Software", 
            "Third-party payment processing system", 
            new BigDecimal("900000.00"), new BigDecimal("72.3"), RiskLevel.HIGH, 
            "Payments Team", "Cloud Multi-Region"));

        repository.save(new RiskAsset("Security Cameras", "Physical Asset", 
            "Building security and surveillance system", 
            new BigDecimal("150000.00"), new BigDecimal("18.5"), RiskLevel.LOW, 
            "Security", "All Buildings"));

        repository.save(new RiskAsset("Document Archive", "Data Asset", 
            "Historical document and record storage", 
            new BigDecimal("200000.00"), new BigDecimal("22.7"), RiskLevel.LOW, 
            "Records Management", "Offsite Storage"));

        repository.save(new RiskAsset("Emergency Generator", "Physical Asset", 
            "Backup power generation system", 
            new BigDecimal("250000.00"), new BigDecimal("15.3"), RiskLevel.LOW, 
            "Facilities", "Data Center NYC"));
    }
}