const ContactSubmission = require('../models/contact_submission');

class ContactController {
  // Create a new contact submission
  static async createContact(req, res) {
    try {
      const contactData = req.body;
      const submission = await ContactSubmission.create(contactData);
      res.status(201).json({
        success: true,
        message: 'Contact submission created successfully',
        data: submission
      });
    } catch (error) {
      console.error('Error creating contact submission:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create contact submission',
        error: error.message
      });
    }
  }

  // Get all contact submissions (admin only)
  static async getSubmissions(req, res) {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const submissions = await ContactSubmission.findAll({ limit: parseInt(limit), offset: parseInt(offset) });
      res.json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error('Error fetching submissions:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch submissions',
        error: error.message
      });
    }
  }

  // Get contact submission by ID (admin only)
  static async getSubmissionById(req, res) {
    try {
      const { id } = req.params;
      const submission = await ContactSubmission.findById(id);

      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Submission not found'
        });
      }

      res.json({
        success: true,
        data: submission
      });
    } catch (error) {
      console.error('Error fetching submission:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch submission',
        error: error.message
      });
    }
  }

  // Get submissions by email (admin only)
  static async getSubmissionsByEmail(req, res) {
    try {
      const { email } = req.params;
      const submissions = await ContactSubmission.findByEmail(email);
      res.json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error('Error fetching submissions by email:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch submissions by email',
        error: error.message
      });
    }
  }

  // Update contact submission (admin only)
  static async updateSubmission(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const submission = await ContactSubmission.findById(id);

      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Submission not found'
        });
      }

      const updatedSubmission = await submission.update(updateData);
      res.json({
        success: true,
        message: 'Submission updated successfully',
        data: updatedSubmission
      });
    } catch (error) {
      console.error('Error updating submission:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update submission',
        error: error.message
      });
    }
  }

  // Delete contact submission (admin only)
  static async deleteSubmission(req, res) {
    try {
      const { id } = req.params;
      const submission = await ContactSubmission.findById(id);

      if (!submission) {
        return res.status(404).json({
          success: false,
          message: 'Submission not found'
        });
      }

      await submission.delete();
      res.json({
        success: true,
        message: 'Submission deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting submission:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete submission',
        error: error.message
      });
    }
  }

  // Get recent submissions (admin only)
  static async getRecentSubmissions(req, res) {
    try {
      const { days = 30 } = req.query;
      const submissions = await ContactSubmission.getRecent(parseInt(days));
      res.json({
        success: true,
        data: submissions
      });
    } catch (error) {
      console.error('Error fetching recent submissions:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch recent submissions',
        error: error.message
      });
    }
  }

  // Get submission statistics (admin only)
  static async getStatistics(req, res) {
    try {
      const stats = await ContactSubmission.getStatistics();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching statistics:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch statistics',
        error: error.message
      });
    }
  }
}

module.exports = ContactController;
