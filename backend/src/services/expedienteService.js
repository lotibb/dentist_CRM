const { ObjectId } = require('mongodb');
const { getDb, client } = require('../database/mongodb.connection');

const COLLECTION_NAME = 'expedientes';

/**
 * Obtener la colección de expedientes
 */
const getCollection = (session = null) => {
  const db = getDb();
  const collection = db.collection(COLLECTION_NAME);
  return session ? collection.withOptions({ session }) : collection;
};

/**
 * Validar los datos de un expediente
 */
const validateExpediente = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.id_paciente !== undefined) {
    if (data.id_paciente === undefined || data.id_paciente === null) {
      errors.push('id_paciente es requerido');
    } else if (typeof data.id_paciente !== 'number' && typeof data.id_paciente !== 'string') {
      errors.push('id_paciente debe ser un número');
    }
  }

  if (!isUpdate || data.id_dentista !== undefined) {
    if (data.id_dentista === undefined || data.id_dentista === null) {
      errors.push('id_dentista es requerido');
    } else if (typeof data.id_dentista !== 'number' && typeof data.id_dentista !== 'string') {
      errors.push('id_dentista debe ser un número');
    }
  }

  if (!isUpdate || data.fecha_consulta !== undefined) {
    if (!data.fecha_consulta) {
      errors.push('fecha_consulta es requerida');
    } else {
      const fecha = new Date(data.fecha_consulta);
      if (isNaN(fecha.getTime())) {
        errors.push('fecha_consulta debe ser una fecha válida');
      }
    }
  }

  if (!isUpdate || data.diagnostico !== undefined) {
    if (!data.diagnostico || typeof data.diagnostico !== 'string' || data.diagnostico.trim() === '') {
      errors.push('diagnostico es requerido');
    }
  }

  if (errors.length > 0) {
    throw new Error(`Validación fallida: ${errors.join(', ')}`);
  }

  return true;
};

/**
 * Normalizar los datos de un expediente antes de guardar
 */
const normalizeExpediente = (data, isUpdate = false) => {
  const expediente = {
    updatedAt: new Date()
  };

  if (data.id_paciente !== undefined) {
    expediente.id_paciente = Number(data.id_paciente);
  }
  
  if (data.id_dentista !== undefined) {
    expediente.id_dentista = Number(data.id_dentista);
  }
  
  if (data.fecha_consulta !== undefined) {
    expediente.fecha_consulta = new Date(data.fecha_consulta);
  }
  
  if (data.diagnostico !== undefined) {
    expediente.diagnostico = data.diagnostico.trim();
  }
  
  if (data.tratamiento !== undefined) {
    expediente.tratamiento = data.tratamiento ? data.tratamiento.trim() : null;
  }
  
  if (data.sintomas !== undefined) {
    expediente.sintomas = data.sintomas ? data.sintomas.trim() : null;
  }
  
  if (data.antecedentes !== undefined) {
    expediente.antecedentes = data.antecedentes ? data.antecedentes.trim() : null;
  }
  
  if (data.medicamentos !== undefined) {
    expediente.medicamentos = data.medicamentos ? data.medicamentos.trim() : null;
  }
  
  if (data.alergias !== undefined) {
    expediente.alergias = data.alergias ? data.alergias.trim() : null;
  }
  
  if (data.procedimientos !== undefined) {
    expediente.procedimientos = data.procedimientos ? data.procedimientos.trim() : null;
  }
  
  if (data.proxima_cita !== undefined) {
    expediente.proxima_cita = data.proxima_cita ? new Date(data.proxima_cita) : null;
  }
  
  if (data.observaciones_clinicas !== undefined) {
    expediente.observaciones_clinicas = data.observaciones_clinicas ? data.observaciones_clinicas.trim() : null;
  }
  
  if (data.prescripcion !== undefined) {
    expediente.prescripcion = data.prescripcion ? data.prescripcion.trim() : null;
  }
  
  if (data.notas !== undefined) {
    expediente.notas = data.notas ? data.notas.trim() : null;
  }

  if (!isUpdate) {
    expediente.createdAt = new Date();
  }

  return expediente;
};

/**
 * Formatear un documento de MongoDB para la respuesta
 */
const formatExpediente = (doc) => {
  if (!doc) return null;

  return {
    id: doc._id.toString(),
    id_expediente: doc._id.toString(), // Para compatibilidad con el frontend
    id_paciente: doc.id_paciente,
    id_dentista: doc.id_dentista,
    fecha_consulta: doc.fecha_consulta,
    diagnostico: doc.diagnostico,
    tratamiento: doc.tratamiento || null,
    sintomas: doc.sintomas || null,
    antecedentes: doc.antecedentes || null,
    medicamentos: doc.medicamentos || null,
    alergias: doc.alergias || null,
    procedimientos: doc.procedimientos || null,
    proxima_cita: doc.proxima_cita || null,
    observaciones_clinicas: doc.observaciones_clinicas || null,
    prescripcion: doc.prescripcion || null,
    notas: doc.notas || null,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt
  };
};

/**
 * Obtener todos los expedientes
 */
async function findAll(filters = {}) {
  try {
    const collection = getCollection();
    const expedientes = await collection
      .find(filters)
      .sort({ fecha_consulta: -1 })
      .toArray();
    return expedientes.map(formatExpediente);
  } catch (error) {
    throw new Error(`Error al obtener expedientes: ${error.message}`);
  }
}

/**
 * Obtener un expediente por ID
 */
async function findById(id, session = null) {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID de expediente inválido');
    }

    const collection = getCollection(session);
    const expediente = await collection.findOne({ _id: new ObjectId(id) });
    
    if (!expediente) {
      throw new Error('Expediente no encontrado');
    }

    return formatExpediente(expediente);
  } catch (error) {
    throw new Error(`Error al obtener expediente: ${error.message}`);
  }
}

/**
 * Crear un nuevo expediente con manejo de concurrencia
 */
async function createExpediente(data) {
  const session = client.startSession();
  let insertedId = null;
  
  try {
    await session.withTransaction(async () => {
      validateExpediente(data, false);
      const expediente = normalizeExpediente(data, false);
      
      const collection = getCollection(session);
      
      // Verificar si ya existe un expediente con los mismos datos críticos
      // para prevenir duplicados en condiciones de concurrencia
      const existing = await collection.findOne(
        {
          id_paciente: expediente.id_paciente,
          id_dentista: expediente.id_dentista,
          fecha_consulta: expediente.fecha_consulta
        },
        { session }
      );
      
      if (existing) {
        throw new Error('Ya existe un expediente para este paciente, dentista y fecha de consulta');
      }
      
      const result = await collection.insertOne(expediente, { session });
      
      if (!result.insertedId) {
        throw new Error('Error al crear el expediente');
      }
      
      insertedId = result.insertedId;
    }, {
      readConcern: { level: 'majority' },
      writeConcern: { w: 'majority' }
    });
    
    // Obtener el expediente creado después de la transacción
    const collection = getCollection();
    const created = await collection.findOne({ _id: insertedId });
    
    if (!created) {
      throw new Error('Error al recuperar el expediente creado');
    }
    
    return formatExpediente(created);
  } catch (error) {
    throw new Error(`Error al crear expediente: ${error.message}`);
  } finally {
    await session.endSession();
  }
}

/**
 * Actualizar un expediente existente con manejo de concurrencia
 */
async function updateExpediente(id, data) {
  const session = client.startSession();
  
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID de expediente inválido');
    }

    let updatedExpediente = null;

    await session.withTransaction(async () => {
      validateExpediente(data, true);
      const updateData = normalizeExpediente(data, true);
      
      const collection = getCollection(session);
      
      // Obtener el expediente actual con lock para prevenir condiciones de carrera
      const current = await collection.findOne(
        { _id: new ObjectId(id) },
        { session }
      );

      if (!current) {
        throw new Error('Expediente no encontrado');
      }

      // Si se está actualizando fecha_consulta, verificar duplicados
      if (updateData.fecha_consulta && 
          (updateData.id_paciente !== undefined || updateData.id_dentista !== undefined)) {
        const pacienteId = updateData.id_paciente !== undefined 
          ? updateData.id_paciente 
          : current.id_paciente;
        const dentistaId = updateData.id_dentista !== undefined 
          ? updateData.id_dentista 
          : current.id_dentista;
        const fechaConsulta = updateData.fecha_consulta;

        const duplicate = await collection.findOne(
          {
            _id: { $ne: new ObjectId(id) },
            id_paciente: pacienteId,
            id_dentista: dentistaId,
            fecha_consulta: fechaConsulta
          },
          { session }
        );

        if (duplicate) {
          throw new Error('Ya existe otro expediente para este paciente, dentista y fecha de consulta');
        }
      }

      // Actualizar el expediente
      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData },
        { session }
      );

      if (result.matchedCount === 0) {
        throw new Error('Expediente no encontrado durante la actualización');
      }

      // Obtener el expediente actualizado dentro de la transacción
      updatedExpediente = await collection.findOne(
        { _id: new ObjectId(id) },
        { session }
      );
    }, {
      readConcern: { level: 'majority' },
      writeConcern: { w: 'majority' }
    });

    return formatExpediente(updatedExpediente);
  } catch (error) {
    throw new Error(`Error al actualizar expediente: ${error.message}`);
  } finally {
    await session.endSession();
  }
}

/**
 * Eliminar un expediente con manejo de concurrencia
 */
async function deleteExpediente(id) {
  const session = client.startSession();
  
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error('ID de expediente inválido');
    }

    await session.withTransaction(async () => {
      const collection = getCollection(session);
      
      // Verificar que el expediente existe antes de eliminarlo
      const expediente = await collection.findOne(
        { _id: new ObjectId(id) },
        { session }
      );

      if (!expediente) {
        throw new Error('Expediente no encontrado');
      }

      // Eliminar el expediente
      const result = await collection.deleteOne(
        { _id: new ObjectId(id) },
        { session }
      );

      if (result.deletedCount === 0) {
        throw new Error('Error al eliminar el expediente');
      }
    }, {
      readConcern: { level: 'majority' },
      writeConcern: { w: 'majority' }
    });

    return true;
  } catch (error) {
    throw new Error(`Error al eliminar expediente: ${error.message}`);
  } finally {
    await session.endSession();
  }
}

module.exports = {
  findAll,
  findById,
  createExpediente,
  updateExpediente,
  deleteExpediente
};

