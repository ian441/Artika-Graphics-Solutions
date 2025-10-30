import { API_BASE_URL } from '../config';

const apiFetch = async (url, options = {}) => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers,
      ...options,
    });

    if (response.status === 401) {
      throw new Error('UNAUTHORIZED');
    }

    if (response.status === 403) {
      throw new Error('FORBIDDEN');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
};

// Contact API
export const createContact = async (contactData) => {
  return apiFetch('/contact', {
    method: 'POST',
    body: JSON.stringify(contactData),
  });
};

// Portfolio API
export const fetchPortfolioProjects = async (params = {}) => {
  const queryParams = new URLSearchParams();
  
  if (params.page) queryParams.append('page', params.page);
  if (params.limit) queryParams.append('limit', params.limit);
  if (params.category && params.category !== 'all') queryParams.append('category', params.category);
  if (params.featured) queryParams.append('featured', params.featured);

  const queryString = queryParams.toString();
  const url = queryString ? `/portfolio?${queryString}` : '/portfolio';
  
  return apiFetch(url);
};

export const fetchPortfolioProjectById = async (id) => {
  return apiFetch(`/portfolio/${id}`);
};

export const fetchPortfolioCategories = async () => {
  return apiFetch('/portfolio/categories');
};

export const fetchFeaturedProjects = async (limit = 6) => {
  return apiFetch(`/portfolio?featured=true&limit=${limit}`);
};

export const fetchProjectsByCategory = async (category, limit = 12) => {
  return apiFetch(`/portfolio?category=${category}&limit=${limit}`);
};

// Get projects by authenticated user
export const fetchProjectsByClient = async () => {
  return apiFetch('/portfolio/my-projects');
};

// Authentication API
export const loginUser = async (credentials) => {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
};

export const registerUser = async (userData) => {
  return apiFetch('/auth/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getProfile = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/auth/profile', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Projects API (user projects)
export const createProject = async (projectData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/projects', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

export const getUserProjects = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/projects', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getProjectById = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/projects/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateProject = async (id, projectData) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/projects/${id}`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

export const deleteProject = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/projects/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Messages API
export const createMessage = async (messageData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/messages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  });
};

export const getUserMessages = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/messages', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getUnreadMessageCount = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/messages/unread-count', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const markMessageAsRead = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/messages/${id}/read`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const deleteMessage = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/messages/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Favorites API
export const addFavorite = async (projectId) => {
  const token = localStorage.getItem('token');
  return apiFetch('/favorites', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ projectId }),
  });
};

export const getUserFavorites = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/favorites', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const checkFavorite = async (projectId) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/favorites/check/${projectId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const removeFavorite = async (projectId) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/favorites/${projectId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Orders API
export const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/orders', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });
};

export const getUserOrders = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/orders', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getOrderById = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/orders/${id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateOrderStatus = async (id, status) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/orders/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ status }),
  });
};

// Admin API
export const getAdminDashboard = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/dashboard', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminPortfolioProjects = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/portfolio', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const createAdminPortfolioProject = async (projectData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/portfolio', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

export const updateAdminPortfolioProject = async (id, projectData) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(projectData),
  });
};

export const deleteAdminPortfolioProject = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminContacts = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/contacts', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateAdminContact = async (id, contactData) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/contacts/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(contactData),
  });
};

export const replyToAdminContact = async (id, reply) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/contacts/${id}/reply`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ reply }),
  });
};

export const markAdminContactAsRead = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/contacts/${id}/read`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin User Management API
export const getAdminUsers = async (filters = {}) => {
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams();

  if (filters.role) queryParams.append('role', filters.role);
  if (filters.is_active !== undefined) queryParams.append('is_active', filters.is_active);

  const queryString = queryParams.toString();
  const url = queryString ? `/admin/users?${queryString}` : '/admin/users';

  return apiFetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateAdminUserRole = async (id, role) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/users/${id}/role`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ role }),
  });
};

export const banAdminUser = async (id, reason) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/users/${id}/ban`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ reason }),
  });
};

export const unbanAdminUser = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/users/${id}/unban`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminUserStats = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/users/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin Project Management API
export const getAdminProjects = async (filters = {}) => {
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append('status', filters.status);
  if (filters.assigned_to) queryParams.append('assigned_to', filters.assigned_to);

  const queryString = queryParams.toString();
  const url = queryString ? `/admin/projects?${queryString}` : '/admin/projects';

  return apiFetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateAdminProjectStatus = async (id, statusData) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/projects/${id}/status`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(statusData),
  });
};

export const getAdminProjectStats = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/projects/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin Orders/Revenue API
export const getAdminOrders = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/orders', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminOrderStats = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/orders/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin Messages/Support API
export const getAdminMessages = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/messages', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminMessageStats = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/messages/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin System Settings API
export const getAdminSettings = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/settings', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const updateAdminSetting = async (key, value) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/settings/${key}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ value }),
  });
};

export const updateAdminSettings = async (settings) => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/settings', {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(settings),
  });
};

// Admin Blog Management API
export const getAdminBlogPosts = async (filters = {}) => {
  const token = localStorage.getItem('token');
  const queryParams = new URLSearchParams();

  if (filters.status) queryParams.append('status', filters.status);
  if (filters.author_id) queryParams.append('author_id', filters.author_id);

  const queryString = queryParams.toString();
  const url = queryString ? `/admin/blog?${queryString}` : '/admin/blog';

  return apiFetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const createAdminBlogPost = async (postData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/blog', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
};

export const updateAdminBlogPost = async (id, postData) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/blog/${id}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(postData),
  });
};

export const deleteAdminBlogPost = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/blog/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const getAdminBlogStats = async () => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/blog/stats', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

export const deleteAdminContact = async (id) => {
  const token = localStorage.getItem('token');
  return apiFetch(`/admin/contacts/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
};

// Admin Messages API
export const sendAdminMessage = async (messageData) => {
  const token = localStorage.getItem('token');
  return apiFetch('/admin/messages/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(messageData),
  });
};

// Utility function for error handling
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'An unexpected error occurred',
  };
};
