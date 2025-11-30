const {
    createPatient,
    updatePatient,
    deletePatient
} = require("../services/patientService");

const Paciente = require("../models/Paciente");

module.exports = {
  
    async listar(req, res) {
        try {
            const pacientes = await Paciente.findAll();
            res.json(pacientes);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    // GET paciente por ID
    async obtener(req, res) {
        try {
            const paciente = await Paciente.findByPk(req.params.id);
            if (!paciente)
                return res.status(404).json({ error: "Paciente no encontrado" });

            res.json(paciente);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async crear(req, res) {
        try {
            const paciente = await createPatient(req.body);
            res.status(201).json(paciente);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

 
    async actualizar(req, res) {
        try {
            const paciente = await updatePatient(req.params.id, req.body);
            res.json(paciente);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    // DELETE eliminar paciente
    async eliminar(req, res) {
        try {
            await deletePatient(req.params.id);
            res.json({ mensaje: "Paciente eliminado" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
