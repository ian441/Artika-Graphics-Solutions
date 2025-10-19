const PortfolioProject = require('../models/portfolio_project');
const PortfolioCategory = require('../models/portfolio_category');
const { authenticateToken } = require('../middleware/auth');

class PortfolioController {
  // Get all projects
  static async getProjects(req, res) {
    try {
      const filters = req.query;
      const projects = await PortfolioProject.findAll(filters);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch projects',
        error: error.message
      });
    }
  }

  // Get project by ID
  static async getProjectById(req, res) {
    try {
      const { id } = req.params;
      const project = await PortfolioProject.findById(id);

      if (!project) {
        return res.status(404).json({
          message: 'Project not found'
        });
      }

      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch project',
        error: error.message
      });
    }
  }

  // Get all categories
  static async getCategories(req, res) {
    try {
      const categories = await PortfolioCategory.findAll();
      res.json(categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch categories',
        error: error.message
      });
    }
  }

  // Get featured projects
  static async getFeaturedProjects(req, res) {
    try {
      const limit = parseInt(req.query.limit) || 6;
      const projects = await PortfolioProject.getFeatured(limit);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch featured projects',
        error: error.message
      });
    }
  }

  // Get projects by category
  static async getProjectsByCategory(req, res) {
    try {
      const { category } = req.params;
      const limit = parseInt(req.query.limit) || 12;
      const projects = await PortfolioProject.getByCategory(category, limit);
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch projects by category',
        error: error.message
      });
    }
  }

  // Get projects by client (user) - protected route
  static async getProjectsByClient(req, res) {
    try {
      const userId = req.user.id; // From auth middleware
      // Note: Assuming portfolio_projects has a client_id field; adjust if needed
      const query = 'SELECT * FROM portfolio_projects WHERE client_id = $1';
      const result = await pool.query(query, [userId]);
      const projects = result.rows.map(row => new PortfolioProject(row));
      res.json({
        success: true,
        data: projects
      });
    } catch (error) {
      console.error('Error fetching user projects:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch user projects',
        error: error.message
      });
    }
  }

  // Create new project (admin only)
  static async createProject(req, res) {
    try {
      const projectData = req.body;
      const project = await PortfolioProject.create(projectData);
      res.status(201).json({
        success: true,
        message: 'Project created successfully',
        data: project
      });
    } catch (error) {
      console.error('Error creating project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create project',
        error: error.message
      });
    }
  }

  // Update project (admin only)
  static async updateProject(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const project = await PortfolioProject.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      const updatedProject = await project.update(updateData);
      res.json({
        success: true,
        message: 'Project updated successfully',
        data: updatedProject
      });
    } catch (error) {
      console.error('Error updating project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update project',
        error: error.message
      });
    }
  }

  // Delete project (admin only)
  static async deleteProject(req, res) {
    try {
      const { id } = req.params;
      const project = await PortfolioProject.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      await project.delete();
      res.json({
        success: true,
        message: 'Project deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete project',
        error: error.message
      });
    }
  }

  // Get project count (admin only)
  static async getProjectCount(req, res) {
    try {
      const count = await PortfolioProject.getCount();
      res.json({
        success: true,
        data: count
      });
    } catch (error) {
      console.error('Error getting project count:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get project count',
        error: error.message
      });
    }
  }
}

module.exports = PortfolioController;
