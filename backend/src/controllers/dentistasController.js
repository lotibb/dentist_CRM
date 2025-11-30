// controllers/dentistasController.js
const {
    createDentist,
    updateDentist,
    deleteDentist
} = require("../services/dentistService");

const Dentista = require("../models/Dentista");

module.exports = {

    async listar(req, res) {
        try {
            const dentistas = await Dentista.findAll();
            res.json(dentistas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async obtener(req, res) {
        try {
            const dentista = await Dentista.findByPk(req.params.id);
            if (!dentista)
                return res.status(404).json({ error: "Dentista no encontrado" });

            res.json(dentista);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async crear(req, res) {
        try {
            const dentista = await createDentist(req.body);
            res.status(201).json(dentista);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async actualizar(req, res) {
        try {
            const dentista = await updateDentist(req.params.id, req.body);
            res.json(dentista);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async eliminar(req, res) {
        try {
            await deleteDentist(req.params.id);
            res.json({ mensaje: "Dentista eliminado" });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
