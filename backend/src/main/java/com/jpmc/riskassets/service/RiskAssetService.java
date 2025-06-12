package com.jpmc.riskassets.service;

import com.jpmc.riskassets.model.RiskAsset;
import com.jpmc.riskassets.model.RiskLevel;
import com.jpmc.riskassets.model.RiskSummary;
import com.jpmc.riskassets.repository.RiskAssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Service
public class RiskAssetService {
    
    @Autowired
    private RiskAssetRepository repository;
    
    public List<RiskAsset> getAllAssets() {
        return repository.findAll();
    }
    
    public Optional<RiskAsset> getAssetById(Long id) {
        return repository.findById(id);
    }
    
    public RiskAsset createAsset(RiskAsset asset) {
        // Auto-calculate risk level based on score
        asset.setRiskLevel(RiskLevel.fromScore(asset.getRiskScore().doubleValue()));
        return repository.save(asset);
    }
    
    public RiskAsset updateAsset(Long id, RiskAsset assetDetails) {
        return repository.findById(id)
            .map(asset -> {
                asset.setName(assetDetails.getName());
                asset.setType(assetDetails.getType());
                asset.setDescription(assetDetails.getDescription());
                asset.setValue(assetDetails.getValue());
                asset.setRiskScore(assetDetails.getRiskScore());
                asset.setRiskLevel(RiskLevel.fromScore(assetDetails.getRiskScore().doubleValue()));
                asset.setOwner(assetDetails.getOwner());
                asset.setLocation(assetDetails.getLocation());
                return repository.save(asset);
            })
            .orElseThrow(() -> new RuntimeException("Asset not found with id: " + id));
    }
    
    public void deleteAsset(Long id) {
        repository.deleteById(id);
    }
    
    public List<RiskAsset> getAssetsByRiskLevel(RiskLevel riskLevel) {
        return repository.findByRiskLevel(riskLevel);
    }
    
    public List<RiskAsset> getAssetsByType(String type) {
        return repository.findByType(type);
    }
    
    public List<RiskAsset> getAssetsByOwner(String owner) {
        return repository.findByOwner(owner);
    }
    
    public List<RiskAsset> getAssetsByLocation(String location) {
        return repository.findByLocation(location);
    }
    
    public RiskSummary getRiskSummary() {
        long totalAssets = repository.count();
        BigDecimal totalValue = repository.getTotalValue();
        BigDecimal averageRiskScore = repository.getAverageRiskScore();
        
        long lowRiskCount = repository.countByRiskLevel(RiskLevel.LOW);
        long mediumRiskCount = repository.countByRiskLevel(RiskLevel.MEDIUM);
        long highRiskCount = repository.countByRiskLevel(RiskLevel.HIGH);
        long criticalRiskCount = repository.countByRiskLevel(RiskLevel.CRITICAL);
        
        return new RiskSummary(totalAssets, totalValue != null ? totalValue : BigDecimal.ZERO, 
                              averageRiskScore != null ? averageRiskScore : BigDecimal.ZERO,
                              lowRiskCount, mediumRiskCount, highRiskCount, criticalRiskCount);
    }
}