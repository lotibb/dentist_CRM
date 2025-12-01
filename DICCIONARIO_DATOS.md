# Diccionario de Datos - Dentist CRM

> 📖 **Volver al índice**: [README.md](./README.md) | [Documentación completa](./README.md#-documentación-del-proyecto)

Este documento describe la estructura completa de las bases de datos utilizadas en el sistema Dentist CRM.

---

## 📊 PostgreSQL Database

Base de datos relacional que almacena: Pacientes, Dentistas y Citas.

### Tabla: `pacientes`

Almacena la información de los pacientes del consultorio dental.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id_paciente` | INTEGER | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Identificador único del paciente |
| `nombre` | VARCHAR | NOT NULL | Nombre completo del paciente |
| `telefono` | VARCHAR | NULL | Número de teléfono de contacto |
| `correo` | VARCHAR | NOT NULL, UNIQUE | Correo electrónico del paciente (debe ser único) |
| `fecha_nacimiento` | DATE | NULL | Fecha de nacimiento del paciente |

**Índices:**
- PRIMARY KEY: `id_paciente`
- UNIQUE: `correo`

**Relaciones:**
- Un paciente puede tener muchas citas (1:N)
- Un paciente puede tener muchos expedientes (1:N)

---

### Tabla: `dentistas`

Almacena la información de los dentistas del consultorio.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id_dentista` | INTEGER | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Identificador único del dentista |
| `nombre` | VARCHAR | NOT NULL | Nombre completo del dentista |
| `telefono` | VARCHAR | NULL | Número de teléfono de contacto |
| `correo` | VARCHAR | NOT NULL, UNIQUE | Correo electrónico del dentista (debe ser único) |
| `especialidad` | VARCHAR | NULL | Especialidad del dentista (ej: Ortodoncia, Endodoncia, etc.) |

**Índices:**
- PRIMARY KEY: `id_dentista`
- UNIQUE: `correo`

**Relaciones:**
- Un dentista puede tener muchas citas (1:N)
- Un dentista puede tener muchos expedientes (1:N)

---

### Tabla: `citas`

Almacena las citas/consultas programadas entre pacientes y dentistas.

| Campo | Tipo | Restricciones | Descripción |
|-------|------|---------------|-------------|
| `id_cita` | INTEGER | PRIMARY KEY, AUTO_INCREMENT, NOT NULL | Identificador único de la cita |
| `id_paciente` | INTEGER | NOT NULL, FOREIGN KEY | Referencia al paciente (FK → pacientes.id_paciente) |
| `id_dentista` | INTEGER | NOT NULL, FOREIGN KEY | Referencia al dentista (FK → dentistas.id_dentista) |
| `fecha_cita` | TIMESTAMP | NOT NULL | Fecha y hora programada de la cita |
| `motivo` | VARCHAR | NULL | Motivo o razón de la cita |
| `estado` | VARCHAR | NOT NULL, DEFAULT 'Pendiente' | Estado de la cita (Pendiente, Confirmada, Cancelada, Completada) |

**Índices:**
- PRIMARY KEY: `id_cita`
- FOREIGN KEY: `id_paciente` → `pacientes.id_paciente`
- FOREIGN KEY: `id_dentista` → `dentistas.id_dentista`
- Índice compuesto: `(id_dentista, fecha_cita)` para búsquedas de disponibilidad
- Índice compuesto: `(id_paciente, fecha_cita)` para búsquedas de citas del paciente

**Relaciones:**
- Una cita pertenece a un paciente (N:1)
- Una cita pertenece a un dentista (N:1)

**Reglas de Negocio:**
- Un dentista no puede tener dos citas a la misma hora (validado en código)
- Un paciente no puede tener dos citas a la misma hora (validado en código)
- Las citas canceladas no bloquean horarios para nuevas citas

---

## 🍃 MongoDB Database

Base de datos NoSQL que almacena los expedientes médicos de los pacientes.

### Colección: `expedientes`

Almacena los expedientes médicos completos de los pacientes con cada dentista. Un paciente solo puede tener UN expediente por dentista.

| Campo | Tipo | Descripción | Requerido |
|-------|------|-------------|-----------|
| `_id` | ObjectId | Identificador único del documento (generado automáticamente por MongoDB) | Sí (automático) |
| `id_paciente` | Number | ID del paciente (referencia a PostgreSQL) | Sí |
| `id_dentista` | Number | ID del dentista (referencia a PostgreSQL) | Sí |
| `fecha_consulta` | Date | Fecha y hora de la consulta | Sí |
| `diagnostico` | String | Diagnóstico de la consulta | Sí |
| `sintomas` | String | Síntomas que presenta el paciente | No |
| `tratamiento` | String | Tratamiento aplicado o recomendado | No |
| `antecedentes` | String | Antecedentes médicos relevantes del paciente | No |
| `medicamentos` | String | Medicamentos recetados | No |
| `alergias` | String | Alergias conocidas del paciente | No |
| `procedimientos` | String | Procedimientos realizados durante la consulta | No |
| `proxima_cita` | Date | Fecha programada para la próxima consulta | No |
| `observaciones_clinicas` | String | Observaciones clínicas adicionales | No |
| `prescripcion` | String | Prescripción médica detallada | No |
| `notas` | String | Notas adicionales sobre el paciente o la consulta | No |
| `createdAt` | Date | Fecha de creación del expediente (generado automáticamente) | Sí (automático) |
| `updatedAt` | Date | Fecha de última actualización (actualizado automáticamente) | Sí (automático) |

**Índices:**
- PRIMARY KEY: `_id` (automático en MongoDB)
- UNIQUE COMPOUND INDEX: `{id_paciente: 1, id_dentista: 1}` - Previene que un paciente tenga múltiples expedientes con el mismo dentista

**Reglas de Negocio:**
- Un paciente solo puede tener UN expediente por dentista
- Si se intenta crear un expediente duplicado (mismo paciente-dentista), se lanza un error
- Para actualizar un expediente existente, se debe usar la función de actualización (PUT)
- El expediente se actualiza con cada nueva consulta, no se crea uno nuevo

---

## 🔗 Relaciones entre Bases de Datos

### Referencias Cruzadas

Los expedientes en MongoDB hacen referencia a:
- `id_paciente` → `pacientes.id_paciente` (PostgreSQL)
- `id_dentista` → `dentistas.id_dentista` (PostgreSQL)

**Nota:** Estas son referencias lógicas, no foreign keys reales, ya que MongoDB no soporta foreign keys. La integridad referencial debe manejarse en la capa de aplicación.

---

## 📋 Resumen de Entidades

### PostgreSQL (3 tablas)

1. **pacientes** - Información de pacientes
2. **dentistas** - Información de dentistas
3. **citas** - Citas/consultas programadas

### MongoDB (1 colección)

1. **expedientes** - Expedientes médicos completos

---

## 🔐 Restricciones y Validaciones

### PostgreSQL

- **pacientes.correo**: Debe ser único
- **dentistas.correo**: Debe ser único
- **citas**: Validación de no duplicados por dentista-fecha y paciente-fecha (en código)

### MongoDB

- **expedientes**: Índice único compuesto `(id_paciente, id_dentista)` previene duplicados
- Validación en código antes de insertar
- Manejo de errores de clave duplicada como respaldo

---

## 📝 Notas de Implementación

1. **Concurrencia**: Todas las operaciones críticas usan transacciones para prevenir condiciones de carrera
2. **Integridad**: Las validaciones se realizan tanto en código como a nivel de base de datos
3. **Índices**: Se crean automáticamente al iniciar el servidor (MongoDB) o mediante Sequelize (PostgreSQL)
4. **Timestamps**: 
   - PostgreSQL: No usa timestamps automáticos (timestamps: false)
   - MongoDB: Usa createdAt y updatedAt generados automáticamente

---

## 🔄 Flujo de Datos

1. **Crear Paciente/Dentista** → Se guarda en PostgreSQL
2. **Crear Cita** → Se guarda en PostgreSQL, valida disponibilidad
3. **Crear Expediente** → Se guarda en MongoDB, valida que no exista expediente para ese paciente-dentista
4. **Actualizar Expediente** → Se actualiza en MongoDB, permite agregar información de nuevas consultas

---

**Última actualización:** 2025-01-15
**Versión del sistema:** 1.0.0

