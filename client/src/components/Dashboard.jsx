import React, { useState, useEffect } from 'react';
import { getProfile, getUserProjects } from '../services/api';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await getProfile();
        if (profileData.success) {
          setUser(profileData.data);
          // Fetch projects for the authenticated user
          const projectsData = await getUserProjects();
          if (projectsData.success) {
            setProjects(projectsData.data);
          } else {
            setError('Failed to fetch projects');
          }
        } else {
          setError(profileData.message);
        }
      } catch (err) {
        setError('Failed to fetch profile or projects');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Dashboard</h2>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-lg">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Account ID</label>
              <p className="mt-1 text-lg">{user.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Member Since</label>
              <p className="mt-1 text-lg">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
      )}
      <h3 className="text-2xl font-bold mb-4">Projects for You</h3>
      {projects.length === 0 ? (
        <p className="text-gray-500">No projects found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map(project => (
            <div key={project.id} className="bg-white shadow-md rounded-lg p-4">
              <h4 className="text-lg font-semibold">{project.title}</h4>
              <p className="text-gray-600">{project.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
