const { pool } = require('../../db');

class BlogPost {
  constructor({ id, title, slug, content, excerpt, author_id, status, featured_image, tags, seo_title, seo_description, published_at, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.slug = slug;
    this.content = content;
    this.excerpt = excerpt;
    this.author_id = author_id;
    this.status = status || 'draft';
    this.featured_image = featured_image;
    this.tags = tags || [];
    this.seo_title = seo_title;
    this.seo_description = seo_description;
    this.published_at = published_at;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }

  // Create a new blog post
  static async create(postData) {
    const { title, slug, content, excerpt, author_id, status, featured_image, tags, seo_title, seo_description, published_at } = postData;
    const query = `
      INSERT INTO blog_posts (title, slug, content, excerpt, author_id, status, featured_image, tags, seo_title, seo_description, published_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [title, slug, content, excerpt, author_id, status, featured_image, tags, seo_title, seo_description, published_at]);
      return new BlogPost(result.rows[0]);
    } catch (error) {
      throw new Error(`Error creating blog post: ${error.message}`);
    }
  }

  // Get all blog posts with optional filters
  static async getAll(filters = {}) {
    let query = `
      SELECT bp.*, u.name as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
    `;
    const conditions = [];
    const params = [];

    if (filters.status) {
      conditions.push(`bp.status = $${params.length + 1}`);
      params.push(filters.status);
    }

    if (filters.author_id) {
      conditions.push(`bp.author_id = $${params.length + 1}`);
      params.push(filters.author_id);
    }

    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }

    query += ' ORDER BY bp.created_at DESC';

    try {
      const result = await pool.query(query, params);
      return result.rows.map(row => new BlogPost(row));
    } catch (error) {
      throw new Error(`Error fetching blog posts: ${error.message}`);
    }
  }

  // Get published blog posts for public view
  static async getPublished(limit = 10, offset = 0) {
    const query = `
      SELECT bp.*, u.name as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.status = 'published' AND bp.published_at <= CURRENT_TIMESTAMP
      ORDER BY bp.published_at DESC
      LIMIT $1 OFFSET $2
    `;

    try {
      const result = await pool.query(query, [limit, offset]);
      return result.rows.map(row => new BlogPost(row));
    } catch (error) {
      throw new Error(`Error fetching published blog posts: ${error.message}`);
    }
  }

  // Get blog post by ID
  static async findById(id) {
    const query = `
      SELECT bp.*, u.name as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.id = $1
    `;

    try {
      const result = await pool.query(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }
      return new BlogPost(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching blog post: ${error.message}`);
    }
  }

  // Get blog post by slug
  static async findBySlug(slug) {
    const query = `
      SELECT bp.*, u.name as author_name
      FROM blog_posts bp
      LEFT JOIN users u ON bp.author_id = u.id
      WHERE bp.slug = $1
    `;

    try {
      const result = await pool.query(query, [slug]);
      if (result.rows.length === 0) {
        return null;
      }
      return new BlogPost(result.rows[0]);
    } catch (error) {
      throw new Error(`Error fetching blog post by slug: ${error.message}`);
    }
  }

  // Update blog post
  static async update(id, updateData) {
    const { title, slug, content, excerpt, status, featured_image, tags, seo_title, seo_description, published_at } = updateData;
    const query = `
      UPDATE blog_posts
      SET title = $1, slug = $2, content = $3, excerpt = $4, status = $5, featured_image = $6, tags = $7, seo_title = $8, seo_description = $9, published_at = $10, updated_at = CURRENT_TIMESTAMP
      WHERE id = $11
      RETURNING *
    `;

    try {
      const result = await pool.query(query, [title, slug, content, excerpt, status, featured_image, tags, seo_title, seo_description, published_at, id]);
      if (result.rows.length === 0) {
        throw new Error('Blog post not found');
      }
      return new BlogPost(result.rows[0]);
    } catch (error) {
      throw new Error(`Error updating blog post: ${error.message}`);
    }
  }

  // Delete blog post
  static async delete(id) {
    const query = 'DELETE FROM blog_posts WHERE id = $1';
    try {
      await pool.query(query, [id]);
      return true;
    } catch (error) {
      throw new Error(`Error deleting blog post: ${error.message}`);
    }
  }

  // Get blog stats
  static async getStats() {
    const query = `
      SELECT
        COUNT(*) as total_posts,
        COUNT(CASE WHEN status = 'published' THEN 1 END) as published_count,
        COUNT(CASE WHEN status = 'draft' THEN 1 END) as draft_count,
        COUNT(CASE WHEN status = 'archived' THEN 1 END) as archived_count
      FROM blog_posts
    `;

    try {
      const result = await pool.query(query);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching blog stats: ${error.message}`);
    }
  }
}

module.exports = BlogPost;
