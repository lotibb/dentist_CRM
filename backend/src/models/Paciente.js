const { DataTypes } = require("sequelize");
const { sequelize } = require("../database/postgresql.connection");

const Paciente = sequelize.define("Paciente", {
    id_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_paciente' // Peut-être que la colonne s'appelle différemment dans la BDD
    },
    nombre: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: true
    },
    correo: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: "pacientes",
    timestamps: false
});

module.exports = Paciente;
