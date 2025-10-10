import React, { useState, useEffect } from 'react';
import { getProfile } from '../services/api';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getProfile();
        if (profileData.success) {
          setUser(profileData.data);
        } else {
          setError(profileData.message);
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center md:text-left">User Profile</h2>
      {user && (
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Username</label>
              <p className="mt-1 text-lg">{user.username || 'N/A'}</p>
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
          {/* Add edit form if needed */}
        </div>
      )}
    </div>
  );
};

export default Profile;
