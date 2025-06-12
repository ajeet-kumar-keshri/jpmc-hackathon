package com.jpmc.riskassets.model;

import java.math.BigDecimal;

public class RiskSummary {
    private long totalAssets;
    private BigDecimal totalValue;
    private BigDecimal averageRiskScore;
    private long lowRiskCount;
    private long mediumRiskCount;
    private long highRiskCount;
    private long criticalRiskCount;
    
    public RiskSummary() {}
    
    public RiskSummary(long totalAssets, BigDecimal totalValue, BigDecimal averageRiskScore,
                      long lowRiskCount, long mediumRiskCount, long highRiskCount, long criticalRiskCount) {
        this.totalAssets = totalAssets;
        this.totalValue = totalValue;
        this.averageRiskScore = averageRiskScore;
        this.lowRiskCount = lowRiskCount;
        this.mediumRiskCount = mediumRiskCount;
        this.highRiskCount = highRiskCount;
        this.criticalRiskCount = criticalRiskCount;
    }
    
    // Getters and Setters
    public long getTotalAssets() { return totalAssets; }
    public void setTotalAssets(long totalAssets) { this.totalAssets = totalAssets; }
    
    public BigDecimal getTotalValue() { return totalValue; }
    public void setTotalValue(BigDecimal totalValue) { this.totalValue = totalValue; }
    
    public BigDecimal getAverageRiskScore() { return averageRiskScore; }
    public void setAverageRiskScore(BigDecimal averageRiskScore) { this.averageRiskScore = averageRiskScore; }
    
    public long getLowRiskCount() { return lowRiskCount; }
    public void setLowRiskCount(long lowRiskCount) { this.lowRiskCount = lowRiskCount; }
    
    public long getMediumRiskCount() { return mediumRiskCount; }
    public void setMediumRiskCount(long mediumRiskCount) { this.mediumRiskCount = mediumRiskCount; }
    
    public long getHighRiskCount() { return highRiskCount; }
    public void setHighRiskCount(long highRiskCount) { this.highRiskCount = highRiskCount; }
    
    public long getCriticalRiskCount() { return criticalRiskCount; }
    public void setCriticalRiskCount(long criticalRiskCount) { this.criticalRiskCount = criticalRiskCount; }
}