package com.jpmc.riskassets.model;

public enum RiskLevel {
    LOW("Low Risk", 0, 25),
    MEDIUM("Medium Risk", 26, 60),
    HIGH("High Risk", 61, 85),
    CRITICAL("Critical Risk", 86, 100);
    
    private final String description;
    private final int minScore;
    private final int maxScore;
    
    RiskLevel(String description, int minScore, int maxScore) {
        this.description = description;
        this.minScore = minScore;
        this.maxScore = maxScore;
    }
    
    public String getDescription() { return description; }
    public int getMinScore() { return minScore; }
    public int getMaxScore() { return maxScore; }
    
    public static RiskLevel fromScore(double score) {
        for (RiskLevel level : values()) {
            if (score >= level.minScore && score <= level.maxScore) {
                return level;
            }
        }
        return LOW; // Default fallback
    }
}