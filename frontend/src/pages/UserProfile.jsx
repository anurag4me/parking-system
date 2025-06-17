import React, { useEffect, useState } from 'react';
import { useAuth } from '../store/auth';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [occupiedSlots, setOccupiedSlots] = useState(0);

  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  if(!isLoggedIn) {
    alert('Please Log In First!')
    navigate('/login')
  }

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        // Fetch occupied slots count if admin
        if (user.isAdmin) {
          const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/slots/occupied`);
          const data = await response.json()
          if(response.ok) {
            setOccupiedSlots(data.count);
          }
        } else {
            console.log("Not admin")
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    if (user && token) {
      fetchSlots();
    }
  }, [user, token]);

  const handleReleaseAllSlots = async () => {
    if (!window.confirm('Are you sure you want to release ALL occupied slots?')) return;
    
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/slots/release-all`,
        {
            method: "GET", 
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
      );
      setSuccess(await response.json().message);
      setOccupiedSlots(0);
    } catch (err) {
      setError('Failed to release slots');
    }
  };

  if (loading) return <div className="text-center py-8">Loading profile...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl text-black">
      <h1 className="text-3xl font-bold mb-8">User Profile</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Name:</span> {user.username}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Account Type:</span> {user.isAdmin ? 'Admin' : 'Standard User'}</p>
            </div>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Statistics</h2>
            <div className="space-y-3">
              <p><span className="font-medium">Member Since:</span> {new Date(user.createdAt).toLocaleDateString()}</p>
              {user.isAdmin && (
                <p><span className="font-medium">Currently Occupied Slots:</span> {occupiedSlots}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {user.isAdmin && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Admin Controls</h2>
          <div className="flex flex-col space-y-4">
            <button
              onClick={handleReleaseAllSlots}
              disabled={occupiedSlots === 0}
              className={`py-2 px-4 rounded-md text-white ${occupiedSlots === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'}`}
            >
              Release All Occupied Slots
            </button>
            <p className="text-sm text-gray-600">
              This will mark all currently booked slots as available. Use with caution.
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="mt-4 p-4 bg-green-100 text-green-700 rounded-md">
          {success}
        </div>
      )}
    </div>
  );
};

export default UserProfile;