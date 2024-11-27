import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_SERVICES, UPDATE_SERVICE, DELETE_SERVICE } from '../graphql/services'; // Assume services GraphQL queries/mutations are defined
import { useNavigate } from 'react-router-dom';

const ManageServices = () => {
  const { loading, error, data } = useQuery(GET_SERVICES);
  const [updateService] = useMutation(UPDATE_SERVICE);
  const [deleteService] = useMutation(DELETE_SERVICE);

  const [services, setServices] = useState([]);
  const [editService, setEditService] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setServices(data.services);
    }
  }, [data]);

  const handleEdit = (service) => {
    setEditService(service);
  };

  const handleUpdate = async () => {
    setIsUpdating(true);

    // Validate required fields
    if (!editService.service_name || !editService.description || editService.pricing < 0) {
      alert('Please fill in all required fields with valid data.');
      setIsUpdating(false);
      return;
    }

    try {
      await updateService({
        variables: {
          id: editService._id,
          service_name: editService.service_name,
          description: editService.description,
          pricing: editService.pricing,
          category_id: editService.category_id,
        },
      });

      // Update the state
      setServices(services.map((s) => (s._id === editService._id ? editService : s)));
      setEditService(null);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);

    try {
      await deleteService({ variables: { id } });

      // Update the state
      setServices(services.filter((s) => s._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    navigate('/admin-dashboard');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Manage Services</h2>
        <button onClick={handleClose} className="popup-close-btn">
          Close
        </button>

        <table>
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Pricing</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service._id}>
                {/* Service Name */}
                <td>
                  {editService && editService._id === service._id ? (
                    <input
                      type="text"
                      value={editService.service_name}
                      onChange={(e) =>
                        setEditService({ ...editService, service_name: e.target.value })
                      }
                    />
                  ) : (
                    service.service_name
                  )}
                </td>

                {/* Description */}
                <td>
                  {editService && editService._id === service._id ? (
                    <input
                      type="text"
                      value={editService.description}
                      onChange={(e) =>
                        setEditService({ ...editService, description: e.target.value })
                      }
                    />
                  ) : (
                    service.description
                  )}
                </td>

                {/* Pricing */}
                <td>
                  {editService && editService._id === service._id ? (
                    <input
                      type="number"
                      value={editService.pricing}
                      onChange={(e) =>
                        setEditService({ ...editService, pricing: parseFloat(e.target.value) })
                      }
                    />
                  ) : (
                    service.pricing
                  )}
                </td>

                {/* Category */}
                <td>
                  {editService && editService._id === service._id ? (
                    <input
                      type="text"
                      value={editService.category_id}
                      onChange={(e) =>
                        setEditService({ ...editService, category_id: e.target.value })
                      }
                    />
                  ) : (
                    service.category_id || 'No category assigned'
                  )}
                </td>

                {/* Actions */}
                <td>
                  {editService && editService._id === service._id ? (
                    <>
                      <button onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditService(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(service)}>Edit</button>
                      <button onClick={() => handleDelete(service._id)} disabled={isDeleting}>
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

export default ManageServices;
