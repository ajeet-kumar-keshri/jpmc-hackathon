# Risk Asset Inventory Management System

A comprehensive system for managing risk assets with React frontend, Spring Boot REST APIs, and Grafana monitoring.

## Architecture

- **Backend**: Spring Boot REST API with Swagger documentation
- **Frontend**: React-based UI for asset management
- **Monitoring**: Grafana dashboard for performance metrics
- **Database**: H2 in-memory database for development

## Components

### 1. Backend API (Port 8080)
- Risk Asset CRUD operations
- Risk assessment and scoring
- Asset categorization
- Swagger UI documentation

### 2. Frontend UI (Port 3000)
- Asset inventory management
- Risk assessment interface
- Dashboard with charts and metrics
- Responsive design

### 3. Grafana Dashboard (Port 3001)
- API performance metrics
- Asset statistics
- Risk distribution charts
- Real-time monitoring

## Quick Start

```bash
# Start all services
docker-compose up -d

# Or start individually:
# Backend
cd backend && ./mvnw spring-boot:run

# Frontend
cd frontend && npm start

# Grafana
docker run -d -p 3001:3000 grafana/grafana
```

## Access URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/swagger-ui.html
- Grafana: http://localhost:3001

## API Endpoints

- `GET /api/assets` - List all assets
- `POST /api/assets` - Create new asset
- `GET /api/assets/{id}` - Get asset by ID
- `PUT /api/assets/{id}` - Update asset
- `DELETE /api/assets/{id}` - Delete asset
- `GET /api/assets/risk-summary` - Get risk summary
- `GET /api/metrics` - Get performance metrics

## Features

- Asset lifecycle management
- Risk scoring and categorization
- Real-time monitoring
- Performance metrics
- Responsive UI
- API documentation