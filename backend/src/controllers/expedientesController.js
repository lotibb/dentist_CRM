const {
  findAll,
  findById,
  createExpediente,
  updateExpediente,
  deleteExpediente
} = require("../services/expedienteService");

module.exports = {
  
  async listar(req, res) {
    try {
      const expedientes = await findAll();
      res.json(expedientes);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async obtener(req, res) {
    try {
      const expediente = await findById(req.params.id);
      if (!expediente)
        return res.status(404).json({ error: "Expediente no encontrado" });

      res.json(expediente);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async crear(req, res) {
    try {
      const expediente = await createExpediente(req.body);
      res.status(201).json(expediente);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async actualizar(req, res) {
    try {
      const expediente = await updateExpediente(req.params.id, req.body);
      res.json(expediente);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  async eliminar(req, res) {
    try {
      await deleteExpediente(req.params.id);
      res.json({ mensaje: "Expediente eliminado" });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

