const express = require('express');
const BlogController = require('../controllers/blog_controller');

const router = express.Router();

// Get published blog posts for public view
router.get('/published', BlogController.getPublishedPosts);

// Get single blog post by ID or slug
router.get('/:id', BlogController.getPost);

module.exports = router;
