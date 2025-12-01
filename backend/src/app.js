const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

// Importar configuración
const { PORT, NODE_ENV } = require('./config/server.config');

// Importar conexiones a bases de datos
const { sequelize, connect, close } = require('./database/postgresql.connection');
const { client: redisClient, connect: connectRedis, close: closeRedis } = require('./database/redis.connection');
const { client: mongoClient, db: mongoDb, connect: connectMongo, close: closeMongo, getDb } = require('./database/mongodb.connection');

// Cargar las asociaciones entre modelos
require('./models/associations');

// Crear aplicación Express
const app = express();

// Middleware global
app.use(cors()); // Permitir peticiones desde el frontend
app.use(express.json()); // Parsear JSON en el body
app.use(express.urlencoded({ extended: true })); // Parsear URL-encoded

// Logging (solo en desarrollo)
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Ruta raíz
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Dentist CRM API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      dentistas: '/dentistas',
      pacientes: '/pacientes',
      citas: '/citas'
    }
  });
});

// Health Check
app.get('/health', async (req, res) => {
  const healthStatus = {
    server: {
      status: 'running',
      message: 'Server is operational',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage()
    },
    databases: {
      postgresql: { status: 'unknown' },
      redis: { status: 'unknown' },
      mongodb: { status: 'unknown' }
    }
  };

  // Verificar PostgreSQL
  try {
    await sequelize.authenticate();
    const [dbVersion] = await sequelize.query('SELECT version()');
    const [tableCount] = await sequelize.query(
      "SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = 'public'"
    );
    
    healthStatus.databases.postgresql = {
      status: 'connected',
      message: 'PostgreSQL is connected',
      type: 'PostgreSQL',
      tables: tableCount[0].count,
      version: dbVersion[0]?.version || 'unknown'
    };
  } catch (error) {
    healthStatus.databases.postgresql = {
      status: 'disconnected',
      message: 'PostgreSQL connection failed',
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN'
      }
    };
  }

  // Verificar Redis
  try {
    if (redisClient.isOpen) {
      await redisClient.ping();
      healthStatus.databases.redis = {
        status: 'connected',
        message: 'Redis is connected'
      };
    } else {
      healthStatus.databases.redis = {
        status: 'disconnected',
        message: 'Redis client is not open'
      };
    }
  } catch (error) {
    healthStatus.databases.redis = {
      status: 'disconnected',
      message: 'Redis connection failed',
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN'
      }
    };
  }

  // Verificar MongoDB
  try {
    if (mongoClient.topology && mongoClient.topology.isConnected()) {
      const db = getDb();
      await db.admin().ping();
      const collections = await db.listCollections().toArray();
      healthStatus.databases.mongodb = {
        status: 'connected',
        message: 'MongoDB is connected',
        type: 'MongoDB',
        collections: collections.length,
        database: db.databaseName
      };
    } else {
      healthStatus.databases.mongodb = {
        status: 'disconnected',
        message: 'MongoDB client is not connected'
      };
    }
  } catch (error) {
    healthStatus.databases.mongodb = {
      status: 'disconnected',
      message: 'MongoDB connection failed',
      error: {
        message: error.message,
        code: error.code || 'UNKNOWN'
      }
    };
  }

  // Determinar el estado general
  const allConnected = 
    healthStatus.databases.postgresql.status === 'connected' &&
    healthStatus.databases.redis.status === 'connected' &&
    healthStatus.databases.mongodb.status === 'connected';
  
  const statusCode = allConnected ? 200 : 503;
  res.status(statusCode).json(healthStatus);
});

// Rutas de la API
app.use('/dentistas', require('./routes/dentistas'));
app.use('/pacientes', require('./routes/pacientes'));
app.use('/citas', require('./routes/citas'));
app.use('/expedientes', require('./routes/expedientes'));

// Ruta 404 para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Iniciar servidor
const startServer = async () => {
  try {
    // Conectar a las bases de datos
    await connect();
    try {
      await connectRedis();
    } catch (redisError) {
      console.warn('⚠️  Redis connection failed (optional):', redisError.message);
    }
    try {
      await connectMongo();
    } catch (mongoError) {
      console.warn('⚠️  MongoDB connection failed (optional):', mongoError.message);
    }

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📝 Environment: ${NODE_ENV}`);
      console.log(`🌐 Health check: http://localhost:${PORT}/health`);
      console.log(`🌐 API: http://localhost:${PORT}/`);
    });
  } catch (error) {
    if (NODE_ENV === 'development') {
      console.error('\n❌ Server Startup Error:');
      console.error('   Message:', error.message);
      console.error('   Code:', error.code || 'N/A');
      console.error('');
    } else {
      console.error('❌ Error starting server:', error.message);
    }
    process.exit(1);
  }
};

// Manejar errores no capturados
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});

// Cerrar conexiones a las bases de datos al terminar la aplicación
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await close();
  await closeRedis();
  await closeMongo();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT signal received: closing HTTP server');
  await close();
  await closeRedis();
  await closeMongo();
  process.exit(0);
});

// Iniciar el servidor
startServer();

module.exports = app;
