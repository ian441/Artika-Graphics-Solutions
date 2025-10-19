import React, { useState, useEffect } from 'react';
import {
  getAdminDashboard,
  getAdminPortfolioProjects,
  createAdminPortfolioProject,
  updateAdminPortfolioProject,
  deleteAdminPortfolioProject,
  getAdminContacts,
  updateAdminContact,
  deleteAdminContact,
  getAdminUsers,
  updateAdminUserRole,
  banAdminUser,
  unbanAdminUser,
  getAdminUserStats,
  getAdminProjects,
  updateAdminProjectStatus,
  getAdminProjectStats,
  getAdminOrders,
  getAdminOrderStats,
  getAdminMessages,
  getAdminMessageStats,
  getAdminSettings,
  updateAdminSettings,
  getAdminBlogPosts,
  createAdminBlogPost,
  updateAdminBlogPost,
  deleteAdminBlogPost,
  getAdminBlogStats
} from '../services/api';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState(null);
  const [portfolioProjects, setPortfolioProjects] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settings, setSettings] = useState({});
  const [blogPosts, setBlogPosts] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    if (activeTab !== 'overview') {
      loadTabData(activeTab);
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardResponse = await getAdminDashboard();
      setDashboardData(dashboardResponse.data);

      // Load stats for overview
      const [userStats, projectStats, orderStats, messageStats, blogStats] = await Promise.all([
        getAdminUserStats(),
        getAdminProjectStats(),
        getAdminOrderStats(),
        getAdminMessageStats(),
        getAdminBlogStats()
      ]);

      setStats({
        users: userStats.data,
        projects: projectStats.data,
        orders: orderStats.data,
        messages: messageStats.data,
        blog: blogStats.data
      });
    } catch (err) {
      setError('Failed to load dashboard data');
      console.error('Dashboard error:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadTabData = async (tab) => {
    try {
      switch (tab) {
        case 'portfolio':
          const portfolioResponse = await getAdminPortfolioProjects();
          setPortfolioProjects(portfolioResponse.data || []);
          break;
        case 'contacts':
          const contactsResponse = await getAdminContacts();
          setContacts(contactsResponse.data || []);
          break;
        case 'users':
          const usersResponse = await getAdminUsers(filters);
          setUsers(usersResponse.data || []);
          break;
        case 'projects':
          const projectsResponse = await getAdminProjects(filters);
          setProjects(projectsResponse.data || []);
          break;
        case 'orders':
          const ordersResponse = await getAdminOrders();
          setOrders(ordersResponse.data || []);
          break;
        case 'messages':
          const messagesResponse = await getAdminMessages();
          setMessages(messagesResponse.data || []);
          break;
        case 'settings':
          const settingsResponse = await getAdminSettings();
          setSettings(settingsResponse.data || {});
          break;
        case 'blog':
          const blogResponse = await getAdminBlogPosts(filters);
          setBlogPosts(blogResponse.data || []);
          break;
      }
    } catch (err) {
      console.error(`Error loading ${tab} data:`, err);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'contacts', label: 'Contacts', icon: '📧' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📋' },
    { id: 'orders', label: 'Orders', icon: '💰' },
    { id: 'messages', label: 'Messages', icon: '💬' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
    { id: 'blog', label: 'Blog', icon: '📝' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={loadDashboardData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Comprehensive management system for Artika Graphics Solutions</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {activeTab === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Dashboard Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-900">Total Users</h3>
                  <p className="text-2xl font-bold text-blue-600">{stats.users?.total_users || 0}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-900">Total Projects</h3>
                  <p className="text-2xl font-bold text-green-600">{stats.projects?.total_projects || 0}</p>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-yellow-900">Total Revenue</h3>
                  <p className="text-2xl font-bold text-yellow-600">${stats.orders?.total_revenue || 0}</p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-purple-900">Blog Posts</h3>
                  <p className="text-2xl font-bold text-purple-600">{stats.blog?.total_posts || 0}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Recent projects, orders, and messages will appear here</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">Quick Stats</h3>
                  <div className="space-y-2">
                    <p className="text-sm">Unread Messages: {stats.messages?.unread_count || 0}</p>
                    <p className="text-sm">Active Projects: {stats.projects?.in_progress_count || 0}</p>
                    <p className="text-sm">Pending Orders: {stats.orders?.pending_orders || 0}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'portfolio' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Portfolio Management</h2>
              <div className="space-y-4">
                {portfolioProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'contacts' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Contact Submissions</h2>
              <div className="space-y-4">
                {contacts.map((contact) => (
                  <div key={contact.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-gray-600">{contact.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{contact.message}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Mark as Read
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">User Management</h2>
              <div className="mb-4 flex space-x-4">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                />
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFilters({ ...filters, role: e.target.value })}
                >
                  <option value="">All Roles</option>
                  <option value="admin">Admin</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-sm text-gray-500">Role: {user.role}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Edit Role
                      </button>
                      <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700">
                        {user.banned ? 'Unban' : 'Ban'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Project Management</h2>
              <div className="mb-4 flex space-x-4">
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="space-y-4">
                {projects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{project.title}</h3>
                    <p className="text-gray-600">{project.description}</p>
                    <p className="text-sm text-gray-500">Status: {project.status}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Update Status
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Order Management</h2>
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">Order #{order.id}</h3>
                    <p className="text-gray-600">Customer: {order.customer_name}</p>
                    <p className="text-sm text-gray-500">Amount: ${order.amount}</p>
                    <p className="text-sm text-gray-500">Status: {order.status}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        View Details
                      </button>
                      <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                        Mark Complete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'messages' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Message Management</h2>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{message.subject}</h3>
                    <p className="text-gray-600">From: {message.sender}</p>
                    <p className="text-sm text-gray-500">{message.preview}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        View Full
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">System Settings</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Site Title</label>
                  <input
                    type="text"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={settings.site_title || ''}
                    onChange={(e) => setSettings({ ...settings, site_title: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Contact Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    value={settings.contact_email || ''}
                    onChange={(e) => setSettings({ ...settings, contact_email: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Settings
                </button>
              </form>
            </div>
          )}

          {activeTab === 'blog' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Blog Management</h2>
              <div className="mb-4">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Add New Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="border rounded-lg p-4">
                    <h3 className="font-medium">{post.title}</h3>
                    <p className="text-gray-600">{post.excerpt}</p>
                    <p className="text-sm text-gray-500">Published: {post.published_date}</p>
                    <div className="mt-2 flex space-x-2">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
                        Edit
                      </button>
                      <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
