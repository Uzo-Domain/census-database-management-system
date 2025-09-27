#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Census Management System - Backend Setup');
console.log('==========================================\n');

// Check if Node.js version is compatible
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

if (majorVersion < 16) {
  console.error('❌ Error: Node.js version 16 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if package.json exists
const packageJsonPath = path.join(__dirname, 'package.json');
if (!fs.existsSync(packageJsonPath)) {
  console.error('❌ Error: package.json not found');
  console.error('   Please run this script from the census-backend directory');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Error installing dependencies:', error.message);
  process.exit(1);
}

// Check if config.env exists
const configPath = path.join(__dirname, 'config.env');
if (!fs.existsSync(configPath)) {
  console.log('\n⚙️  Creating configuration file...');
  
  const configContent = `# Database Configuration
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XE
DB_USER=census_user
DB_PASSWORD=census_password

# API Configuration
PORT=3000
NODE_ENV=development

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
CORS_ORIGIN=http://localhost:5173
`;

  fs.writeFileSync(configPath, configContent);
  console.log('✅ Configuration file created: config.env');
  console.log('   Please update the database connection settings in config.env');
} else {
  console.log('✅ Configuration file already exists: config.env');
}

// Create database setup instructions
console.log('\n📋 Database Setup Instructions:');
console.log('================================');
console.log('1. Ensure Oracle Database is installed and running');
console.log('2. Create a user for the census application:');
console.log('   CREATE USER census_user IDENTIFIED BY census_password;');
console.log('   GRANT CONNECT, RESOURCE TO census_user;');
console.log('   GRANT CREATE PROCEDURE, CREATE FUNCTION, CREATE TRIGGER TO census_user;');
console.log('');
console.log('3. Run the database scripts in order:');
console.log('   a. Tables and constraints: 404 DATABASE PROJECT/schema_modules/Tables.sql');
console.log('   b. Stored procedures: census-backend/database/stored-procedures.sql');
console.log('   c. Cursors: census-backend/database/cursors.sql');
console.log('   d. Triggers: census-backend/database/triggers.sql');
console.log('');
console.log('4. Update config.env with your database connection details');
console.log('');

// Check if Oracle client is available
console.log('🔍 Checking Oracle client availability...');
try {
  const { oracledb } = require('oracledb');
  console.log('✅ Oracle client is available');
} catch (error) {
  console.log('⚠️  Warning: Oracle client may not be properly configured');
  console.log('   Please ensure Oracle Instant Client is installed and configured');
  console.log('   See: https://oracle.github.io/node-oracledb/doc/api.html#installation');
}

console.log('\n🎯 Next Steps:');
console.log('==============');
console.log('1. Configure your database connection in config.env');
console.log('2. Run the database setup scripts');
console.log('3. Start the backend server: npm start');
console.log('4. Start the frontend application: cd ../census-frontend && npm run dev');
console.log('5. Test the system by navigating to http://localhost:5173');
console.log('');

console.log('🎉 Setup completed successfully!');
console.log('   The backend API will be available at http://localhost:3000');
console.log('   The frontend will connect to the backend automatically'); 