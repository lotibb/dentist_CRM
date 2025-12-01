const { MongoClient } = require('mongodb');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

// Crear cliente de MongoDB
const client = new MongoClient(process.env.MONGODB_URI, {
  maxPoolSize: 10,
  minPoolSize: 2,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

// Variable para almacenar la conexión
let db = null;

// Manejar errores del cliente
client.on('error', (err) => {
  if (process.env.NODE_ENV === 'development') {
    console.error('\n❌ MongoDB Client Error:');
    console.error('   Message:', err.message);
    console.error('   Code:', err.code || 'N/A');
    console.error('');
  }
});

// Función para conectar
const connect = async () => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    
    // Obtener la base de datos desde la URI
    const dbName = new URL(process.env.MONGODB_URI).pathname.substring(1);
    db = client.db(dbName);
    
    // Verificar la conexión con un ping
    await db.admin().ping();
    console.log('✅ MongoDB Database connected');
    return true;
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ MongoDB Connection Error:');
      console.error('   Message:', error.message);
      console.error('   Code:', error.code || 'N/A');
      
      // Mensajes específicos para errores comunes
      if (error.message.includes('authentication failed') || error.message.includes('bad auth')) {
        console.error('   Issue: Invalid username or password');
      } else if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
        console.error('   Issue: Host not found (check hostname in URI)');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('   Issue: Cannot connect (check host and port)');
      } else if (error.message.includes('timeout')) {
        console.error('   Issue: Connection timeout (check network or firewall)');
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
    if (client.topology && client.topology.isConnected()) {
      await client.close();
      db = null;
      console.log('✅ MongoDB connection closed');
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('\n❌ Error closing MongoDB:');
      console.error('   Message:', error.message);
      console.error('');
    }
    throw error;
  }
};

// Función helper para obtener la base de datos
const getDb = () => {
  if (!db) {
    throw new Error('MongoDB not connected. Call connect() first.');
  }
  return db;
};

module.exports = {
  client,
  db,
  connect,
  close,
  getDb
};

