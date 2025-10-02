const Project = require('../models/project');

class ProjectController {
   // Create a new project
  static async create(req, res) {
    try {
      const userId = req.user.id;
      const projectData = { ...req.body, user_id: userId };
      const project = await Project.create(projectData);

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

  // Get all projects for user
  static async getAll(req, res) {
    try {
      const userId = req.user.id;
      const projects = await Project.findByUserId(userId);

      res.json({
        success: true,
        data: projects
      });
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
  static async getById(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      // Check ownership
      if (project.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      res.json({
        success: true,
        data: project
      });
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch project',
        error: error.message
      });
    }
  }

  // Update project
  static async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      if (project.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      const updatedProject = await Project.update(id, updateData);

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

  // Delete project
  static async delete(req, res) {
    try {
      const { id } = req.params;
      const project = await Project.findById(id);

      if (!project) {
        return res.status(404).json({
          success: false,
          message: 'Project not found'
        });
      }

      if (project.user_id !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Access denied'
        });
      }

      await Project.delete(id);

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
}

module.exports = ProjectController;
