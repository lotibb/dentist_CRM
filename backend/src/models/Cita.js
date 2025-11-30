const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/postgresql.connection");

const Cita = sequelize.define("Cita", {
    id_cita: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_dentista: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    id_paciente: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fecha_cita: { 
        type: DataTypes.DATE, 
        allowNull: false 
    },
    motivo: DataTypes.STRING,
    estado: {
        type: DataTypes.STRING,
        defaultValue: "Pendiente"
    }
}, {
    tableName: "citas",
    timestamps: false
});

module.exports = Cita;
