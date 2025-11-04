const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  try {
    console.log('Running migration 012_add_portfolio_fields.sql...');

    const migrationPath = path.join(__dirname, 'migrations', '012_add_portfolio_fields.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    await pool.query(migrationSQL);
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await pool.end();
  }
}

runMigration();
