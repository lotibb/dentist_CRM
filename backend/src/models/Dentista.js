const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/postgresql.connection");

const Dentista = sequelize.define("Dentista", {
    id_dentista: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: { type: DataTypes.STRING, allowNull: false },
    telefono: DataTypes.STRING,
    correo: { type: DataTypes.STRING, unique: true, allowNull: false },
    especialidad: DataTypes.STRING
}, {
    tableName: "dentistas",
    timestamps: false
});

module.exports = Dentista;
