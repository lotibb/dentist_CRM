# Dentist CRM - Setup and Architecture Guide

## 📚 Documentación del Proyecto

Este proyecto incluye documentación completa organizada en varios archivos. Use este índice para navegar:

### 📖 Documentos Principales

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[README.md](./README.md)** | Guía de configuración, arquitectura y desarrollo | Desarrolladores |
| **[TECNOLOGIAS.md](./TECNOLOGIAS.md)** | Tecnologías, lenguajes y bases de datos utilizadas | Desarrolladores, Arquitectos |
| **[MANUAL_USUARIO.md](./MANUAL_USUARIO.md)** | Manual de usuario para usuarios finales | Usuarios finales, Recepcionistas, Dentistas |
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Guía de despliegue en Render | DevOps, Desarrolladores |
| **[DICCIONARIO_DATOS.md](./DICCIONARIO_DATOS.md)** | Diccionario de datos de ambas bases de datos | Desarrolladores, DBA |

### 🗂️ Scripts de Base de Datos

#### PostgreSQL
| Script | Descripción |
|--------|-------------|
| **[scripts/postgresql/postgresql.sql](./scripts/postgresql/postgresql.sql)** | Script SQL para crear estructura de PostgreSQL |
| **[scripts/postgresql/role_creation.sql](./scripts/postgresql/role_creation.sql)** | Script SQL para crear roles y permisos de PostgreSQL |
| **[scripts/postgresql/view_roles_privileges.sql](./scripts/postgresql/view_roles_privileges.sql)** | Queries para verificar roles y privilegios |

#### MongoDB
| Script | Descripción |
|--------|-------------|
| **[scripts/mongodb/mongodb.js](./scripts/mongodb/mongodb.js)** | Script JavaScript para crear estructura de MongoDB |
| **[scripts/mongodb/mongodb_roles.js](./scripts/mongodb/mongodb_roles.js)** | Script JavaScript para crear roles y usuarios de MongoDB |
| **[scripts/mongodb/view_mongodb_roles.js](./scripts/mongodb/view_mongodb_roles.js)** | Queries para verificar roles y usuarios de MongoDB |

### 🔐 Seguridad y Roles

| Documento | Descripción | Audiencia |
|-----------|-------------|-----------|
| **[scripts/postgresql/ROLES_README.md](./scripts/postgresql/ROLES_README.md)** | Guía de roles y permisos de PostgreSQL | DBA, Administradores, Desarrolladores |
| **[scripts/mongodb/MONGODB_ROLES_README.md](./scripts/mongodb/MONGODB_ROLES_README.md)** | Guía de roles y permisos de MongoDB | DBA, Administradores, Desarrolladores |

### 📋 Contenido de Cada Documento

#### [README.md](./README.md) - Este archivo
- ✅ Configuración del proyecto
- ✅ Estructura de archivos
- ✅ Cómo ejecutar el proyecto
- ✅ Endpoints de API
- ✅ Arquitectura del sistema
- ✅ Troubleshooting técnico

#### [TECNOLOGIAS.md](./TECNOLOGIAS.md)
- ✅ Lenguajes de programación (JavaScript/Node.js)
- ✅ Frameworks y librerías (Express, React, Sequelize, etc.)
- ✅ Bases de datos (PostgreSQL, MongoDB, Redis)
- ✅ Arquitectura de datos híbrida
- ✅ Herramientas de desarrollo
- ✅ Estándares y convenciones
- ✅ Seguridad y rendimiento

#### [MANUAL_USUARIO.md](./MANUAL_USUARIO.md)
- ✅ Introducción al sistema
- ✅ Cómo usar cada funcionalidad
- ✅ Gestión de pacientes
- ✅ Gestión de citas
- ✅ Gestión de expedientes médicos
- ✅ Flujos de trabajo comunes
- ✅ Solución de problemas para usuarios
- ✅ Preguntas frecuentes

#### [DEPLOYMENT.md](./DEPLOYMENT.md)
- ✅ Guía paso a paso para desplegar en Render
- ✅ Configuración de servicios
- ✅ Variables de entorno
- ✅ Troubleshooting de deployment
- ✅ Configuración de frontend y backend

#### [DICCIONARIO_DATOS.md](./DICCIONARIO_DATOS.md)
- ✅ Estructura completa de tablas PostgreSQL
- ✅ Estructura completa de colecciones MongoDB
- ✅ Campos, tipos y restricciones
- ✅ Relaciones entre entidades
- ✅ Índices y constraints

#### [scripts/postgresql/ROLES_README.md](./scripts/postgresql/ROLES_README.md)
- ✅ Roles y permisos de PostgreSQL
- ✅ Instalación y configuración de roles
- ✅ Gestión de usuarios
- ✅ Verificación de privilegios
- ✅ Troubleshooting de seguridad

#### [scripts/mongodb/MONGODB_ROLES_README.md](./scripts/mongodb/MONGODB_ROLES_README.md)
- ✅ Roles y permisos de MongoDB
- ✅ Instalación y configuración de roles
- ✅ Gestión de usuarios
- ✅ Verificación de privilegios
- ✅ Troubleshooting de seguridad

---

## 📋 Project Overview

Sistema CRM para consultorios dentales que permite gestionar pacientes, citas y expedientes médicos.

**Stack tecnológico:**
- Frontend: React + Vite
- Backend: Node.js + Express
- Bases de datos: PostgreSQL (datos estructurados) + MongoDB (expedientes)
- Cache: Redis (opcional)

> 📖 **Para información detallada sobre tecnologías**: Ver [TECNOLOGIAS.md](./TECNOLOGIAS.md)


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
│   │   │   ├── expedientesController.js
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
│   │   │   ├── expedienteService.js
│   │   │   └── patientService.js
│   │   └── database/       # Database connections
│   │       ├── mongodb.connection.js
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
   POSTGRESQL_URI=postgresql://username:password@localhost:5432/db_crm_dentistas
   MONGODB_URI=mongodb://localhost:27017/db_crm_dentistas  # Optional, for expedientes
   REDIS_URI=redis://localhost:6379  # Optional, for caching
   CORS_ORIGIN=*  # For development, set to frontend URL in production
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

3. **Set up environment variables (optional for local development):**
   Create a `.env.local` file in the `frontend` directory:
   ```env
   VITE_API_URL=http://localhost:3000
   ```
   If not set, it defaults to `http://localhost:3000`

4. **Start the frontend development server:**
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
   - All frontend API calls use a centralized configuration in `frontend/src/config/api.config.js`
   - Uses `VITE_API_URL` environment variable (defaults to `http://localhost:3000` in development)
   - In production, set `VITE_API_URL` to your backend URL

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

### Medical Records (`/expedientes`)

- `GET /expedientes` - List all medical records
- `GET /expedientes/:id` - Get medical record by ID
- `POST /expedientes` - Create new medical record
- `PUT /expedientes/:id` - Update medical record
- `DELETE /expedientes/:id` - Delete medical record

## 🔧 Configuration

### Environment Variables

**Backend** (`.env` file):
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production)
- `POSTGRESQL_URI` - PostgreSQL connection string
- `MONGODB_URI` - MongoDB connection string (optional)
- `REDIS_URI` - Redis connection string (optional)
- `CORS_ORIGIN` - Allowed CORS origins (default: `*` for development)

**Frontend** (`.env.local` file):
- `VITE_API_URL` - Backend API URL (default: `http://localhost:3000`)

> 📖 **Para detalles completos de configuración**: Ver [TECNOLOGIAS.md](./TECNOLOGIAS.md)

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
    },
    "mongodb": {
      "status": "connected",
      "message": "MongoDB is connected",
      "type": "MongoDB",
      "collections": 1,
      "database": "db_crm_dentistas"
    }
  }
}
```

- Returns `200` if all databases are connected
- Returns `503` if any database is disconnected

## 🐛 Troubleshooting

### Desarrollo Local

**Backend no inicia:**
- Verificar que PostgreSQL esté corriendo
- Verificar que el archivo `.env` existe con las credenciales correctas
- Verificar que el puerto 3000 no esté en uso

**Frontend no se conecta al backend:**
- Verificar que el backend esté corriendo en el puerto 3000
- Verificar `VITE_API_URL` en `.env.local` (o usa el default `http://localhost:3000`)
- Verificar `CORS_ORIGIN` en el backend (debe ser `*` en desarrollo)

**Errores de conexión a base de datos:**
- Verificar que PostgreSQL esté corriendo
- Verificar las credenciales en `backend/.env`
- Verificar que la base de datos `db_crm_dentistas` exista
- Para MongoDB, verificar que la base de datos `db_crm_dentistas` exista

> 📖 **Para troubleshooting de deployment**: Ver [DEPLOYMENT.md](./DEPLOYMENT.md)

## 📝 Development Notes

### Arquitectura

- **Backend**: Express.js con capa de servicios modular (MVC)
- **Frontend**: React con React Router y Axios para API calls
- **Bases de datos**: PostgreSQL (Sequelize) para datos estructurados, MongoDB para expedientes
- **Transacciones**: Todas las operaciones críticas usan transacciones para integridad de datos

> 📖 **Para detalles completos de arquitectura y tecnologías**: Ver [TECNOLOGIAS.md](./TECNOLOGIAS.md)  
> 📖 **Para estructura de datos**: Ver [DICCIONARIO_DATOS.md](./DICCIONARIO_DATOS.md)

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
