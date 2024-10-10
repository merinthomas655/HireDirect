import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../css/ServicePage.css'; // Import the CSS file for styling
import Layout from '../components/Layout';

// GraphQL Queries
const GET_PROVIDERS = gql`
  query GetProviders($categoryId: ID, $location: String, $minRating: Float) {
    providers(categoryId: $categoryId, location: $location, minRating: $minRating) {
      _id
      user {
        username
      }
      bio
      ratings
      location {
        address
      }
      image
    }
  }
`;

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      _id
      category_name
    }
  }
`;

const ServicePage = () => {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    rating: ''
  });
  
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);
  
  const { loading: providersLoading, error: providersError, data: providersData, refetch } = useQuery(GET_PROVIDERS, {
    variables: {
      categoryId: filters.category,
      location: filters.location,
      minRating: filters.rating ? parseFloat(filters.rating) : null,
    },
    skip: !categoriesData, // Only run this query after categories have loaded
  });

  const handleApplyFilters = () => {
    // Trigger a refetch with current filters
    refetch({
      categoryId: filters.category,
      location: filters.location,
      minRating: filters.rating ? parseFloat(filters.rating) : null,
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: '', location: '', rating: '' });
    setSearchTerm(''); // Clear search term
    refetch({ categoryId: null, location: '', minRating: null }); // Clear filters on refetch
  };

  if (providersLoading || categoriesLoading) return <p>Loading...</p>;
  if (providersError) return <p>Error loading providers: {providersError.message}</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;

  // Filter providers based on search term
  const filteredProviders = providersData?.providers.filter(provider =>
    provider.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <h1>Providers</h1>
      <div className="service-page">
        <div className="filter-section">
          <h2>Filters</h2>
          <button className="clear-button" onClick={handleClearFilters}>Clear All Filters</button>
          <div className="filter-group">
            <label>Category:</label>
            <select onChange={(e) => setFilters({ ...filters, category: e.target.value })}>
              <option value="">Select Category</option>
              {categoriesData.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category_name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-group">
            <label>Location:</label>
            <input
              type="text"
              value={filters.location}
              placeholder="Enter location"
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
          <div className="filter-group">
            <label>Minimum Rating:</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            />
          </div>
          <button className="apply-button" onClick={handleApplyFilters}>Apply</button>
        </div>

        <div className="results-section">
          <div className="search-section">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className='search-button' onClick={() => setSearchTerm(searchTerm)}>Search</button>
          </div>
          
          <div className="service-list">
            {filteredProviders && filteredProviders.length > 0 ? (
              filteredProviders.map((provider) => (
                <div key={provider._id} className="service-card">
                  {provider.image && (
                    <img src={provider.image} alt={provider.user?.username || 'Provider Image'} className="provider-image" />
                  )}
                  <p>Provider: {provider.user ? provider.user.username : 'Unknown User'}</p>
                  <p>Location: {provider.location?.address || 'Address not provided'}</p>
                  <p>Rating: {provider.ratings || 'No ratings available'}</p>
                  <p>{provider.bio || 'No bio available'}</p>
                  <button className='profile-button'>View Profile</button>
                </div>
              ))
            ) : (
              <p>No providers found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
