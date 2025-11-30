const Patient = require("../models/Paciente");
const Appointment = require("../models/Cita");
const { sequelize } = require("../database/postgresql.connection");
const { Transaction, Op } = require("sequelize");

const TX_OPTIONS = {
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
};

async function createPatient(data) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const exists = await Patient.findOne({
            where: { correo: data.correo },
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (exists) throw new Error("El correo ya está registrado.");

        const patient = await Patient.create(data, { transaction: t });

        await t.commit();
        return patient;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function updatePatient(id, data) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const patient = await Patient.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!patient) throw new Error("Paciente no encontrado.");

        await patient.update(data, { transaction: t });

        await t.commit();
        return patient;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function deletePatient(id) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const activeAppointments = await Appointment.count({
            where: {
                id_paciente: id,
                fecha_cita: { [Op.gt]: new Date() }
            },
            transaction: t
        });
        if (activeAppointments > 0)
            throw new Error("No se puede eliminar: el paciente tiene citas activas.");

        await Patient.destroy({
            where: { id_paciente: id },
            transaction: t
        });

        await t.commit();
        return true;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

module.exports = {
    createPatient,
    updatePatient,
    deletePatient
};

