import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import '../css/ServicePage.css';
import Layout from '../components/Layout';

// GraphQL queries
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

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProviders, setFilteredProviders] = useState([]);
  const [initialProviders, setInitialProviders] = useState([]); // Stores the full list of providers

  // Fetch categories
  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);

  // Fetch providers based on filters
  const { loading: providersLoading, error: providersError, data: providersData, refetch } = useQuery(GET_PROVIDERS, {
    variables: {
      categoryId: filters.category,
      location: filters.location,
      minRating: filters.rating ? parseFloat(filters.rating) : null,
    },
    skip: !categoriesData, // Skip until categories data is fetched
  });

  useEffect(() => {
    // Set the initial list of providers when the data is fetched
    if (providersData) {
      setInitialProviders(providersData.providers);
      setFilteredProviders(providersData.providers); // Initially, show all providers
    }
  }, [providersData]);

  // Apply search when the user clicks "Search"
  const handleSearch = () => {
    const filtered = initialProviders.filter((provider) =>
      provider?.user?.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProviders(filtered);
  };

  // Apply filters when the user clicks "Apply"
  const handleApplyFilters = () => {
    let filtered = initialProviders;

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((provider) => provider.categoryId === filters.category);
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter((provider) =>
        provider.location?.address.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter((provider) => provider.ratings >= filters.rating);
    }

    // Update filtered providers state
    setFilteredProviders(filtered);
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({ category: '', location: '', rating: '' });
    setSearchTerm('');
    setFilteredProviders(initialProviders);
  };

  // Error handling
  if (providersLoading || categoriesLoading) return <p>Loading...</p>;
  if (providersError) return <p>Error loading providers: {providersError.message}</p>;
  if (categoriesError) return <p>Error loading categories: {categoriesError.message}</p>;

  return (
    <Layout>
      <h1>Providers</h1>
      <div className="service-page">
        <div className="filter-section">
          <h2>Filters</h2>
          <button className="clear-button" onClick={handleClearFilters}>Clear All Filters</button>
          <div className="filter-group">
            <label>Category:</label>
            <select
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              value={filters.category}
            >
              <option value="">Select Category</option>
              {categoriesData?.categories?.map((category) => (
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
              placeholder="Search by provider..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>Search</button>
          </div>

          <div className="service-list">
            {filteredProviders?.length > 0 ? (
              filteredProviders.map((provider) => (
                <div key={provider._id} className="s-card">
                  {provider.image && (
                    <img
                      src={provider.image}
                      alt={provider.user?.username || 'Provider Image'}
                      className="provider-image"
                    />
                  )}
                  <p>Provider: {provider.user?.username || 'Unknown User'}</p>
                  <p>Location: {provider.location?.address || 'Address not provided'}</p>
                  <p>Rating: {provider.ratings || 'No ratings available'}</p>
                  <p>{provider.bio || 'No bio available'}</p>
                  <Link to={`/profile/${provider._id}`}>
                    <button className="profile-button">View Profile</button>
                  </Link>
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
