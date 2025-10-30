const bcrypt = require('bcrypt');
const { pool } = require('./db');

async function createAdminUser() {
  try {
    const email = 'admin@example.com';
    const password = 'admin123'; // Change this to a secure password
    const role = 'admin';

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the admin user
    const query = `
      INSERT INTO users (email, password, role)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING id, email, role
    `;

    const result = await pool.query(query, [email, hashedPassword, role]);

    if (result.rows.length > 0) {
      console.log('Admin user created successfully:', result.rows[0]);
      console.log('Email:', email);
      console.log('Password:', password);
    } else {
      console.log('Admin user already exists or could not be created.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin user:', error);
    process.exit(1);
  }
}

createAdminUser();
