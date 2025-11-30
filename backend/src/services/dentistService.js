const Dentist = require("../models/Dentista");
const Appointment = require("../models/Cita");
const { sequelize } = require("../database/postgresql.connection");
const { Transaction, Op } = require("sequelize");

const TX_OPTIONS = {
    isolationLevel: Transaction.ISOLATION_LEVELS.READ_COMMITTED
};

async function createDentist(data) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        // Validate duplicate email to avoid race conditions
        const exists = await Dentist.findOne({
            where: { correo: data.correo },
            transaction: t,
            lock: t.LOCK.UPDATE
        });

        if (exists) throw new Error("El correo ya está registrado.");

        const dentist = await Dentist.create(data, { transaction: t });

        await t.commit();
        return dentist;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function updateDentist(id, data) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const dentist = await Dentist.findByPk(id, {
            transaction: t,
            lock: t.LOCK.UPDATE   // prevents concurrent editing
        });

        if (!dentist) throw new Error("Dentista no encontrado.");

        await dentist.update(data, { transaction: t });

        await t.commit();
        return dentist;

    } catch (err) {
        await t.rollback();
        throw err;
    }
}

async function deleteDentist(id) {
    const t = await sequelize.transaction(TX_OPTIONS);

    try {
        const activeAppointments = await Appointment.count({
            where: {
                id_dentista: id,
                fecha_cita: { [Op.gt]: new Date() }
            },
            transaction: t
        });
        if (activeAppointments > 0)
            throw new Error("No se puede eliminar: el dentista tiene citas activas.");

        await Dentist.destroy({
            where: { id_dentista: id },
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
    createDentist,
    updateDentist,
    deleteDentist
};

