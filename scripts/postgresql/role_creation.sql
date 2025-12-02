-- Script de Creación de Roles y Permisos - db_crm_dentistas
-- Ejecutar: psql -U postgres -d db_crm_dentistas -f role_creation.sql

-- 1. IT Administrator
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'it_administrator') THEN
        CREATE ROLE it_administrator;
    END IF;
END
$$;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO it_administrator;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO it_administrator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO it_administrator;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO it_administrator;
ALTER ROLE it_administrator CREATEROLE;
GRANT CREATE ON SCHEMA public TO it_administrator;
GRANT USAGE ON SCHEMA public TO it_administrator;
ALTER ROLE it_administrator WITH LOGIN;

-- 2. Dentist Secretary
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'dentist_secretary') THEN
        CREATE ROLE dentist_secretary;
    END IF;
END
$$;

GRANT SELECT, INSERT, UPDATE ON TABLE citas TO dentist_secretary;
GRANT USAGE, SELECT ON SEQUENCE citas_id_cita_seq TO dentist_secretary;
GRANT SELECT ON TABLE dentistas TO dentist_secretary;
GRANT SELECT, INSERT, UPDATE ON TABLE pacientes TO dentist_secretary;
GRANT USAGE, SELECT ON SEQUENCE pacientes_id_paciente_seq TO dentist_secretary;
ALTER ROLE dentist_secretary WITH LOGIN;

-- 3. Dentista
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'dentista') THEN
        CREATE ROLE dentista;
    END IF;
END
$$;

GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE citas TO dentista;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE dentistas TO dentista;
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE pacientes TO dentista;
GRANT USAGE, SELECT ON SEQUENCE citas_id_cita_seq TO dentista;
GRANT USAGE, SELECT ON SEQUENCE dentistas_id_dentista_seq TO dentista;
GRANT USAGE, SELECT ON SEQUENCE pacientes_id_paciente_seq TO dentista;
ALTER ROLE dentista WITH LOGIN;

-- 4. Paciente
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'paciente') THEN
        CREATE ROLE paciente;
    END IF;
END
$$;

GRANT SELECT ON TABLE citas TO paciente;
ALTER ROLE paciente WITH LOGIN;

-- Crear usuarios bajo cada rol
-- IT Administrator User
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'admin_user') THEN
        CREATE ROLE admin_user WITH LOGIN PASSWORD 'admin_password_123';
        GRANT it_administrator TO admin_user;
    END IF;
END
$$;

-- Dentist Secretary User
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'secretary_user') THEN
        CREATE ROLE secretary_user WITH LOGIN PASSWORD 'secretary_password_123';
        GRANT dentist_secretary TO secretary_user;
    END IF;
END
$$;

-- Dentista User
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'dentist_user') THEN
        CREATE ROLE dentist_user WITH LOGIN PASSWORD 'dentist_password_123';
        GRANT dentista TO dentist_user;
    END IF;
END
$$;

-- Paciente User
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'patient_user') THEN
        CREATE ROLE patient_user WITH LOGIN PASSWORD 'patient_password_123';
        GRANT paciente TO patient_user;
    END IF;
END
$$;
