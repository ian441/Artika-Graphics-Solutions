 import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAdminDashboard,
  getAdminPortfolioProjects,
  createAdminPortfolioProject,
  updateAdminPortfolioProject,
  deleteAdminPortfolioProject,
  getAdminContacts,
  updateAdminContact,
  deleteAdminContact,
  replyToAdminContact,
  markAdminContactAsRead,
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
  getAdminBlogStats,
  sendAdminMessage,
  getProfile
} from '../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
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
  const [messageForm, setMessageForm] = useState({
    recipientId: '',
    subject: '',
    content: ''
  });
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [portfolioLoading, setPortfolioLoading] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    client: '',
    category: '',
    image: '',
    description: '',
    challenge: '',
    solution: '',
    results: '',
    process: '',
    duration: '',
    featured: false
  });

  useEffect(() => {
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const profileResponse = await getProfile();
      const user = profileResponse.data;

      if (user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        navigate('/');
        return;
      }

      // If authenticated and admin, load dashboard data
      loadDashboardData();
    } catch (err) {
      console.error('Authentication error:', err);
      localStorage.removeItem('token');
      navigate('/signin');
    }
  };

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
      if (err.response?.status === 403 || err.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/signin');
        return;
      }
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
        case 'communications':
          // Load contacts, users, and messages for communications tab
          const [contactsResponse, commUsersResponse, commMessagesResponse] = await Promise.all([
            getAdminContacts(),
            getAdminUsers(),
            getAdminMessages()
          ]);
          setContacts(contactsResponse.data || []);
          setUsers(commUsersResponse.data || []);
          setMessages(commMessagesResponse.data || []);
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

  const handleSendMessage = async (e) => {
    e.preventDefault();
    try {
      await sendAdminMessage({
        recipient_id: messageForm.recipientId,
        subject: messageForm.subject,
        content: messageForm.content
      });
      // Reset form
      setMessageForm({
        recipientId: '',
        subject: '',
        content: ''
      });
      // Reload messages
      const messagesResponse = await getAdminMessages();
      setMessages(messagesResponse.data || []);
      alert('Message sent successfully!');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Failed to send message');
    }
  };

  const handleMarkAsRead = async (contactId) => {
    try {
      await markAdminContactAsRead(contactId);
      // Reload contacts
      const contactsResponse = await getAdminContacts();
      setContacts(contactsResponse.data || []);
      alert('Contact marked as read!');
    } catch (err) {
      console.error('Error marking contact as read:', err);
      alert('Failed to mark contact as read');
    }
  };

  const handleReplyToContact = async (contact) => {
    const reply = prompt('Enter your reply to the contact:');
    if (reply) {
      try {
        await replyToAdminContact(contact.id, { reply });
        // Reload contacts
        const contactsResponse = await getAdminContacts();
        setContacts(contactsResponse.data || []);
        alert('Reply sent successfully!');
      } catch (err) {
        console.error('Error replying to contact:', err);
        alert('Failed to send reply');
      }
    }
  };

  const handleDeleteContact = async (contactId) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await deleteAdminContact(contactId);
        // Reload contacts
        const contactsResponse = await getAdminContacts();
        setContacts(contactsResponse.data || []);
        alert('Contact deleted successfully!');
      } catch (err) {
        console.error('Error deleting contact:', err);
        alert('Failed to delete contact');
      }
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'communications', label: 'Communications', icon: '💬' },
    { id: 'users', label: 'Users', icon: '👥' },
    { id: 'projects', label: 'Projects', icon: '📋' },
    { id: 'orders', label: 'Orders', icon: '💰' },
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
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Portfolio Management</h2>
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add New Project
                </button>
              </div>

              {/* Create/Edit Form */}
              {showCreateForm && (
                <div className="mb-6 bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">
                    {editingProject ? 'Edit Project' : 'Create New Project'}
                  </h3>
                  <form onSubmit={handlePortfolioSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Title *</label>
                        <input
                          type="text"
                          value={portfolioForm.title}
                          onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Client *</label>
                        <input
                          type="text"
                          value={portfolioForm.client}
                          onChange={(e) => setPortfolioForm({...portfolioForm, client: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Category *</label>
                        <select
                          value={portfolioForm.category}
                          onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="web">Web Development</option>
                          <option value="mobile">Mobile App</option>
                          <option value="design">UI/UX Design</option>
                          <option value="ecommerce">E-commerce</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Image URL</label>
                        <input
                          type="url"
                          value={portfolioForm.image}
                          onChange={(e) => setPortfolioForm({...portfolioForm, image: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="https://example.com/image.jpg"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Duration</label>
                        <input
                          type="text"
                          value={portfolioForm.duration}
                          onChange={(e) => setPortfolioForm({...portfolioForm, duration: e.target.value})}
                          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="e.g., 3 months"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="featured"
                          checked={portfolioForm.featured}
                          onChange={(e) => setPortfolioForm({...portfolioForm, featured: e.target.checked})}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="featured" className="ml-2 block text-sm text-gray-900">
                          Featured Project
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description *</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.description}
                        onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Challenge</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.challenge}
                        onChange={(e) => setPortfolioForm({...portfolioForm, challenge: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Solution</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.solution}
                        onChange={(e) => setPortfolioForm({...portfolioForm, solution: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Results</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.results}
                        onChange={(e) => setPortfolioForm({...portfolioForm, results: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Process</label>
                      <textarea
                        rows={3}
                        value={portfolioForm.process}
                        onChange={(e) => setPortfolioForm({...portfolioForm, process: e.target.value})}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        disabled={portfolioLoading}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {portfolioLoading ? 'Saving...' : (editingProject ? 'Update Project' : 'Create Project')}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowCreateForm(false);
                          setEditingProject(null);
                          resetPortfolioForm();
                        }}
                        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Projects List */}
              <div className="space-y-4">
                {portfolioProjects.map((project) => (
                  <div key={project.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="font-medium">{project.title}</h3>
                        <p className="text-gray-600">{project.description}</p>
                        <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                          <span>Client: {project.client}</span>
                          <span>Category: {project.category}</span>
                          {project.featured && <span className="text-yellow-600 font-medium">⭐ Featured</span>}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditPortfolio(project)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeletePortfolio(project.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'communications' && (
            <div className="p-6">
              {/* Section 1: Contact Form Submissions */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">📧 Contact Form Submissions</h3>
                <div className="space-y-4">
                  {contacts.map((contact) => (
                    <div key={contact.id} className={`border rounded-lg p-4 ${contact.is_read ? 'bg-gray-50' : 'bg-blue-50'}`}>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium">{contact.name}</h3>
                        <div className="flex items-center space-x-2">
                          {!contact.is_read && (
                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">Unread</span>
                          )}
                          {contact.admin_reply && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">Replied</span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600">{contact.email}</p>
                      <p className="text-sm text-gray-500 mt-1">{contact.message}</p>
                      {contact.admin_reply && (
                        <div className="mt-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                          <p className="text-sm font-medium text-green-800">Admin Reply:</p>
                          <p className="text-sm text-green-700 mt-1">{contact.admin_reply}</p>
                          <p className="text-xs text-green-600 mt-1">
                            Replied on {new Date(contact.replied_at).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                      <div className="mt-2 flex space-x-2">
                        {!contact.is_read && (
                          <button
                            onClick={() => handleMarkAsRead(contact.id)}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          >
                            Mark as Read
                          </button>
                        )}
                        {!contact.admin_reply && (
                          <button
                            onClick={() => handleReplyToContact(contact)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          >
                            Reply
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteContact(contact.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section 2: Send Messages */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">📤 Send Message to User</h3>
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Select User</label>
                    <select
                      value={messageForm.recipientId}
                      onChange={(e) => setMessageForm({ ...messageForm, recipientId: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Choose a user...</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Subject</label>
                    <input
                      type="text"
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter message subject"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Message</label>
                    <textarea
                      rows={4}
                      value={messageForm.content}
                      onChange={(e) => setMessageForm({ ...messageForm, content: e.target.value })}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Enter your message to the user"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Section 3: Message History */}
              <div>
                <h3 className="text-lg font-semibold mb-4">📨 Message History</h3>
                <div className="space-y-4">
                  {messages.slice(0, 10).map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">{message.title}</h4>
                          <p className="text-sm text-gray-600">
                            {message.message_type === 'admin_to_user' ? 'To: ' : 'From: '}
                            {message.message_type === 'admin_to_user' ? message.recipient_name : message.sender_name}
                          </p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(message.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded ${
                          message.message_type === 'admin_to_user'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {message.message_type === 'admin_to_user' ? 'Sent' : 'Received'}
                        </span>
                      </div>
                      <p className="text-gray-700 mt-2">{message.content}</p>
                      {!message.is_read && message.message_type === 'user_to_admin' && (
                        <span className="inline-block mt-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                          Unread
                        </span>
                      )}
                    </div>
                  ))}
                </div>
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
