package com.jpmc.riskassets.repository;

import com.jpmc.riskassets.model.RiskAsset;
import com.jpmc.riskassets.model.RiskLevel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;

@Repository
public interface RiskAssetRepository extends JpaRepository<RiskAsset, Long> {
    
    List<RiskAsset> findByRiskLevel(RiskLevel riskLevel);
    
    List<RiskAsset> findByType(String type);
    
    List<RiskAsset> findByOwner(String owner);
    
    List<RiskAsset> findByLocation(String location);
    
    @Query("SELECT COUNT(r) FROM RiskAsset r WHERE r.riskLevel = :riskLevel")
    long countByRiskLevel(RiskLevel riskLevel);
    
    @Query("SELECT SUM(r.value) FROM RiskAsset r")
    BigDecimal getTotalValue();
    
    @Query("SELECT AVG(r.riskScore) FROM RiskAsset r")
    BigDecimal getAverageRiskScore();
    
    @Query("SELECT r FROM RiskAsset r WHERE r.riskScore >= :minScore AND r.riskScore <= :maxScore")
    List<RiskAsset> findByRiskScoreRange(BigDecimal minScore, BigDecimal maxScore);
}