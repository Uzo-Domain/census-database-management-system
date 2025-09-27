const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config({ path: './config.env' });

const { initializeOracle, closePool } = require('./database/connection');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3000;

// =====================================
// MIDDLEWARE SETUP
// =====================================

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// =====================================
// ROUTES SETUP
// =====================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Census Management System API is running',
    timestamp: new Date().toISOString()
  });
});

// API routes
app.use('/api', apiRoutes);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Census Management System API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      api: '/api',
      documentation: 'See README.md for API documentation'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// =====================================
// SERVER STARTUP
// =====================================

async function startServer() {
  try {
    // Initialize Oracle database connection
    console.log('🔄 Initializing Oracle database connection...');
    await initializeOracle();
    console.log('✅ Database connection established');

    // Start the server
    app.listen(PORT, () => {
      console.log('🚀 Census Management System API Server started');
      console.log(`📍 Server running on port ${PORT}`);
      console.log(`🌐 API Base URL: http://localhost:${PORT}/api`);
      console.log(`🔗 Frontend URL: ${process.env.CORS_ORIGIN || 'http://localhost:5173'}`);
      console.log('📊 Available endpoints:');
      console.log('   - GET  /health - Health check');
      console.log('   - GET  /api/region - Get all regions');
      console.log('   - POST /api/region - Create region');
      console.log('   - PUT  /api/region/:id - Update region');
      console.log('   - DELETE /api/region/:id - Delete region');
      console.log('   - Similar endpoints for district, enumerator, supervisor, household, person');
      console.log('   - POST /api/query/complex - Execute complex queries');
      console.log('');
      console.log('🎯 Database Features Implemented:');
      console.log('   ✅ Stored Procedures for Insert, Update, Delete operations');
      console.log('   ✅ Cursors for retrieving records');
      console.log('   ✅ JOIN statements for complex queries');
      console.log('   ✅ Triggers for logging user activities');
      console.log('');
      console.log('🎨 Frontend Integration:');
      console.log('   ✅ CRUD operations (Insert, Retrieve, Update, Delete)');
      console.log('   ✅ Dynamic form generation');
      console.log('   ✅ Real-time data validation');
      console.log('   ✅ User-friendly error handling');
    });

  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down server gracefully...');
  try {
    await closePool();
    console.log('✅ Database connections closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM, shutting down gracefully...');
  try {
    await closePool();
    console.log('✅ Database connections closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start the server
startServer(); 