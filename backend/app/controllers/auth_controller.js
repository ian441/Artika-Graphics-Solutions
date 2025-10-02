const User = require('../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = '1h';

class AuthController {
  // Register a new user
  static async register(req, res) {
    try {
      const userData = req.body;
      const user = await User.create(userData);

      res.status(201).json({
        success: true,
        message: 'User registered successfully',
        data: user
      });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to register user',
        error: error.message
      });
    }
  }

  // Login user
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmail(email);

      if (!user || !(await user.verifyPassword(password))) {
        return res.status(401).json({
          success: false,
          message: 'Invalid email or password'
        });
      }

      // Generate JWT token
      const token = jwt.sign(
        { id: user.id, email: user.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.json({
        success: true,
        message: 'Login successful',
        token
      });
    } catch (error) {
      console.error('Error logging in user:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to log in user',
        error: error.message
      });
    }
  }

  // Get user profile
  static async getProfile(req, res) {
    try {
      const userId = req.user.id; // Set by auth middleware
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: user
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user profile',
        error: error.message
      });
    }
  }

  // Update user profile
  static async updateProfile(req, res) {
    try {
      const userId = req.user.id;
      const profileData = req.body;
      const user = await User.updateProfile(userId, profileData);

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: user
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  }
}

module.exports = AuthController;
