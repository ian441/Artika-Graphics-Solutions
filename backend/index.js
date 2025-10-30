
const express = require('express');
const cors = require('cors');
const path = require('path');
const { pool, createTables, insertSampleData } = require('./db');
const { authRoutes, portfolioRoutes, contactRoutes, adminRoutes,  userRoutes, projectRoutes, messageRoutes, favoriteRoutes, orderRoutes } = require('./app/routes/__init__');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? ['https://your-frontend-domain.onrender.com', 'https://artika-graphics-frontend.onrender.com']
    : 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Serve static files from the React app build directory
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

// Only create tables and insert data if not in test environment
if (process.env.NODE_ENV !== 'test') {
  createTables();
  insertSampleData();
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/orders', orderRoutes);

// Catch all handler: send back React's index.html file for client-side routing
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Only start the server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Export the app for testing
module.exports = app;
