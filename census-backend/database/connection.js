const oracledb = require('oracledb');
require('dotenv').config({ path: './config.env' });

// Database connection configuration
const dbConfig = {
  user: process.env.DB_USER || 'census_user',
  password: process.env.DB_PASSWORD || 'census_password',
  connectString: `${process.env.DB_HOST || 'localhost'}:${process.env.DB_PORT || '1521'}/${process.env.DB_SERVICE || 'XE'}`,
  poolMin: 2,
  poolMax: 10,
  poolIncrement: 1
};

// Initialize Oracle client
async function initializeOracle() {
  try {
    await oracledb.createPool(dbConfig);
    console.log('✅ Oracle connection pool created successfully');
  } catch (error) {
    console.error('❌ Error creating Oracle connection pool:', error);
    throw error;
  }
}

// Get connection from pool
async function getConnection() {
  try {
    const connection = await oracledb.getConnection();
    return connection;
  } catch (error) {
    console.error('❌ Error getting database connection:', error);
    throw error;
  }
}

// Close connection
async function closeConnection(connection) {
  try {
    if (connection) {
      await connection.close();
    }
  } catch (error) {
    console.error('❌ Error closing database connection:', error);
  }
}

// Close pool
async function closePool() {
  try {
    await oracledb.getPool().close();
    console.log('✅ Oracle connection pool closed');
  } catch (error) {
    console.error('❌ Error closing Oracle connection pool:', error);
  }
}

module.exports = {
  initializeOracle,
  getConnection,
  closeConnection,
  closePool,
  oracledb
}; 