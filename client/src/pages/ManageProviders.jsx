import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROVIDERS, UPDATE_PROVIDER, DELETE_PROVIDER } from '../graphql/providers';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

const ManageProviders = () => {
  const { loading, error, data } = useQuery(GET_PROVIDERS);
  const [updateProvider] = useMutation(UPDATE_PROVIDER);
  const [deleteProvider] = useMutation(DELETE_PROVIDER);

  const [providers, setProviders] = useState([]);
  const [editProvider, setEditProvider] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();  // Initialize navigate

  useEffect(() => {
    if (data) {
      setProviders(data.providers);
    }
  }, [data]);

  const handleEdit = (provider) => {
    setEditProvider(provider);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);
  
    // Validate required fields
    if (
      !editProvider.bio ||
      editProvider.ratings < 0 ||
      !editProvider.location ||
      !editProvider.location.address
    ) {
      alert('Please fill in all required fields with valid data.');
      setIsUpdating(false);
      return;
    }
  
    // Remove __typename from location
    const sanitizedLocation = { ...editProvider.location };
    delete sanitizedLocation.__typename;
  
    try {
      const response = await updateProvider({
        variables: {
          id: editProvider._id,
          bio: editProvider.bio,
          location: sanitizedLocation, // Use sanitized location
          image: editProvider.image,
          ratings: editProvider.ratings,
        },
      });
  
      console.log("Update response:", response);
      setProviders(providers.map((p) => (p._id === editProvider._id ? editProvider : p)));
      setEditProvider(null);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };
  

  const handleDelete = async (id) => {
    setIsDeleting(true);

    try {
      await deleteProvider({ variables: { id } });

      // Update the state
      setProviders(providers.filter((p) => p._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  // Navigate to the admin dashboard when close is clicked
  const handleClose = () => {
    navigate('/admin-dashboard');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Manage Providers</h2>
        <button onClick={handleClose} className="popup-close-btn">
          Close
        </button>

        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Bio</th>
              <th>Location</th>
              <th>Image</th>
              <th>Ratings</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr key={provider._id}>
                {/* Display user details */}
                <td>
                  {provider.user
                    ? `${provider.user.username} (${provider.user.email})`
                    : 'No user linked'}
                </td>

                {/* Display bio */}
                <td>
                  {editProvider && editProvider._id === provider._id ? (
                    <input
                      type="text"
                      value={editProvider.bio}
                      onChange={(e) =>
                        setEditProvider({ ...editProvider, bio: e.target.value })
                      }
                    />
                  ) : (
                    provider.bio || 'N/A'
                  )}
                </td>

                {/* Display location */}
                <td>
                  {editProvider && editProvider._id === provider._id ? (
                    <input
                      type="text"
                      value={editProvider.location?.address || ''}
                      onChange={(e) =>
                        setEditProvider({
                          ...editProvider,
                          location: { ...editProvider.location, address: e.target.value },
                        })
                      }
                    />
                  ) : (
                    provider.location?.address || 'No location specified'
                  )}
                </td>

                {/* Display image */}
                <td>
                  {editProvider && editProvider._id === provider._id ? (
                    <input
                      type="text"
                      value={editProvider.image || ''}
                      onChange={(e) =>
                        setEditProvider({ ...editProvider, image: e.target.value })
                      }
                    />
                  ) : (
                    provider.image || 'N/A'
                  )}
                </td>

                {/* Display ratings */}
                <td>
                  {editProvider && editProvider._id === provider._id ? (
                    <input
                      type="number"
                      value={editProvider.ratings || 0}
                      onChange={(e) =>
                        setEditProvider({
                          ...editProvider,
                          ratings: parseFloat(e.target.value),
                        })
                      }
                    />
                  ) : (
                    provider.ratings || '0'
                  )}
                </td>

                {/* Display actions */}
                <td>
                  {editProvider && editProvider._id === provider._id ? (
                    <>
                      <button onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditProvider(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(provider)}>Edit</button>
                      <button onClick={() => handleDelete(provider._id)} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProviders;
