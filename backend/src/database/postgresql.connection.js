const { Pool } = require('pg');
require('dotenv').config();

// Crear pool de conexiones
const pool = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
  ssl: { rejectUnauthorized: false },
  max: 20,
  connectionTimeoutMillis: 10000,
  idleTimeoutMillis: 30000,
});

// Manejar errores del pool
pool.on('error', (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ PostgreSQL Pool Error:');
    console.error('   Message:', err.message);
    console.error('   Code:', err.code || 'N/A');
    console.error('');
  }
});

// Función para conectar
const connect = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT 1');
    client.release();
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

// Función para cerrar conexiones
const close = async () => {
  try {
    await pool.end();
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
  pool,
  connect,
  close
};
