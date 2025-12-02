-- Queries para ver roles, usuarios y privilegios
-- Ejecutar: psql -U postgres -d db_crm_dentistas -f view_roles_privileges.sql

-- 1. Listar todos los roles y usuarios
SELECT 
    rolname AS role_name,
    rolcanlogin AS can_login,
    rolcreatedb AS can_create_db,
    rolcreaterole AS can_create_role,
    rolsuper AS is_superuser
FROM pg_roles
WHERE rolname IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
ORDER BY rolname;

-- 2. Resumen de privilegios por rol y tabla
SELECT 
    grantee AS role_name,
    table_name,
    string_agg(privilege_type, ', ' ORDER BY privilege_type) AS privileges
FROM information_schema.role_table_grants
WHERE grantee IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
    AND table_schema = 'public'
GROUP BY grantee, table_name
ORDER BY grantee, table_name;

-- 3. Ver privilegios en tablas por rol
SELECT 
    grantee AS role_name,
    table_schema,
    table_name,
    privilege_type
FROM information_schema.role_table_grants
WHERE grantee IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
ORDER BY grantee, table_name, privilege_type;

-- 4. Ver privilegios en secuencias por rol
SELECT 
    grantee AS role_name,
    sequence_schema,
    sequence_name,
    privilege_type
FROM information_schema.role_usage_grants
WHERE grantee IN ('it_administrator', 'dentist_secretary', 'dentista', 'paciente')
    AND object_type = 'SEQUENCE'
ORDER BY grantee, sequence_name;



