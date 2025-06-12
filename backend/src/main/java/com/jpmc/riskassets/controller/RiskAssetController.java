package com.jpmc.riskassets.controller;

import com.jpmc.riskassets.model.RiskAsset;
import com.jpmc.riskassets.model.RiskLevel;
import com.jpmc.riskassets.model.RiskSummary;
import com.jpmc.riskassets.service.RiskAssetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assets")
@CrossOrigin(origins = "*")
@Tag(name = "Risk Asset Management", description = "APIs for managing risk assets inventory")
public class RiskAssetController {
    
    @Autowired
    private RiskAssetService assetService;
    
    @GetMapping
    @Operation(summary = "Get all risk assets", description = "Retrieve a list of all risk assets in the inventory")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved list of assets")
    public ResponseEntity<List<RiskAsset>> getAllAssets() {
        List<RiskAsset> assets = assetService.getAllAssets();
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get asset by ID", description = "Retrieve a specific risk asset by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Asset found"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    public ResponseEntity<RiskAsset> getAssetById(
            @Parameter(description = "Asset ID") @PathVariable Long id) {
        return assetService.getAssetById(id)
                .map(asset -> ResponseEntity.ok(asset))
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create new asset", description = "Create a new risk asset in the inventory")
    @ApiResponse(responseCode = "201", description = "Asset created successfully")
    public ResponseEntity<RiskAsset> createAsset(@Valid @RequestBody RiskAsset asset) {
        RiskAsset createdAsset = assetService.createAsset(asset);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAsset);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update asset", description = "Update an existing risk asset")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Asset updated successfully"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    public ResponseEntity<RiskAsset> updateAsset(
            @Parameter(description = "Asset ID") @PathVariable Long id,
            @Valid @RequestBody RiskAsset assetDetails) {
        try {
            RiskAsset updatedAsset = assetService.updateAsset(id, assetDetails);
            return ResponseEntity.ok(updatedAsset);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete asset", description = "Delete a risk asset from the inventory")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Asset deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Asset not found")
    })
    public ResponseEntity<Void> deleteAsset(
            @Parameter(description = "Asset ID") @PathVariable Long id) {
        assetService.deleteAsset(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/risk-level/{riskLevel}")
    @Operation(summary = "Get assets by risk level", description = "Retrieve assets filtered by risk level")
    public ResponseEntity<List<RiskAsset>> getAssetsByRiskLevel(
            @Parameter(description = "Risk level") @PathVariable RiskLevel riskLevel) {
        List<RiskAsset> assets = assetService.getAssetsByRiskLevel(riskLevel);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Get assets by type", description = "Retrieve assets filtered by type")
    public ResponseEntity<List<RiskAsset>> getAssetsByType(
            @Parameter(description = "Asset type") @PathVariable String type) {
        List<RiskAsset> assets = assetService.getAssetsByType(type);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/owner/{owner}")
    @Operation(summary = "Get assets by owner", description = "Retrieve assets filtered by owner")
    public ResponseEntity<List<RiskAsset>> getAssetsByOwner(
            @Parameter(description = "Asset owner") @PathVariable String owner) {
        List<RiskAsset> assets = assetService.getAssetsByOwner(owner);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/location/{location}")
    @Operation(summary = "Get assets by location", description = "Retrieve assets filtered by location")
    public ResponseEntity<List<RiskAsset>> getAssetsByLocation(
            @Parameter(description = "Asset location") @PathVariable String location) {
        List<RiskAsset> assets = assetService.getAssetsByLocation(location);
        return ResponseEntity.ok(assets);
    }
    
    @GetMapping("/risk-summary")
    @Operation(summary = "Get risk summary", description = "Retrieve summary statistics of risk assets")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved risk summary")
    public ResponseEntity<RiskSummary> getRiskSummary() {
        RiskSummary summary = assetService.getRiskSummary();
        return ResponseEntity.ok(summary);
    }
}