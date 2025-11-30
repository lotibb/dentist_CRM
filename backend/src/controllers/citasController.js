
const {
    createAppointment,
    cancelAppointment,
    rescheduleAppointment
} = require("../services/appointmentService");

const Cita = require("../models/Cita");
const Paciente = require("../models/Paciente");
const Dentista = require("../models/Dentista");

module.exports = {

    async listar(req, res) {
        try {
            const citas = await Cita.findAll({
                include: [
                    { association: 'paciente' },
                    { association: 'dentista' }
                ]
            });

            res.json(citas);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    async obtener(req, res) {
        try {
            const cita = await Cita.findByPk(req.params.id, {
                include: [
                    { association: 'paciente' },
                    { association: 'dentista' }
                ]
            });

            if (!cita)
                return res.status(404).json({ error: "Cita no encontrada" });

            res.json(cita);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

 
    async crear(req, res) {
        try {
            const data = { ...req.body };
            if (data.fecha_hora && !data.fecha_cita) {
                data.fecha_cita = data.fecha_hora;
                delete data.fecha_hora;
            }
            
            const cita = await createAppointment(data);
            res.status(201).json(cita);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },

    async reprogramar(req, res) {
        try {
            const cita = await rescheduleAppointment(req.params.id, req.body.fecha_cita);
            res.json(cita);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    },


    async cancelar(req, res) {
        try {
            const cita = await cancelAppointment(req.params.id);
            res.json(cita);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
};
