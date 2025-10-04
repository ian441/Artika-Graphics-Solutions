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
    <div>
      <h2>Dashboard</h2>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.email}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Account ID:</strong> {user.id}</p>
          <p><strong>Member Since:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
        </div>
      )}
      <h3>Projects for You</h3>
      {projects.length === 0 ? (
        <p>No projects found.</p>
      ) : (
        <ul>
          {projects.map(project => (
            <li key={project.id}>
              <strong>{project.title}</strong> - {project.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
