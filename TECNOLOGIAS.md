# Tecnología Utilizada en el Proyecto

> 📖 **Volver al índice**: [README.md](./README.md) | [Documentación completa](./README.md#-documentación-del-proyecto)

## 📚 Índice

- [Lenguajes de Programación](#lenguajes-de-programación)
- [Frameworks y Librerías](#frameworks-y-librerías)
- [Bases de Datos](#bases-de-datos)
- [Arquitectura de Datos](#arquitectura-de-datos)
- [Herramientas de Desarrollo](#herramientas-de-desarrollo)
- [Gestión de Dependencias](#gestión-de-dependencias)
- [Entornos](#entornos)
- [Estándares y Convenciones](#estándares-y-convenciones)
- [Seguridad](#seguridad)
- [Rendimiento](#rendimiento)

---

## Lenguajes de Programación

### JavaScript (Node.js)
- **Versión**: Node.js >= 14.0.0
- **Uso**: Backend completo
- **Características utilizadas**:
  - ES6+ (Arrow functions, async/await, destructuring)
  - Módulos CommonJS (require/module.exports)
  - Promesas y manejo asíncrono
  - Event-driven architecture

### JavaScript (Frontend)
- **Versión**: ES6+ con React
- **Uso**: Frontend completo
- **Características utilizadas**:
  - JSX para componentes React
  - Hooks (useState, useEffect, useRef)
  - Módulos ES6 (import/export)
  - Component-based architecture

---

## Frameworks y Librerías

### Backend

#### Express.js (v4.18.2)
- **Tipo**: Framework web para Node.js
- **Uso**: Servidor HTTP y API REST
- **Características**:
  - Manejo de rutas y middleware
  - Parsing de JSON y URL-encoded
  - Manejo de errores
  - Integración con otros middlewares

#### Sequelize (v6.35.0)
- **Tipo**: ORM (Object-Relational Mapping) para PostgreSQL
- **Uso**: Manejo de modelos relacionales
- **Características**:
  - Modelos y asociaciones
  - Transacciones ACID
  - Migraciones
  - Validaciones
  - Queries optimizadas

#### MongoDB Driver (v6.21.0)
- **Tipo**: Driver oficial de MongoDB para Node.js
- **Uso**: Manejo de expedientes médicos
- **Características**:
  - Operaciones CRUD
  - Transacciones multi-documento
  - Sesiones y locks
  - Validación de esquema
  - Índices únicos

#### Redis Client (v4.6.12)
- **Tipo**: Cliente para Redis
- **Uso**: Caché y almacenamiento en memoria (opcional)
- **Características**:
  - Almacenamiento key-value
  - Expiración automática
  - Operaciones atómicas

#### CORS (v2.8.5)
- **Tipo**: Middleware para habilitar CORS
- **Uso**: Permitir peticiones desde el frontend
- **Características**:
  - Configuración de orígenes permitidos
  - Soporte para múltiples orígenes
  - Credentials support

#### Morgan (v1.10.0)
- **Tipo**: Middleware de logging HTTP
- **Uso**: Registro de peticiones (solo en desarrollo)
- **Características**:
  - Logging de requests/responses
  - Formato personalizable
  - Solo activo en modo desarrollo

#### dotenv (v16.6.1)
- **Tipo**: Manejo de variables de entorno
- **Uso**: Configuración por ambiente
- **Características**:
  - Carga de variables desde .env
  - Soporte para múltiples entornos
  - Seguridad de credenciales

### Frontend

#### React (v18.2.0)
- **Tipo**: Biblioteca para construir interfaces de usuario
- **Uso**: Framework principal del frontend
- **Características**:
  - Componentes funcionales
  - Hooks para manejo de estado
  - Virtual DOM
  - Re-renderizado eficiente

#### React Router DOM (v6.20.0)
- **Tipo**: Librería de enrutamiento
- **Uso**: Navegación del lado del cliente
- **Características**:
  - BrowserRouter para SPA
  - Rutas dinámicas
  - Navegación programática
  - Client-side routing

#### Vite (v5.0.8)
- **Tipo**: Herramienta de construcción y desarrollo
- **Uso**: Build tool y dev server
- **Características**:
  - Hot Module Replacement (HMR)
  - Build optimizado para producción
  - Soporte para ES modules
  - Desarrollo rápido

#### Axios (v1.6.2)
- **Tipo**: Cliente HTTP
- **Uso**: Peticiones a la API backend
- **Características**:
  - Promesas nativas
  - Interceptores
  - Manejo de errores
  - Transformación de datos

---

## Bases de Datos

### PostgreSQL

#### Información General
- **Versión**: Compatible con PostgreSQL 12+
- **Tipo**: Base de datos relacional (RDBMS)
- **Uso**: Base de datos principal para datos estructurados

#### Datos Almacenados
- **Pacientes**: Información personal y de contacto
- **Dentistas**: Información de profesionales
- **Citas**: Consultas programadas entre pacientes y dentistas

#### Características Utilizadas
- **Foreign Keys**: Integridad referencial entre tablas
- **Índices Únicos**: Prevención de duplicados (correos)
- **Índices Compuestos**: Optimización de búsquedas (dentista-fecha, paciente-fecha)
- **Transacciones ACID**: Garantía de consistencia de datos
- **Constraints**: Validación a nivel de base de datos
- **CASCADE**: Eliminación en cascada de registros relacionados

#### ORM: Sequelize
- Abstracción de SQL
- Modelos y asociaciones
- Migraciones
- Validaciones

#### Conexión
- **SSL**: Habilitado para producción
- **Pool de conexiones**: Configurado para optimizar rendimiento
- **Timeout**: Configurado para evitar conexiones colgadas

### MongoDB

#### Información General
- **Versión**: Compatible con MongoDB 4.4+
- **Tipo**: Base de datos NoSQL (document-oriented)
- **Uso**: Almacenamiento de expedientes médicos

#### Datos Almacenados
- **Expedientes Médicos**: Documentos completos con información clínica

#### Características Utilizadas
- **Documentos JSON**: Estructura flexible
- **Índices Únicos Compuestos**: Prevención de duplicados (paciente-dentista)
- **Transacciones Multi-documento**: Consistencia en operaciones complejas
- **Validación de Esquema**: JSON Schema validation
- **Sesiones**: Manejo de transacciones
- **Read/Write Concern**: Niveles de consistencia (majority)

#### Driver: MongoDB Node.js Driver
- Driver oficial de MongoDB
- Soporte completo de características
- Manejo de conexiones y pools

#### Colección
- **Nombre**: `expedientes`
- **Índices**: Automáticamente creados al iniciar el servidor

### Redis (Opcional)

#### Información General
- **Versión**: Compatible con Redis 6+
- **Tipo**: Base de datos en memoria (in-memory)
- **Uso**: Caché y almacenamiento temporal

#### Características
- **Almacenamiento Key-Value**: Estructura simple y rápida
- **Expiración Automática**: Datos temporales
- **Alta Velocidad**: Acceso en milisegundos
- **Persistencia Opcional**: Configurable

#### Estado
- **Opcional**: El sistema funciona completamente sin Redis
- **Recomendado**: Para mejorar rendimiento en producción

---

## Arquitectura de Datos

### Modelo Híbrido

El proyecto utiliza un **modelo híbrido** de bases de datos, combinando lo mejor de ambos mundos:

#### PostgreSQL (Relacional)
- **Ideal para**: Datos estructurados y relacionados
- **Ventajas**:
  - Integridad referencial garantizada
  - Transacciones ACID
  - Consultas complejas con JOINs
  - Relaciones bien definidas

#### MongoDB (NoSQL)
- **Ideal para**: Datos semi-estructurados y flexibles
- **Ventajas**:
  - Esquema flexible
  - Escalabilidad horizontal
  - Documentos anidados
  - Campos opcionales sin penalización

### Distribución de Datos

```
PostgreSQL:
├── pacientes (información personal)
├── dentistas (información profesional)
└── citas (relaciones paciente-dentista-fecha)

MongoDB:
└── expedientes (documentos médicos completos)
```

### Ventajas del Modelo Híbrido

1. **Optimización por Caso de Uso**:
   - PostgreSQL para relaciones complejas
   - MongoDB para documentos extensibles

2. **Rendimiento**:
   - Cada base de datos optimizada para su tipo de consulta
   - Índices específicos por base de datos

3. **Flexibilidad**:
   - Esquema estricto donde se necesita (PostgreSQL)
   - Esquema flexible donde se requiere (MongoDB)

4. **Escalabilidad**:
   - Escalado independiente de cada base de datos
   - Optimización específica por tipo de dato

### Referencias Cruzadas

- Los expedientes en MongoDB referencian:
  - `id_paciente` → `pacientes.id_paciente` (PostgreSQL)
  - `id_dentista` → `dentistas.id_dentista` (PostgreSQL)

**Nota**: Estas son referencias lógicas (no foreign keys reales). La integridad referencial debe manejarse en la capa de aplicación.

---

## Herramientas de Desarrollo

### Backend

#### Nodemon (v3.0.1)
- **Uso**: Auto-reload en desarrollo
- **Función**: Reinicia el servidor automáticamente al detectar cambios
- **Comando**: `npm run dev`

#### Jest (v29.7.0)
- **Uso**: Framework de testing
- **Función**: Pruebas unitarias e integración
- **Comandos**: `npm test`, `npm run test:watch`

### Frontend

#### Vite
- **Uso**: Build tool y dev server
- **Función**: Desarrollo rápido y build optimizado
- **Comandos**: `npm run dev`, `npm run build`

#### @vitejs/plugin-react (v4.2.1)
- **Uso**: Plugin de React para Vite
- **Función**: Soporte para JSX y React Fast Refresh

### Gestión de Versiones

- **Git**: Control de versiones
- **GitHub/GitLab/Bitbucket**: Repositorio remoto

---

## Gestión de Dependencias

### npm
- **Gestor de paquetes**: Node Package Manager
- **Versión mínima**: >= 6.0.0
- **Archivos**:
  - `package.json`: Dependencias y scripts
  - `package-lock.json`: Versiones exactas (lock file)

### Estructura de Dependencias

#### Backend (`backend/package.json`)
- **Dependencies**: Librerías de producción
- **DevDependencies**: Herramientas de desarrollo

#### Frontend (`frontend/package.json`)
- **Dependencies**: Librerías de producción
- **DevDependencies**: Herramientas de desarrollo y build

---

## Entornos

### Desarrollo

#### Requisitos
- **Node.js**: >= 14.0.0
- **npm**: >= 6.0.0
- **PostgreSQL**: Instalado localmente o remoto
- **MongoDB**: Instalado localmente o remoto (opcional)
- **Redis**: Instalado localmente (opcional)

#### Configuración
- Variables de entorno en archivos `.env`
- Hot reload activado
- Logging detallado
- CORS abierto (`*`)

#### Comandos
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

### Producción

#### Requisitos
- **Node.js**: >= 14.0.0 (especificado en engines)
- **npm**: >= 6.0.0
- **PostgreSQL**: Servidor de base de datos
- **MongoDB**: Servidor de base de datos
- **Redis**: Servidor de caché (opcional)

#### Configuración
- Variables de entorno en plataforma de hosting
- Build optimizado
- CORS configurado para dominio específico
- SSL/TLS habilitado
- Logging mínimo

#### Comandos
```bash
# Backend
cd backend
npm install --production
npm start

# Frontend
cd frontend
npm install
npm run build
```

---

## Estándares y Convenciones

### Código

#### Backend
- **Módulos**: CommonJS (require/module.exports)
- **Nomenclatura**: Español para modelos, rutas y controladores
- **Estilo**: JavaScript estándar con async/await
- **Estructura**: MVC (Model-View-Controller) con capa de servicios

#### Frontend
- **Módulos**: ES6 (import/export)
- **Nomenclatura**: Español para componentes y funciones de UI
- **Estilo**: React hooks, componentes funcionales
- **Estructura**: Component-based architecture

### Base de Datos

#### PostgreSQL
- **Tablas**: Nombres en minúsculas con guiones bajos
  - `pacientes`, `dentistas`, `citas`
- **Columnas**: Nombres en minúsculas con guiones bajos
  - `id_paciente`, `fecha_nacimiento`
- **Índices**: Prefijo `idx_` o nombre descriptivo
  - `idx_pacientes_correo`, `idx_cita_dentista_fecha`

#### MongoDB
- **Colecciones**: Nombres en minúsculas, plural
  - `expedientes`
- **Documentos**: CamelCase o snake_case según contexto
- **Índices**: Nombres descriptivos
  - `unique_expediente_paciente_dentista`

> 📖 **Para estructura completa de archivos y carpetas**: Ver [README.md](./README.md#-project-structure)

---

## Seguridad

### Autenticación y Autorización
- **Estado actual**: No implementado (futura versión)
- **Recomendado**: JWT tokens, sesiones

### CORS (Cross-Origin Resource Sharing)
- **Configuración**: Por variable de entorno
- **Desarrollo**: `CORS_ORIGIN=*` (todos los orígenes)
- **Producción**: `CORS_ORIGIN=https://frontend-url.com` (origen específico)

### SSL/TLS
- **Base de datos**: Habilitado para conexiones PostgreSQL y MongoDB
- **API**: HTTPS en producción (proporcionado por hosting)
- **Frontend**: HTTPS en producción (proporcionado por hosting)

### Variables de Entorno
- **Gestión**: Archivos `.env` (desarrollo) y variables de hosting (producción)
- **Seguridad**: Credenciales nunca en código
- **Archivos ignorados**: `.env` en `.gitignore`

### Validación
- **Frontend**: Validación de formularios
- **Backend**: Validación de datos antes de guardar
- **Base de datos**: Constraints y validaciones de esquema

### Transacciones
- **PostgreSQL**: Transacciones ACID para operaciones críticas
- **MongoDB**: Transacciones multi-documento para consistencia
- **Locks**: Prevención de condiciones de carrera

---

## Rendimiento

### Optimizaciones Implementadas

#### Base de Datos
- **Índices**: Optimizados para consultas frecuentes
- **Pool de conexiones**: Configurado para reutilizar conexiones
- **Queries optimizadas**: Uso de índices en consultas

#### Backend
- **Conexiones persistentes**: Pool de conexiones a bases de datos
- **Transacciones eficientes**: Solo cuando es necesario
- **Caché**: Redis opcional para mejorar rendimiento

#### Frontend
- **Build optimizado**: Vite optimiza el código para producción
- **Code splitting**: Automático con Vite
- **Lazy loading**: Carga bajo demanda de componentes

### Métricas de Rendimiento

#### Backend
- **Tiempo de respuesta**: < 200ms para consultas simples
- **Concurrencia**: Múltiples requests simultáneos
- **Pool de conexiones**: Configurado según carga esperada

#### Frontend
- **Tiempo de carga inicial**: Optimizado con Vite
- **Bundle size**: Minimizado para producción
- **Hot reload**: < 100ms en desarrollo

---

## Versiones y Compatibilidad

### Node.js
- **Mínima**: 14.0.0
- **Recomendada**: 18.x o superior
- **Probada**: 14.x, 16.x, 18.x, 20.x

### Navegadores Soportados
- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Safari (últimas 2 versiones)

### Bases de Datos
- **PostgreSQL**: 12.x, 13.x, 14.x, 15.x
- **MongoDB**: 4.4.x, 5.x, 6.x
- **Redis**: 6.x, 7.x (opcional)

---

**Última actualización:** 2025-01-15  
**Versión del sistema:** 1.0.0

