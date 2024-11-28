import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import "../css/adminDashboard.css";

// GraphQL Queries and Mutations
const GET_USERS = gql`
  query {
    users {
      _id
      username
      email
      role
      phone_number
      address {
        street
        city
        state
        zip_code
      }
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser(
    $id: ID!
    $username: String
    $email: String
    $role: String
    $phone_number: String
    $address: AddressInput
  ) {
    updateUser(
      id: $id
      username: $username
      email: $email
      role: $role
      phone_number: $phone_number
      address: $address
    ) {
      _id
      username
      email
      role
      phone_number
      address {
        street
        city
        state
        zip_code
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      _id
    }
  }
`;

const ManageUsers = () => {
  const { loading, error, data } = useQuery(GET_USERS);
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);

  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleUpdate = async () => {
    try {
      await updateUser({
        variables: {
          id: editUser._id,
          username: editUser.username,
          email: editUser.email,
          role: editUser.role,
          phone_number: editUser.phone_number,
          address: {
            street: editUser.address.street,
            city: editUser.address.city,
            state: editUser.address.state,
            zip_code: editUser.address.zip_code,
          },
        },
      });
      setUsers(users.map((u) => (u._id === editUser._id ? editUser : u)));
      setEditUser(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Navigate to the admin dashboard when close is clicked
  const handleClose = () => {
    navigate('/admin-dashboard'); // Redirect to /admin-dashboard
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Manage Users</h2>
        <button onClick={handleClose} className="popup-close-btn">
          Close
        </button>

        <table className="edit-user-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone Number</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <input
                      type="text"
                      value={editUser.username}
                      onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
                    />
                  ) : (
                    user.username
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <input
                      type="email"
                      value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <select
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                    >
                      <option value="user">User</option>
                      <option value="provider">Provider</option>
                    </select>
                  ) : (
                    user.role
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <input
                      type="text"
                      value={editUser.phone_number}
                      onChange={(e) => setEditUser({ ...editUser, phone_number: e.target.value })}
                    />
                  ) : (
                    user.phone_number
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <>
                      <input
                        type="text"
                        placeholder="Street"
                        value={editUser.address.street}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            address: { ...editUser.address, street: e.target.value },
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="City"
                        value={editUser.address.city}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            address: { ...editUser.address, city: e.target.value },
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={editUser.address.state}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            address: { ...editUser.address, state: e.target.value },
                          })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Zip Code"
                        value={editUser.address.zip_code}
                        onChange={(e) =>
                          setEditUser({
                            ...editUser,
                            address: { ...editUser.address, zip_code: e.target.value },
                          })
                        }
                      />
                    </>
                  ) : (
                    `${user.address.street}, ${user.address.city}, ${user.address.state}, ${user.address.zip_code}`
                  )}
                </td>
                <td>
                  {editUser && editUser._id === user._id ? (
                    <>
                      <button onClick={handleUpdate} className="save-btn">
                        Save
                      </button>
                      <button onClick={() => setEditUser(null)} className="cancel-btn">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(user)} className="edit-btn">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(user._id)} className="delete-btn">
                        Delete
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

export default ManageUsers;
