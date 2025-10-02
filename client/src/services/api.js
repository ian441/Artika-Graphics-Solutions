import { API_BASE_URL } from '../config';

const apiFetch = async (url, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${url}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

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
  const token = localStorage.getItem('token');
  return apiFetch('/portfolio/my-projects', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
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

// Utility function for error handling
export const handleApiError = (error) => {
  console.error('API Error:', error);
  return {
    success: false,
    message: error.message || 'An unexpected error occurred',
  };
};
