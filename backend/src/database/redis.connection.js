const { createClient } = require('redis');
require('dotenv').config();

// Crear cliente de Redis
const client = createClient({
  url: process.env.REDIS_URI
});

// Manejar errores del cliente
client.on('error', (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ Redis Client Error:');
    console.error('   Message:', err.message);
    console.error('   Code:', err.code || 'N/A');
    console.error('');
  }
});

// Función para conectar
const connect = async () => {
  try {
    if (!client.isOpen) {
      await client.connect();
    }
    await client.ping();
    console.log('✅ Redis Database connected');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ Redis Connection Error:');
      console.error('   Message:', error.message);
      console.error('   Code:', error.code || 'N/A');
      
      // Mensajes específicos para errores comunes
      if (error.message.includes('WRONGPASS') || error.message.includes('invalid password')) {
        console.error('   Issue: Invalid password or credentials');
      } else if (error.message.includes('NOAUTH')) {
        console.error('   Issue: Authentication required');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('   Issue: Cannot connect (check host and port)');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('   Issue: Host not found (check hostname)');
      }
      
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

// Función para cerrar conexión
const close = async () => {
  try {
    if (client.isOpen) {
      await client.quit();
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ Error closing Redis:');
      console.error('   Message:', error.message);
      console.error('');
    }
    throw error;
  }
};

module.exports = {
  client,
  connect,
  close
};
