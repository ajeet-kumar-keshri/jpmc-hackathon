# Risk Asset Inventory Management System - Public URLs

## 🌐 Live Application URLs

### 1. React Frontend (Risk Asset Management UI)
**URL**: https://work-2-bnrdghebnjedwzfi.prod-runtime.all-hands.dev
- Complete React-based dashboard for risk asset management
- Material-UI components with responsive design
- Asset creation, editing, and visualization
- Risk level filtering and analytics
- Real-time charts and statistics

### 2. Spring Boot Backend API & Swagger Documentation
**URL**: https://work-1-bnrdghebnjedwzfi.prod-runtime.all-hands.dev
- RESTful API endpoints for asset management
- Interactive Swagger UI documentation
- H2 database with sample data
- Prometheus metrics endpoint
- CORS enabled for frontend integration

**Swagger UI**: https://work-1-bnrdghebnjedwzfi.prod-runtime.all-hands.dev/swagger-ui/index.html

### 3. Grafana Performance Dashboard
**URL**: https://work-1-bnrdghebnjedwzfi.prod-runtime.all-hands.dev/grafana/
- Performance monitoring dashboard
- Real-time metrics visualization
- HTTP request rates and response times
- JVM memory usage monitoring
- Database connection pool metrics

**Direct Dashboard**: https://work-1-bnrdghebnjedwzfi.prod-runtime.all-hands.dev/grafana/d/9ba50a23-422f-4a39-a7f7-b1f400d00b7a/risk-assets-performance-dashboard

## 🔧 System Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   React Frontend │    │ Spring Boot API │    │    Grafana      │
│   (Port 12001)   │◄──►│   (Port 12000)  │◄──►│   (Port 3000)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                                │                        ▲
                                ▼                        │
                       ┌─────────────────┐    ┌─────────────────┐
                       │   H2 Database   │    │   Prometheus    │
                       │   (In-Memory)   │    │   (Port 9090)   │
                       └─────────────────┘    └─────────────────┘
```

## 📊 Key Features

### Frontend Features:
- ✅ Asset Dashboard with statistics
- ✅ Asset Management (Create, Read, Update, Delete)
- ✅ Risk Level Filtering (LOW, MEDIUM, HIGH, CRITICAL)
- ✅ Asset Type Filtering
- ✅ Interactive Charts and Visualizations
- ✅ Responsive Material-UI Design

### Backend Features:
- ✅ RESTful API with full CRUD operations
- ✅ Swagger/OpenAPI 3.0 documentation
- ✅ H2 in-memory database with sample data
- ✅ Spring Boot Actuator for monitoring
- ✅ Prometheus metrics integration
- ✅ CORS configuration for frontend

### Monitoring Features:
- ✅ Grafana dashboard with performance metrics
- ✅ Prometheus metrics collection
- ✅ HTTP request monitoring
- ✅ JVM memory usage tracking
- ✅ Database connection pool monitoring

## 🚀 Quick Start Guide

1. **Access the Frontend**: Visit the React application URL to start managing risk assets
2. **Explore the API**: Use the Swagger UI to test API endpoints
3. **Monitor Performance**: Check the Grafana dashboard for real-time metrics

## 📝 Sample Data

The system comes pre-loaded with 15 sample risk assets including:
- Server Infrastructure (HIGH risk)
- Customer Database (HIGH risk)
- Trading Platform (CRITICAL risk)
- Office Building (MEDIUM risk)
- And more...

## 🔐 Authentication

- **Frontend**: No authentication required for demo
- **Backend API**: Open access for demo purposes
- **Grafana**: Accessible via proxy (no separate login required)

---

**Note**: All services are running in a containerized environment and are accessible via the provided public URLs.