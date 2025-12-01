/**
 * Modelo de Expediente para MongoDB
 * 
 * Define la estructura de un documento expediente en la colección 'expedientes'
 * de la base de datos 'crm_dentistas'
 */

/**
 * Esquema de un Expediente de Dentista
 * 
 * @typedef {Object} ExpedienteSchema
 * @property {ObjectId} _id - ID único generado automáticamente por MongoDB
 * @property {Number} id_paciente - ID del paciente (referencia a tabla pacientes)
 * @property {Number} id_dentista - ID del dentista (referencia a tabla dentistas)
 * @property {Date} fecha_consulta - Fecha y hora de la consulta
 * @property {String} diagnostico - Diagnóstico del paciente (requerido)
 * @property {String|null} tratamiento - Tratamiento aplicado (opcional)
 * @property {String|null} sintomas - Síntomas que presenta el paciente (opcional)
 * @property {String|null} antecedentes - Antecedentes médicos relevantes (opcional)
 * @property {String|null} medicamentos - Medicamentos que está tomando el paciente (opcional)
 * @property {String|null} alergias - Alergias conocidas del paciente (opcional)
 * @property {String|null} procedimientos - Procedimientos realizados durante la consulta (opcional)
 * @property {Date|null} proxima_cita - Fecha de próxima cita programada (opcional)
 * @property {String|null} observaciones_clinicas - Observaciones clínicas adicionales (opcional)
 * @property {String|null} prescripcion - Prescripción médica o receta (opcional)
 * @property {String|null} notas - Notas adicionales sobre la consulta (opcional)
 * @property {Date} createdAt - Fecha de creación del expediente
 * @property {Date} updatedAt - Fecha de última actualización
 */

/**
 * Estructura del documento Expediente
 */
const ExpedienteSchema = {
  // Campos principales
  id_paciente: {
    type: Number,
    required: true,
    description: 'ID del paciente asociado al expediente'
  },
  id_dentista: {
    type: Number,
    required: true,
    description: 'ID del dentista que atendió al paciente'
  },
  fecha_consulta: {
    type: Date,
    required: true,
    description: 'Fecha y hora de la consulta'
  },
  diagnostico: {
    type: String,
    required: true,
    description: 'Diagnóstico del paciente'
  },
  tratamiento: {
    type: String,
    required: false,
    default: null,
    description: 'Tratamiento aplicado al paciente'
  },
  sintomas: {
    type: String,
    required: false,
    default: null,
    description: 'Síntomas que presenta el paciente'
  },
  antecedentes: {
    type: String,
    required: false,
    default: null,
    description: 'Antecedentes médicos relevantes del paciente'
  },
  medicamentos: {
    type: String,
    required: false,
    default: null,
    description: 'Medicamentos que está tomando el paciente'
  },
  alergias: {
    type: String,
    required: false,
    default: null,
    description: 'Alergias conocidas del paciente'
  },
  procedimientos: {
    type: String,
    required: false,
    default: null,
    description: 'Procedimientos realizados durante la consulta'
  },
  proxima_cita: {
    type: Date,
    required: false,
    default: null,
    description: 'Fecha de próxima cita programada'
  },
  observaciones_clinicas: {
    type: String,
    required: false,
    default: null,
    description: 'Observaciones clínicas adicionales'
  },
  prescripcion: {
    type: String,
    required: false,
    default: null,
    description: 'Prescripción médica o receta'
  },
  notas: {
    type: String,
    required: false,
    default: null,
    description: 'Notas adicionales sobre la consulta'
  },
  // Timestamps
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    description: 'Fecha de creación del expediente'
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
    description: 'Fecha de última actualización'
  }
};

/**
 * Ejemplo de documento Expediente
 */
const ExpedienteExample = {
  _id: '507f1f77bcf86cd799439011',
  id_paciente: 1,
  id_dentista: 1,
  fecha_consulta: new Date('2024-01-15T10:30:00Z'),
  diagnostico: 'Caries en muela 36',
  tratamiento: 'Limpieza y empaste',
  sintomas: 'Dolor al masticar, sensibilidad al frío',
  antecedentes: 'Hipertensión controlada, sin alergias conocidas',
  medicamentos: 'Losartán 50mg diario',
  alergias: 'Ninguna conocida',
  procedimientos: 'Limpieza dental, aplicación de anestesia local, empaste composite',
  proxima_cita: new Date('2024-04-15T10:30:00Z'),
  observaciones_clinicas: 'Paciente con buena higiene bucal, se recomienda uso de hilo dental',
  prescripcion: 'Ibuprofeno 400mg cada 8 horas por 3 días si hay dolor',
  notas: 'Paciente requiere seguimiento en 3 meses',
  createdAt: new Date('2024-01-15T10:30:00Z'),
  updatedAt: new Date('2024-01-15T10:30:00Z')
};

/**
 * Validación de campos requeridos
 */
const requiredFields = ['id_paciente', 'id_dentista', 'fecha_consulta', 'diagnostico'];

/**
 * Índices recomendados para la colección
 */
const recommendedIndexes = [
  { id_paciente: 1 },           // Para búsquedas por paciente
  { id_dentista: 1 },            // Para búsquedas por dentista
  { fecha_consulta: -1 },        // Para ordenar por fecha (más recientes primero)
  { id_paciente: 1, fecha_consulta: -1 } // Índice compuesto para búsquedas por paciente y fecha
];

module.exports = {
  ExpedienteSchema,
  ExpedienteExample,
  requiredFields,
  recommendedIndexes,
  COLLECTION_NAME: 'expedientes',
  DB_NAME: 'crm_dentistas'
};
