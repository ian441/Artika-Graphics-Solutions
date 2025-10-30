const BlogPost = require('../models/blog_post');

class BlogController {
  // Get all blog posts for admin
  static async getPosts(req, res) {
    try {
      const { status, author_id } = req.query;
      const filters = {};

      if (status) filters.status = status;
      if (author_id) filters.author_id = parseInt(author_id);

      const posts = await BlogPost.getAll(filters);
      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog posts',
        error: error.message
      });
    }
  }

  // Get published blog posts for public
  static async getPublishedPosts(req, res) {
    try {
      const { limit = 10, offset = 0 } = req.query;
      const posts = await BlogPost.getPublished(parseInt(limit), parseInt(offset));
      res.json({
        success: true,
        data: posts
      });
    } catch (error) {
      console.error('Error fetching published posts:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch published posts',
        error: error.message
      });
    }
  }

  // Get single blog post
  static async getPost(req, res) {
    try {
      const { id } = req.params;

      // Check if id is numeric, if not, treat as slug
      const isNumeric = /^\d+$/.test(id);

      let post;
      if (isNumeric) {
        post = await BlogPost.findById(parseInt(id));
      } else {
        post = await BlogPost.findBySlug(id);
      }

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Error fetching blog post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog post',
        error: error.message
      });
    }
  }

  // Get blog post by slug
  static async getPostBySlug(req, res) {
    try {
      const { slug } = req.params;
      const post = await BlogPost.findBySlug(slug);

      if (!post) {
        return res.status(404).json({
          success: false,
          message: 'Blog post not found'
        });
      }

      res.json({
        success: true,
        data: post
      });
    } catch (error) {
      console.error('Error fetching blog post by slug:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog post',
        error: error.message
      });
    }
  }

  // Create new blog post
  static async createPost(req, res) {
    try {
      const postData = req.body;
      postData.author_id = req.user.id; // From auth middleware

      const post = await BlogPost.create(postData);
      res.status(201).json({
        success: true,
        data: post,
        message: 'Blog post created successfully'
      });
    } catch (error) {
      console.error('Error creating blog post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create blog post',
        error: error.message
      });
    }
  }

  // Update blog post
  static async updatePost(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const post = await BlogPost.update(id, updateData);
      res.json({
        success: true,
        data: post,
        message: 'Blog post updated successfully'
      });
    } catch (error) {
      console.error('Error updating blog post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update blog post',
        error: error.message
      });
    }
  }

  // Delete blog post
  static async deletePost(req, res) {
    try {
      const { id } = req.params;

      await BlogPost.delete(id);
      res.json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      console.error('Error deleting blog post:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete blog post',
        error: error.message
      });
    }
  }

  // Get blog statistics
  static async getStats(req, res) {
    try {
      const stats = await BlogPost.getStats();
      res.json({
        success: true,
        data: stats
      });
    } catch (error) {
      console.error('Error fetching blog stats:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to fetch blog statistics',
        error: error.message
      });
    }
  }
}

module.exports = BlogController;
