const { Pool } = require('pg');
require('dotenv').config();

// Create a new PostgreSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || 'ayro5',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'portfolio_db',
  password: process.env.DB_PASSWORD || '4the9t',
  port: process.env.DB_PORT || 5432,
});

// Test the database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Database connection error:', err);
  process.exit(-1);
});

// Create tables if they don't exist
const createTables = async () => {
  try {
    // Create portfolio_projects table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_projects (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        client VARCHAR(255),
        category VARCHAR(100),
        image VARCHAR(500),
        description TEXT,
        duration VARCHAR(100),
        featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Drop old columns if they exist
    await pool.query(`ALTER TABLE portfolio_projects DROP COLUMN IF EXISTS challenge`);
    await pool.query(`ALTER TABLE portfolio_projects DROP COLUMN IF EXISTS solution`);
    await pool.query(`ALTER TABLE portfolio_projects DROP COLUMN IF EXISTS results`);
    await pool.query(`ALTER TABLE portfolio_projects DROP COLUMN IF EXISTS process`);

    // Create contact_submissions table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS contact_submissions (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        company VARCHAR(255),
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create portfolio_categories table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS portfolio_categories (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create projects table for user projects
    await pool.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        image TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create messages table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        recipient_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        subject VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        is_read BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create favorites table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS favorites (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        project_id INTEGER REFERENCES portfolio_projects(id) ON DELETE CASCADE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_id, project_id)
      )
    `);

    // Create orders table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        project_id INTEGER REFERENCES portfolio_projects(id) ON DELETE CASCADE,
        status VARCHAR(50) DEFAULT 'pending',
        details TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
  }
};

// Insert sample data
const insertSampleData = async () => {
  try {
    // Insert sample categories
    await pool.query(`
      INSERT INTO portfolio_categories (name, description) VALUES
      ('web', 'Web Development Projects'),
      ('mobile', 'Mobile App Development'),
      ('design', 'UI/UX Design Projects'),
      ('ecommerce', 'E-commerce Solutions')
      ON CONFLICT (name) DO NOTHING
    `);

    // Insert sample projects
    await pool.query(`
      INSERT INTO portfolio_projects (title, client, category, image, description, duration, featured) VALUES
      ('E-commerce Website', 'TechCorp Solutions', 'web', '/images/project1.jpg', 'A modern e-commerce platform with React and Node.js', '6 months', true),
      ('Mobile Banking App', 'SecureBank Ltd', 'mobile', '/images/project2.jpg', 'Secure mobile banking application for iOS and Android', '8 months', true),
      ('Portfolio Website', 'CreativeStudio Pro', 'design', '/images/project3.jpg', 'Responsive portfolio website design', '3 months', false),
      ('Online Store', 'FashionHub Inc', 'ecommerce', '/images/project4.jpg', 'Complete e-commerce solution with payment integration', '5 months', true)
      ON CONFLICT DO NOTHING
    `);

    console.log('Sample data inserted successfully');
  } catch (error) {
    console.error('Error inserting sample data:', error);
  }
};

module.exports = {
  pool,
  createTables,
  insertSampleData
};
