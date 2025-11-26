const mongoose = require('mongoose');
require('dotenv').config();

// Función para conectar
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Database connected');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ MongoDB Connection Error:');
      console.error('   Message:', error.message);
      console.error('   Code:', error.code || 'N/A');
      
      // Mensajes específicos para errores comunes
      if (error.message.includes('authentication failed')) {
        console.error('   Issue: Invalid username or password');
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.error('   Issue: Host not found (check hostname in URI)');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('   Issue: Cannot connect (check network/firewall)');
      } else if (error.message.includes('timeout')) {
        console.error('   Issue: Connection timeout');
      }
      
      console.error('   Details:', {
        name: error.name || 'N/A',
        codeName: error.codeName || 'N/A'
      });
      console.error('');
    }
    throw error;
  }
};

// Manejar errores de conexión después de conectado
mongoose.connection.on('error', (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ MongoDB Connection Error:');
    console.error('   Message:', err.message);
    console.error('   Code:', err.code || 'N/A');
    console.error('');
  }
});

mongoose.connection.on('disconnected', () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('⚠️  MongoDB disconnected');
  }
});

// Función para cerrar conexión
const close = async () => {
  try {
    await mongoose.connection.close();
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ Error closing MongoDB:');
      console.error('   Message:', error.message);
      console.error('');
    }
    throw error;
  }
};

module.exports = {
  mongoose,
  connect,
  close
};

