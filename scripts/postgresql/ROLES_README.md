# PostgreSQL Roles and Permissions Guide

> 📖 **Volver al índice**: [README.md](../README.md) | [Documentación completa](../README.md#-documentación-del-proyecto)

Esta guía explica el sistema de roles y permisos de PostgreSQL implementado para el CRM Dentista.

## 📋 Índice

- [Roles Definidos](#roles-definidos)
- [Instalación](#instalación)
- [Usuarios de Ejemplo](#usuarios-de-ejemplo)
- [Verificación de Roles](#verificación-de-roles)
- [Gestión de Usuarios](#gestión-de-usuarios)
- [Troubleshooting](#troubleshooting)

---

## Roles Definidos

El sistema implementa 4 roles principales con diferentes niveles de acceso:

### 1. IT Administrator (`it_administrator`)

**Privilegios:**
- ✅ CRUD completo en todas las tablas (`citas`, `dentistas`, `pacientes`)
- ✅ Privilegios en todas las secuencias (auto-increment)
- ✅ Privilegios en tablas futuras (ALTER DEFAULT PRIVILEGES)
- ✅ `CREATEROLE` - Puede crear nuevos usuarios/roles
- ✅ `CREATE` en schema - Puede crear tablas, vistas, funciones
- ✅ `USAGE` en schema - Acceso al esquema público

**Uso:** Administración completa de la base de datos y gestión de usuarios.

### 2. Dentist Secretary (`dentist_secretary`)

**Privilegios:**
- ✅ **Citas**: CREATE, READ, UPDATE (no DELETE)
- ✅ **Dentistas**: READ solamente
- ✅ **Pacientes**: CREATE, READ, UPDATE (no DELETE)

**Uso:** Recepcionistas que gestionan citas y pacientes, pero no pueden eliminar registros.

### 3. Dentista (`dentista`)

**Privilegios:**
- ✅ CRUD completo en todas las tablas (`citas`, `dentistas`, `pacientes`)
- ✅ Privilegios en todas las secuencias

**Uso:** Dentistas que necesitan acceso completo a todos los datos del sistema.

### 4. Paciente (`paciente`)

**Privilegios:**
- ✅ **Citas**: READ solamente

**Uso:** Pacientes que solo pueden consultar sus citas.

---

## Instalación

### Prerrequisitos

- PostgreSQL instalado y corriendo
- Acceso como superusuario (`postgres`)
- Base de datos `db_crm_dentistas` creada

### Pasos de Instalación

1. **Conectarse a PostgreSQL:**
   ```bash
   psql -U postgres -d db_crm_dentistas
   ```

2. **Ejecutar el script de creación de roles:**
   ```bash
   psql -U postgres -d db_crm_dentistas -f scripts/postgresql/role_creation.sql
   ```

   O desde dentro de psql:
   ```sql
   \i scripts/postgresql/role_creation.sql
   ```

3. **Verificar la instalación:**
   ```bash
   psql -U postgres -d db_crm_dentistas -f scripts/postgresql/view_roles_privileges.sql
   ```

### Personalización

Antes de ejecutar el script, edita `scripts/postgresql/role_creation.sql` y cambia:

- **Nombres de usuarios** (líneas 71, 81, 91, 101)
- **Contraseñas** (líneas 72, 82, 92, 102)
- **Nombre de base de datos** (línea 1) si es diferente

---

## Usuarios de Ejemplo

El script crea usuarios de ejemplo para cada rol:

| Usuario | Rol | Contraseña (cambiar) |
|---------|-----|---------------------|
| `admin_user` | `it_administrator` | `admin_password_123` |
| `secretary_user` | `dentist_secretary` | `secretary_password_123` |
| `dentist_user` | `dentista` | `dentist_password_123` |
| `patient_user` | `paciente` | `patient_password_123` |

⚠️ **IMPORTANTE:** Cambia las contraseñas antes de usar en producción.

---

## Verificación de Roles

### Ver todos los roles creados

```sql
SELECT 
    rolname AS role_name,
    rolcanlogin AS can_login,
    rolcreatedb AS can_create_db,
    rolcreaterole AS can_create_role
FROM pg_roles
WHERE rolname IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
ORDER BY rolname;
```

### Ver privilegios por rol y tabla

```sql
SELECT 
    grantee AS role_name,
    table_name,
    string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
FROM information_schema.role_table_grants
WHERE grantee IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
    AND table_schema = 'public'
GROUP BY grantee, table_name
ORDER BY grantee, table_name;
```

### Ejecutar todas las queries de verificación

```bash
psql -U postgres -d db_crm_dentistas -f scripts/view_roles_privileges.sql
```

---

## Gestión de Usuarios

### Crear un nuevo usuario

Como IT Administrator, puedes crear nuevos usuarios:

```sql
-- Crear usuario y asignar rol
CREATE ROLE nuevo_usuario WITH LOGIN PASSWORD 'password_segura';
GRANT dentista TO nuevo_usuario;
```

### Asignar rol a usuario existente

```sql
GRANT dentista TO usuario_existente;
```

### Cambiar contraseña de usuario

```sql
ALTER ROLE nombre_usuario WITH PASSWORD 'nueva_password';
```

### Revocar rol de usuario

```sql
REVOKE dentista FROM usuario;
```

### Eliminar usuario

```sql
DROP ROLE nombre_usuario;
```

### Ver usuarios y sus roles

```sql
SELECT 
    r.rolname AS usuario,
    m.rolname AS rol_asignado
FROM pg_roles r
JOIN pg_auth_members am ON r.oid = am.member
JOIN pg_roles m ON am.roleid = m.oid
WHERE r.rolcanlogin = true
ORDER BY r.rolname;
```

---

## Estructura de Archivos

```
scripts/postgresql/
├── postgresql.sql             # Script para crear estructura de tablas
├── role_creation.sql          # Script principal para crear roles y usuarios
├── view_roles_privileges.sql  # Queries para verificar roles y privilegios
└── ROLES_README.md           # Esta documentación
```

---

## Troubleshooting

### Error: "role already exists"

El script verifica si el rol existe antes de crearlo, así que es seguro ejecutarlo múltiples veces. Si quieres recrear un rol:

```sql
DROP ROLE IF EXISTS nombre_rol;
-- Luego ejecuta el script nuevamente
```

### Error: "permission denied"

Asegúrate de estar conectado como superusuario (`postgres`) o como `it_administrator` con privilegios suficientes.

### Usuario no puede conectarse

Verifica que:
1. El rol tiene `WITH LOGIN` habilitado
2. La contraseña es correcta
3. El usuario tiene privilegios en la base de datos

```sql
-- Verificar si el rol puede hacer login
SELECT rolname, rolcanlogin FROM pg_roles WHERE rolname = 'nombre_usuario';

-- Habilitar login si es necesario
ALTER ROLE nombre_usuario WITH LOGIN;
```

### Verificar conexión con un rol específico

```bash
psql -U nombre_usuario -d db_crm_dentistas
```

### Usuario no tiene los privilegios esperados

Verifica que el rol esté correctamente asignado:

```sql
-- Ver roles asignados a un usuario
SELECT r.rolname AS usuario, m.rolname AS rol
FROM pg_roles r
JOIN pg_auth_members am ON r.oid = am.member
JOIN pg_roles m ON am.roleid = m.oid
WHERE r.rolname = 'nombre_usuario';
```

---

## Seguridad

### Mejores Prácticas

1. **Contraseñas seguras:**
   - Usa contraseñas complejas (mínimo 12 caracteres)
   - Combina mayúsculas, minúsculas, números y símbolos
   - No uses contraseñas por defecto en producción

2. **Principio de menor privilegio:**
   - Asigna solo los permisos necesarios
   - Usa el rol más restrictivo posible para cada usuario

3. **Auditoría:**
   - Revisa regularmente los roles y permisos
   - Documenta cambios en roles y usuarios
   - Usa `view_roles_privileges.sql` para auditorías

4. **Rotación de contraseñas:**
   - Cambia contraseñas periódicamente
   - Usa diferentes contraseñas para cada usuario

---

## Referencias

- [PostgreSQL Documentation - Roles and Privileges](https://www.postgresql.org/docs/current/user-manag.html)
- [PostgreSQL Documentation - GRANT](https://www.postgresql.org/docs/current/sql-grant.html)
- [PostgreSQL Documentation - CREATE ROLE](https://www.postgresql.org/docs/current/sql-createrole.html)

---

**Última actualización:** 2025-01-15  
**Versión del sistema:** 1.0.0

