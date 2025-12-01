CREATE TABLE dentistas (
    id_dentista SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    especialidad VARCHAR(100),
    telefono VARCHAR(20),
    correo VARCHAR(120) UNIQUE NOT NULL,
    creado_en TIMESTAMP DEFAULT NOW()
);

-- Index recomendado para búsquedas por correo
CREATE INDEX idx_dentistas_correo ON dentistas(correo);



CREATE TABLE pacientes (
    id_paciente SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    telefono VARCHAR(20),
    correo VARCHAR(120) UNIQUE NOT NULL,
    fecha_nacimiento DATE,
    creado_en TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pacientes_correo ON pacientes(correo);



CREATE TABLE citas (
    id_cita SERIAL PRIMARY KEY,
    id_dentista INT NOT NULL,
    id_paciente INT NOT NULL,
    fecha_cita TIMESTAMP NOT NULL,
    estado VARCHAR(30) DEFAULT 'Activa',

    CONSTRAINT fk_cita_dentista
        FOREIGN KEY (id_dentista)
        REFERENCES dentistas(id_dentista)
        ON DELETE CASCADE,

    CONSTRAINT fk_cita_paciente
        FOREIGN KEY (id_paciente)
        REFERENCES pacientes(id_paciente)
        ON DELETE CASCADE
);


CREATE UNIQUE INDEX idx_cita_dentista_fecha
ON citas(id_dentista, fecha_cita);


CREATE UNIQUE INDEX idx_cita_paciente_fecha
ON citas(id_paciente, fecha_cita);