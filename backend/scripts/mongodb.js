// MongoDB Database Schema and Indexes for Dentist CRM
// Run this script with: mongosh <database_name> mongodb.js
// Or: mongosh "mongodb://connection-string" mongodb.js

// Select database (or create if it doesn't exist)
// Note: Replace 'dentist_crm' with your actual database name
use('dentist_crm');

// ============================================
// COLLECTION: expedientes
// ============================================
// Medical records collection
// One expediente per patient-dentist combination

// Create collection (if it doesn't exist, MongoDB will create it on first insert)
// This is optional as MongoDB creates collections automatically
db.createCollection('expedientes', {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            required: ['id_paciente', 'id_dentista', 'fecha_consulta', 'diagnostico'],
            properties: {
                id_paciente: {
                    bsonType: 'number',
                    description: 'ID del paciente (referencia a PostgreSQL) - required'
                },
                id_dentista: {
                    bsonType: 'number',
                    description: 'ID del dentista (referencia a PostgreSQL) - required'
                },
                fecha_consulta: {
                    bsonType: 'date',
                    description: 'Fecha y hora de la consulta - required'
                },
                diagnostico: {
                    bsonType: 'string',
                    description: 'Diagnóstico de la consulta - required'
                },
                sintomas: {
                    bsonType: ['string', 'null'],
                    description: 'Síntomas que presenta el paciente - optional'
                },
                tratamiento: {
                    bsonType: ['string', 'null'],
                    description: 'Tratamiento aplicado o recomendado - optional'
                },
                antecedentes: {
                    bsonType: ['string', 'null'],
                    description: 'Antecedentes médicos relevantes - optional'
                },
                medicamentos: {
                    bsonType: ['string', 'null'],
                    description: 'Medicamentos recetados - optional'
                },
                alergias: {
                    bsonType: ['string', 'null'],
                    description: 'Alergias conocidas del paciente - optional'
                },
                procedimientos: {
                    bsonType: ['string', 'null'],
                    description: 'Procedimientos realizados durante la consulta - optional'
                },
                proxima_cita: {
                    bsonType: ['date', 'null'],
                    description: 'Fecha programada para la próxima consulta - optional'
                },
                observaciones_clinicas: {
                    bsonType: ['string', 'null'],
                    description: 'Observaciones clínicas adicionales - optional'
                },
                prescripcion: {
                    bsonType: ['string', 'null'],
                    description: 'Prescripción médica detallada - optional'
                },
                notas: {
                    bsonType: ['string', 'null'],
                    description: 'Notas adicionales sobre el paciente o la consulta - optional'
                },
                createdAt: {
                    bsonType: 'date',
                    description: 'Fecha de creación del expediente - auto-generated'
                },
                updatedAt: {
                    bsonType: 'date',
                    description: 'Fecha de última actualización - auto-updated'
                }
            }
        }
    }
});

// ============================================
// INDEXES
// ============================================

// Unique compound index: Prevents duplicate expedientes for same patient-dentist
// A patient can only have ONE expediente per dentist
db.expedientes.createIndex(
    { 
        id_paciente: 1, 
        id_dentista: 1 
    },
    { 
        unique: true,
        name: 'unique_expediente_paciente_dentista',
        background: true
    }
);

// Index for querying expedientes by patient
db.expedientes.createIndex(
    { id_paciente: 1 },
    { 
        name: 'idx_expedientes_paciente',
        background: true
    }
);

// Index for querying expedientes by dentist
db.expedientes.createIndex(
    { id_dentista: 1 },
    { 
        name: 'idx_expedientes_dentista',
        background: true
    }
);

// Index for querying expedientes by consultation date
db.expedientes.createIndex(
    { fecha_consulta: -1 },
    { 
        name: 'idx_expedientes_fecha_consulta',
        background: true
    }
);

// Compound index for patient-date queries (for sorting by date)
db.expedientes.createIndex(
    { 
        id_paciente: 1, 
        fecha_consulta: -1 
    },
    { 
        name: 'idx_expedientes_paciente_fecha',
        background: true
    }
);

// Compound index for dentist-date queries (for sorting by date)
db.expedientes.createIndex(
    { 
        id_dentista: 1, 
        fecha_consulta: -1 
    },
    { 
        name: 'idx_expedientes_dentista_fecha',
        background: true
    }
);

// Index for createdAt (for sorting by creation date)
db.expedientes.createIndex(
    { createdAt: -1 },
    { 
        name: 'idx_expedientes_createdAt',
        background: true
    }
);

// ============================================
// VERIFICATION
// ============================================

// List all indexes on expedientes collection
print('\n=== Indexes on expedientes collection ===');
db.expedientes.getIndexes().forEach(function(index) {
    print('Index: ' + index.name);
    print('  Keys: ' + JSON.stringify(index.key));
    print('  Unique: ' + (index.unique || false));
    print('');
});

// Show collection stats
print('\n=== Collection Statistics ===');
print('Collection: expedientes');
print('Document count: ' + db.expedientes.countDocuments());
print('');

print('✅ MongoDB schema and indexes created successfully!');

