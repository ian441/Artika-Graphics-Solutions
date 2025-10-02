// Test setup file for Jest
const { Pool } = require('pg');

// Mock environment variables for testing
process.env.NODE_ENV = 'test';
process.env.DB_USER = 'ayro5'; 
process.env.DB_HOST = 'localhost';
process.env.DB_NAME = 'portfolio_db'; 
process.env.DB_PASSWORD = '4the9t'; 
process.env.DB_PORT = '5432';
process.env.PORT = '5000';

// Global test database pool
global.testPool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Clean up after all tests
afterAll(async () => {
  if (global.testPool) {
    await global.testPool.end();
  }
});

// Add a small delay to allow database connections to close
jest.setTimeout(30000);
