import React, { useState, useEffect } from 'react';
import { getUserFavorites, removeFavorite } from '../services/api';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [error, setError] = useState('');

  const fetchFavorites = async () => {
    try {
      const response = await getUserFavorites();
      if (response.success) {
        setFavorites(response.data);
      } else {
        setError('Failed to fetch favorites');
      }
    } catch {
      setError('Failed to fetch favorites');
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleRemoveFavorite = async (projectId) => {
    try {
      const response = await removeFavorite(projectId);
      if (response.success) {
        fetchFavorites();
      } else {
        setError('Failed to remove favorite');
      }
    } catch {
      setError('Failed to remove favorite');
    }
  };

  return (
    <div>
      <h2>Your Favorites</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            <strong>{favorite.project.title}</strong>: {favorite.project.description}
            <button onClick={() => handleRemoveFavorite(favorite.project.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;
