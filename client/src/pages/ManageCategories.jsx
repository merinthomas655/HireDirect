import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import "../css/adminDashboard.css";
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from '../graphql/categories';

const ManageCategories = () => {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const [updateCategory] = useMutation(UPDATE_CATEGORY);
  const [deleteCategory] = useMutation(DELETE_CATEGORY);

  const [categories, setCategories] = useState([]);
  const [editCategory, setEditCategory] = useState(null);
  const [newCategory, setNewCategory] = useState({ category_name: '', description: '' });
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setCategories(data.categories);
    }
  }, [data]);

  const handleCreate = async () => {
    if (!newCategory.category_name) {
      alert('Category name is required.');
      return;
    }

    try {
      const { data } = await createCategory({
        variables: {
          category_name: newCategory.category_name,
          description: newCategory.description,
        },
      });
      setCategories([...categories, data.createCategory]);
      setNewCategory({ category_name: '', description: '' });
    } catch (err) {
      console.error('Create failed:', err);
    }
  };

  const handleClose = () => {
    navigate('/admin-dashboard');
  };

  const handleUpdate = async () => {
    setIsUpdating(true);

    try {
      const { data } = await updateCategory({
        variables: {
          id: editCategory._id,
          category_name: editCategory.category_name,
          description: editCategory.description,
        },
      });
      setCategories(categories.map((cat) => (cat._id === data.updateCategory._id ? data.updateCategory : cat)));
      setEditCategory(null);
    } catch (err) {
      console.error('Update failed:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    setIsDeleting(true);

    try {
      await deleteCategory({ variables: { id } });
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <h2>Manage Categories</h2>
      <button onClick={handleClose} className="popup-close-btn">
          Close
        </button>

      {/* Create Category Form */}
      <div>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory.category_name}
          onChange={(e) => setNewCategory({ ...newCategory, category_name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newCategory.description}
          onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
        />
        <button onClick={handleCreate}>Add Category</button>
      </div>

      {/* Display Categories */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td>
                  {editCategory && editCategory._id === category._id ? (
                    <input
                      type="text"
                      value={editCategory.category_name}
                      onChange={(e) =>
                        setEditCategory({ ...editCategory, category_name: e.target.value })
                      }
                    />
                  ) : (
                    category.category_name
                  )}
                </td>
                <td>
                  {editCategory && editCategory._id === category._id ? (
                    <input
                      type="text"
                      value={editCategory.description}
                      onChange={(e) =>
                        setEditCategory({ ...editCategory, description: e.target.value })
                      }
                    />
                  ) : (
                    category.description
                  )}
                </td>
                <td>
                  {editCategory && editCategory._id === category._id ? (
                    <>
                      <button onClick={handleUpdate} disabled={isUpdating}>
                        {isUpdating ? 'Saving...' : 'Save'}
                      </button>
                      <button onClick={() => setEditCategory(null)}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => setEditCategory(category)}>Edit</button>
                      <button onClick={() => handleDelete(category._id)} disabled={isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete'}
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCategories;
