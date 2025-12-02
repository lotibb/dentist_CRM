# MongoDB Roles and Permissions Guide

> 📖 **Volver al índice**: [README.md](../../README.md) | [Documentación completa](../../README.md#-documentación-del-proyecto)

Esta guía explica el sistema de roles y permisos de MongoDB implementado para el CRM Dentista.

## 📋 Índice

- [Roles Definidos](#roles-definidos)
- [Instalación](#instalación)
- [Usuarios de Ejemplo](#usuarios-de-ejemplo)
- [Verificación de Roles](#verificación-de-roles)
- [Gestión de Usuarios](#gestión-de-usuarios)
- [Troubleshooting](#troubleshooting)

---

## Roles Definidos

El sistema implementa 3 roles principales con diferentes niveles de acceso en la base de datos `db_crm_dentistas` y la colección `expedientes`:

### 1. IT Administrator (`it_administrator`)

**Privilegios:**
- ✅ CRUD completo en todas las colecciones de `db_crm_dentistas`
- ✅ CRUD completo en la colección `expedientes`
- ✅ Crear y eliminar colecciones (`createCollection`, `dropCollection`)
- ✅ Crear y eliminar índices (`createIndex`, `dropIndex`)
- ✅ `dbAdmin` - Administración de base de datos
- ✅ `userAdmin` - Puede crear roles y usuarios

**Uso:** Administración completa de la base de datos MongoDB y gestión de usuarios.

### 2. Dentist Secretary (`dentist_secretary`)

**Privilegios:**
- ✅ **Expedientes**: CREATE, READ, UPDATE (no DELETE)
- ✅ Acciones: `find`, `insert`, `update`

**Uso:** Recepcionistas que gestionan expedientes médicos, pero no pueden eliminar registros.

### 3. Dentista (`dentista`)

**Privilegios:**
- ✅ CRUD completo en la colección `expedientes`
- ✅ Acciones: `find`, `insert`, `update`, `remove`

**Uso:** Dentistas que necesitan acceso completo a los expedientes médicos.

---

## Instalación

### Prerrequisitos

- MongoDB instalado y corriendo
- Acceso como administrador (usuario con privilegios `userAdminAnyDatabase` o `root`)
- Base de datos `db_crm_dentistas` creada (se crea automáticamente al usar)

### Pasos de Instalación

1. **Conectarse a MongoDB:**
   ```bash
   mongosh "mongodb://connection-string"
   ```

2. **Ejecutar el script de creación de roles:**
   ```bash
   mongosh "mongodb://connection-string" scripts/mongodb/mongodb_roles.js
   ```

   O desde dentro de mongosh:
   ```javascript
   load('scripts/mongodb/mongodb_roles.js')
   ```

3. **Verificar la instalación:**
   ```bash
   mongosh "mongodb://connection-string" scripts/mongodb/view_mongodb_roles.js
   ```

### Personalización

Antes de ejecutar el script, edita `scripts/mongodb/mongodb_roles.js` y cambia:

- **Nombres de usuarios** (líneas 95, 110, 125)
- **Contraseñas** (líneas 96, 111, 126)
- **Nombre de base de datos** (línea 6) si es diferente

---

## Usuarios de Ejemplo

El script crea usuarios de ejemplo para cada rol:

| Usuario | Rol | Contraseña (cambiar) |
|---------|-----|---------------------|
| `admin_user` | `it_administrator` | `admin_password_123` |
| `secretary_user` | `dentist_secretary` | `secretary_password_123` |
| `dentist_user` | `dentista` | `dentist_password_123` |

⚠️ **IMPORTANTE:** Cambia las contraseñas antes de usar en producción.

---

## Verificación de Roles

### Ver todos los roles creados

```javascript
use('db_crm_dentistas');
db.getRoles().forEach(function(role) {
    print('Role: ' + role.role);
    print('  Database: ' + role.db);
    if (role.privileges && role.privileges.length > 0) {
        print('  Privileges:');
        role.privileges.forEach(function(priv) {
            print('    - ' + priv.actions.join(', ') + ' on ' + priv.resource.db + '.' + (priv.resource.collection || '*'));
        });
    }
    print('');
});
```

### Ver todos los usuarios

```javascript
use('db_crm_dentistas');
db.getUsers().forEach(function(user) {
    print('User: ' + user.user);
    print('  Database: ' + user.db);
    if (user.roles && user.roles.length > 0) {
        print('  Roles: ' + user.roles.map(r => r.role).join(', '));
    }
    print('');
});
```

### Ejecutar todas las queries de verificación

```bash
mongosh "mongodb://connection-string" scripts/mongodb/view_mongodb_roles.js
```

---

## Gestión de Usuarios

### Crear un nuevo usuario

Como IT Administrator, puedes crear nuevos usuarios:

```javascript
use('db_crm_dentistas');
db.createUser({
    user: 'nuevo_usuario',
    pwd: 'password_segura',
    roles: ['dentista']
});
```

### Asignar rol a usuario existente

```javascript
use('db_crm_dentistas');
db.grantRolesToUser('usuario_existente', ['dentist_secretary']);
```

### Cambiar contraseña de usuario

```javascript
use('db_crm_dentistas');
db.changeUserPassword('nombre_usuario', 'nueva_password');
```

### Revocar rol de usuario

```javascript
use('db_crm_dentistas');
db.revokeRolesFromUser('usuario', ['dentista']);
```

### Eliminar usuario

```javascript
use('db_crm_dentistas');
db.dropUser('nombre_usuario');
```

### Ver usuarios y sus roles

```javascript
use('db_crm_dentistas');
db.getUsers().forEach(function(user) {
    print('User: ' + user.user);
    if (user.roles && user.roles.length > 0) {
        print('  Roles: ' + user.roles.map(r => r.role).join(', '));
    }
});
```

---

## Estructura de Archivos

```
scripts/mongodb/
├── mongodb.js                 # Script para crear estructura de colecciones e índices
├── mongodb_roles.js           # Script principal para crear roles y usuarios
├── view_mongodb_roles.js      # Queries para verificar roles y usuarios
└── MONGODB_ROLES_README.md   # Esta documentación
```

---

## Troubleshooting

### Error: "role already exists"

El script verifica si el rol existe antes de crearlo, así que es seguro ejecutarlo múltiples veces. Si quieres recrear un rol:

```javascript
use('db_crm_dentistas');
db.dropRole('nombre_rol');
// Luego ejecuta el script nuevamente
```

### Error: "permission denied"

Asegúrate de estar conectado como administrador (usuario con `userAdminAnyDatabase` o `root`).

### Usuario no puede conectarse

Verifica que:
1. La contraseña es correcta
2. El usuario tiene roles asignados
3. La base de datos existe

```javascript
// Verificar usuario
use('db_crm_dentistas');
var user = db.getUser('nombre_usuario');
printjson(user);
```

### Verificar conexión con un usuario específico

```bash
mongosh "mongodb://nombre_usuario:password@host:port/db_crm_dentistas"
```

### Usuario no tiene los privilegios esperados

Verifica que el rol esté correctamente asignado:

```javascript
use('db_crm_dentistas');
var user = db.getUser('nombre_usuario');
print('Roles: ' + user.roles.map(r => r.role).join(', '));
```

---

## Diferencias con PostgreSQL

MongoDB tiene un sistema de autenticación diferente a PostgreSQL:

1. **Roles a nivel de base de datos:** Los roles se crean en la base de datos específica
2. **Acciones específicas:** En lugar de CRUD genérico, MongoDB usa acciones como `find`, `insert`, `update`, `remove`
3. **Recursos:** Se especifican por base de datos y colección
4. **Usuarios:** Se crean con `db.createUser()` en lugar de `CREATE ROLE`

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
   - Usa `view_mongodb_roles.js` para auditorías

4. **Rotación de contraseñas:**
   - Cambia contraseñas periódicamente
   - Usa diferentes contraseñas para cada usuario

---

## Referencias

- [MongoDB Documentation - Authentication](https://www.mongodb.com/docs/manual/core/authentication/)
- [MongoDB Documentation - Role-Based Access Control](https://www.mongodb.com/docs/manual/core/authorization/)
- [MongoDB Documentation - createRole](https://www.mongodb.com/docs/manual/reference/command/createRole/)
- [MongoDB Documentation - createUser](https://www.mongodb.com/docs/manual/reference/command/createUser/)

---

**Última actualización:** 2025-01-15  
**Versión del sistema:** 1.0.0

