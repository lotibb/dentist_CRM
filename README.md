# Dentist CRM - Setup and Architecture Guide

## 📋 Project Overview

This is a full-stack Dentist CRM (Customer Relationship Management) application built with:
- **Frontend**: React with React Router and Vite
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Sequelize ORM
- **Cache**: Redis (optional, for caching)

## 🏗️ Project Structure

```
dentist_CRM/
├── backend/                 # Backend API server
│   ├── src/
│   │   ├── app.js          # Express app setup (main entry point)
│   │   ├── config/         # Configuration files
│   │   │   └── server.config.js
│   │   ├── controllers/   # Request handlers
│   │   │   ├── citasController.js
│   │   │   ├── dentistasController.js
│   │   │   └── pacientesController.js
│   │   ├── models/         # Sequelize models
│   │   │   ├── associations.js
│   │   │   ├── Cita.js
│   │   │   ├── Dentista.js
│   │   │   └── Paciente.js
│   │   ├── routes/         # API routes
│   │   │   ├── citas.js
│   │   │   ├── dentistas.js
│   │   │   └── pacientes.js
│   │   ├── services/       # Business logic (modular services)
│   │   │   ├── appointmentService.js
│   │   │   ├── dentistService.js
│   │   │   └── patientService.js
│   │   └── database/       # Database connections
│   │       ├── postgresql.connection.js
│   │       └── redis.connection.js
│   └── package.json
└── frontend/                # Frontend React application
    ├── src/
    │   ├── api/            # API client functions
    │   │   ├── citas.js
    │   │   ├── dentistas.js
    │   │   └── pacientes.js
    │   ├── components/     # React components
    │   │   └── PatientForm.jsx
    │   ├── pages/          # Page components
    │   │   ├── NewCitaPage.jsx
    │   │   └── PacientsPage.jsx
    │   ├── styles/         # CSS files
    │   ├── App.jsx         # Main app component
    │   └── main.jsx        # React entry point
    ├── index.html          # HTML entry point
    ├── vite.config.js      # Vite configuration
    └── package.json
```

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL database
- Redis (optional, for caching)
- npm or yarn

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the `backend` directory with:
   ```env
   PORT=3000
   NODE_ENV=development
   POSTGRESQL_URI=postgresql://username:password@localhost:5432/dentist_crm
   REDIS_URI=redis://localhost:6379  # Optional
   ```

4. **Start the backend server:**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm start
   ```

   The backend will run on `http://localhost:3000`

   You should see:
   ```
   🚀 Server running on port 3000
   📝 Environment: development
   🌐 Health check: http://localhost:3000/health
   🌐 API: http://localhost:3000/
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```

   The frontend will run on `http://localhost:5173`

## 🔄 How Frontend and Backend Interact

### Communication Flow

1. **Frontend → Backend:**
   - The frontend uses **Axios** to make HTTP requests to the backend API
   - All API calls are centralized in the `frontend/src/api/` directory:
     - `citas.js` - Appointment operations
     - `pacientes.js` - Patient operations
     - `dentistas.js` - Dentist operations

2. **API Base URL:**
   - All frontend API calls point to `http://localhost:3000`
   - This is hardcoded in each API file (e.g., `frontend/src/api/citas.js`)

3. **Request/Response Format:**
   - **Request**: JSON data sent in the request body (for POST/PUT)
   - **Response**: JSON data returned from the backend

### Example Flow: Creating an Appointment

1. **User fills form** in `NewCitaPage.jsx`
2. **Form submission** calls `createCita()` from `frontend/src/api/citas.js`
3. **Axios sends POST request** to `http://localhost:3000/citas`
4. **Backend route** (`backend/src/routes/citas.js`) receives the request
5. **Controller** (`backend/src/controllers/citasController.js`) processes it
6. **Service layer** (`backend/src/services/appointmentService.js`) handles business logic with transactions
7. **Model** (`backend/src/models/Cita.js`) saves to PostgreSQL via Sequelize
8. **Response** sent back to frontend
9. **Frontend** updates UI based on response

## 📡 API Endpoints

### Base URL
`http://localhost:3000`

### Root & Health

- `GET /` - API welcome message with available endpoints
- `GET /health` - Health check (server status, PostgreSQL and Redis connections)

### Patients (`/pacientes`)

- `GET /pacientes` - List all patients
- `GET /pacientes/:id` - Get patient by ID
- `POST /pacientes` - Create new patient
- `PUT /pacientes/:id` - Update patient
- `DELETE /pacientes/:id` - Delete patient

### Dentists (`/dentistas`)

- `GET /dentistas` - List all dentists
- `GET /dentistas/:id` - Get dentist by ID
- `POST /dentistas` - Create new dentist
- `PUT /dentistas/:id` - Update dentist
- `DELETE /dentistas/:id` - Delete dentist

### Appointments (`/citas`)

- `GET /citas` - List all appointments (with patient and dentist info)
- `GET /citas/:id` - Get appointment by ID (with patient and dentist info)
- `POST /citas` - Create new appointment
- `PUT /citas/:id` - Reschedule appointment (change date/time)
- `DELETE /citas/:id` - Cancel appointment

## 🗄️ Database Models

The application uses Sequelize ORM with the following models:

- **Paciente** (Patient): `id_paciente`, `nombre`, `telefono`, `correo`, `fecha_nacimiento`
- **Dentista** (Dentist): `id_dentista`, `nombre`, `telefono`, `correo`, `especialidad`
- **Cita** (Appointment): `id_cita`, `id_paciente`, `id_dentista`, `fecha_cita`, `motivo`, `estado`

### Relationships

- A Patient can have many Appointments
- A Dentist can have many Appointments
- An Appointment belongs to one Patient and one Dentist

## 🔧 Configuration

### Backend Configuration

- **Port**: Configurable via `PORT` environment variable (default: 3000)
- **Environment**: Set via `NODE_ENV` (development/production)
- **CORS**: Enabled to allow frontend requests
- **Database**: PostgreSQL connection via Sequelize ORM
- **Cache**: Redis connection (optional)
- **Logging**: Morgan middleware in development mode
- **Error Handling**: Comprehensive error handling with graceful shutdown

### Frontend Configuration

- **Port**: Default `5173` (Vite default, configurable in `vite.config.js`)
- **API Base URL**: `http://localhost:3000` (hardcoded in API files)
- **Build Tool**: Vite with React plugin
- **Router**: React Router v6

## 🏥 Health Check Endpoint

The `/health` endpoint provides comprehensive status information:

```json
{
  "server": {
    "status": "running",
    "message": "Server is operational",
    "timestamp": "2025-11-29T...",
    "uptime": 123.45,
    "memory": {...}
  },
  "databases": {
    "postgresql": {
      "status": "connected",
      "message": "PostgreSQL is connected",
      "type": "PostgreSQL",
      "tables": 3,
      "version": "PostgreSQL 14.x"
    },
    "redis": {
      "status": "connected",
      "message": "Redis is connected"
    }
  }
}
```

- Returns `200` if all databases are connected
- Returns `503` if any database is disconnected

## 🐛 Troubleshooting

### Backend won't start
- Check PostgreSQL is running and accessible
- Verify `.env` file exists in `backend/` directory with correct database credentials
- Check if port 3000 is already in use
- Ensure Sequelize is installed: `npm install sequelize`

### Frontend can't connect to backend
- Ensure backend is running on port 3000
- Check CORS is enabled in backend
- Verify API URLs in `frontend/src/api/*.js` files match backend URL
- Check browser console for CORS errors

### Database connection errors
- Verify PostgreSQL is running
- Check database credentials in `backend/.env`
- Ensure database exists: `CREATE DATABASE dentist_crm;`
- Verify `POSTGRESQL_URI` format: `postgresql://user:password@host:port/database`

### Redis connection errors
- Redis is optional - the app will work without it
- If you see Redis warnings, you can ignore them or set up Redis
- To disable Redis, simply don't set `REDIS_URI` in `.env`

## 📝 Development Notes

### Backend Architecture

- **Entry Point**: `backend/src/app.js` (uses `startServer()` function for proper async initialization)
- **Database**: Uses Sequelize ORM with connection management in `postgresql.connection.js`
- **Services**: Modular service layer separated by domain:
  - `appointmentService.js` - Appointment business logic
  - `dentistService.js` - Dentist business logic
  - `patientService.js` - Patient business logic
- **Error Handling**: Comprehensive error handling with unhandled rejection/exception handlers
- **Graceful Shutdown**: Properly closes database connections on SIGTERM/SIGINT
- **Transactions**: All database operations use Sequelize transactions for data integrity

### Frontend Architecture

- **Entry Point**: `frontend/src/main.jsx`
- **Routing**: React Router v6 with BrowserRouter
- **State Management**: React hooks (useState, useEffect)
- **API Client**: Axios for HTTP requests
- **Language**: Spanish UI (all user-facing text is in Spanish)

### Project Organization

- **Backend** and **Frontend** are in separate folders for clear separation
- Each has its own `package.json` and dependencies
- Environment variables are managed per project (backend uses `.env`)
- **Backend Services**: Modular architecture with separate service files for each domain model
- **Language**: 
  - Backend: Spanish naming (models, routes, controllers use Spanish)
  - Frontend: Spanish UI (all user-facing text in Spanish)

## 🚀 Quick Start

```bash
# Terminal 1 - Backend
cd backend
npm install
# Create .env file with database credentials
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Visit:
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3000`
- Health Check: `http://localhost:3000/health`
