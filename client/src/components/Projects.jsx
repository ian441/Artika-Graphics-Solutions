import React, { useState, useEffect } from 'react';
import { getUserProjects, createProject, updateProject, deleteProject } from '../services/api';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      const response = await getUserProjects();
      if (response.success) {
        setProjects(response.data);
      } else {
        setError('Failed to fetch projects');
      }
    } catch {
      setError('Failed to fetch projects');
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    if (!newProjectTitle) {
      setError('Project title is required');
      return;
    }
    try {
      const response = await createProject({
        title: newProjectTitle,
        description: newProjectDescription,
      });
      if (response.success) {
        setNewProjectTitle('');
        setNewProjectDescription('');
        fetchProjects();
      } else {
        setError('Failed to create project');
      }
    } catch {
      setError('Failed to create project');
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await deleteProject(id);
      if (response.success) {
        fetchProjects();
      } else {
        setError('Failed to delete project');
      }
    } catch {
      setError('Failed to delete project');
    }
  };

  return (
    <div>
      <h2>Your Projects</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <input
          type="text"
          placeholder="Project Title"
          value={newProjectTitle}
          onChange={(e) => setNewProjectTitle(e.target.value)}
        />
        <textarea
          placeholder="Project Description"
          value={newProjectDescription}
          onChange={(e) => setNewProjectDescription(e.target.value)}
        />
        <button onClick={handleCreateProject}>Add Project</button>
      </div>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <strong>{project.title}</strong>: {project.description}
            <button onClick={() => handleDeleteProject(project.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Projects;
