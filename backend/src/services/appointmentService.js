const Appointment = require("../models/Cita");
const { sequelize } = require("../database/postgresql.connection");
const { Transaction } = require("sequelize");

const TX_OPTIONS = {
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
};

async function createAppointment(data) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        // Check if dentist is available
        const busy = await Appointment.findOne({
            where: {
                id_dentista: data.id_dentista,
                fecha_cita: data.fecha_cita
            },
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (busy) throw new Error("El dentista ya tiene una cita en ese horario.");

        // Check if patient doesn't have a double booking
        const double = await Appointment.findOne({
            where: {
                id_paciente: data.id_paciente,
                fecha_cita: data.fecha_cita
            },
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (double) throw new Error("El paciente ya tiene una cita en ese horario.");

        const appointment = await Appointment.create(data, { transaction: t });

        await t.commit();
        return appointment;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function rescheduleAppointment(id, newDate) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const appointment = await Appointment.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!appointment) throw new Error("Cita no encontrada.");

        // Check dentist availability
        const busy = await Appointment.findOne({
            where: {
                id_dentista: appointment.id_dentista,
                fecha_cita: newDate
            },
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (busy) throw new Error("El dentista está ocupado en ese horario.");

        await appointment.update({ fecha_cita: newDate }, { transaction: t });

        await t.commit();
        return appointment;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function cancelAppointment(id) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const appointment = await Appointment.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (!appointment) throw new Error("Cita no encontrada.");

        await appointment.update({ estado: "Cancelada" }, { transaction: t });

        await t.commit();
        return appointment;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

module.exports = {
    createAppointment,
    rescheduleAppointment,
    cancelAppointment
};

