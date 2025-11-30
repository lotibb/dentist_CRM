const { Sequelize } = require("sequelize");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Crear instancia de Sequelize
const sequelize = new Sequelize(process.env.POSTGRESQL_URI, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
        max: 20,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

// Manejar errores de conexión (Sequelize maneja los errores del pool internamente)
// Los errores se capturan en las funciones connect() y close()

// Función para conectar y verificar la conexión
const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ PostgreSQL Database connected');
        return true;
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('\n❌ PostgreSQL Connection Error:');
            console.error('   Message:', error.message);
            console.error('   Code:', error.code || 'N/A');
            console.error('   Details:', {
                errno: error.errno || 'N/A',
                syscall: error.syscall || 'N/A',
                address: error.address || 'N/A',
                port: error.port || 'N/A'
            });
            console.error('');
        }
        throw error;
    }
};

// Función para cerrar la conexión
const close = async () => {
    try {
        await sequelize.close();
        console.log('✅ PostgreSQL connection closed');
    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error('\n❌ Error closing PostgreSQL:');
            console.error('   Message:', error.message);
            console.error('');
        }
        throw error;
    }
};

module.exports = {
    sequelize,
    connect,
    close
};
