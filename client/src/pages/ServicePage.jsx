import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import '../css/ServicePage.css'; // Import the CSS file for styling
import Layout from '../components/Layout';

// GraphQL Queries
const GET_SERVICES = gql`
  query GetServices($categoryId: ID, $location: String, $minRating: Float) {
    services(categoryId: $categoryId, location: $location, minRating: $minRating) {
      _id
      service_name
      description
      pricing
      provider {
        _id
        bio
        ratings
        location {
          address
        }
      }
      category {
        category_name
      }
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

  const { loading: servicesLoading, error: servicesError, data: servicesData, refetch } = useQuery(GET_SERVICES, {
    variables: {
      categoryId: filters.category || null,
      location: filters.location || null,
      minRating: filters.rating ? parseFloat(filters.rating) : null
    }
  });

  const { loading: categoriesLoading, error: categoriesError, data: categoriesData } = useQuery(GET_CATEGORIES);

  const handleApplyFilters = () => {
    refetch({
      categoryId: filters.category || null,
      location: filters.location || null,
      minRating: filters.rating ? parseFloat(filters.rating) : null
    });
  };

  const handleClearFilters = () => {
    setFilters({ category: '', location: '', rating: '' });
    setSearchTerm('');
    refetch({ categoryId: null, location: null, minRating: null });
  };

  const handleSearch = () => {
    if (searchTerm) {
      return servicesData.services.filter(service =>
        service.service_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return servicesData.services; // Return all services if no search term
  };

  if (servicesLoading || categoriesLoading) return <p>Loading...</p>;
  if (servicesError) return <p>Error: {servicesError.message}</p>;
  if (categoriesError) return <p>Error: {categoriesError.message}</p>;

  const filteredServices = handleSearch();

  return (
    <Layout>
              <h1>Services</h1>

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
            <button className='search-button' onClick={handleSearch}>Search</button>
          </div>

          <div className="service-list">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service._id} className="service-card">
                  <h3>{service.service_name}</h3>
                  <p>{service.description}</p>
                  <p>Pricing: ${service.pricing}</p>
                  {/* Check if provider exists before accessing properties */}
                  {service.provider ? (
                    <>
                      <p>Provider: {service.provider.bio}</p>
                      <p>Location: {service.provider.location.address}</p>
                      <p>Rating: {service.provider.ratings}</p>
                    </>
                  ) : (
                    <p>Provider information is not available.</p>
                  )}
                  <button className='profile-button'>View Profile</button>
                </div>
              ))
            ) : (
              <p>No services found.</p>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
