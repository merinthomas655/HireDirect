import React, { useState } from 'react';
import Layout from '../components/Layout';
import '../css/ServicePage.css'; 


const ServicePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    rating: '',
    location: '',
  });

  const services = [
    {
      _id: '1',
      service_name: 'Plumbing Service',
      description: 'Expert in plumbing and repairs.',
      provider: {
        user: {
          username: 'John Doe',
          address: { city: 'New York' }
        },
        ratings: 4.5,
      },
      category: {
        category_name: 'Plumbing'
      },
    },
    
  ];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      rating: '',
      location: '',
    });
  };

  const applyFilters = () => {
    console.log('Filters Applied:', filters);
  };

  return (
    
    <Layout>
        <div className='container-servicepage'>
            <div>
        <div className='title-servcepage'>
            <h1>Services</h1>

            
          </div>

      <div className="service-page-container">

        <div className="filter-panel">
          <h3>Filters</h3>
          <button className='clear-button' onClick={clearFilters}>Clear all filter</button>

          <div className="filter-group">
            <select name="category" value={filters.category} onChange={handleFilterChange}>
              <option value="">Categories</option>
              <option value="plumbing">Plumbing</option>
              <option value="cleaning">Cleaning</option>
              <option value="cleaning">Electrician</option>
            </select>
          </div>

          <div className="filter-group">
            <input
              type="text"
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              placeholder="Location"
            />
          </div>

          <div className="filter-group">
            <select name="rating" value={filters.rating} onChange={handleFilterChange}>
              <option value="">Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars & Up</option>
              <option value="3">3 Stars & Up</option>
            </select>
          </div>

          <div>
            <button onClick={applyFilters} className="apply-button">Apply</button>
          </div>
          
        </div>
        </div>
        </div>
        <div className="main-content">
        
        <div className="search-bar">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for services..."
              className="search-input"
            />
            <button className="search-button">Search</button>
          </div>

          <div className="service-list">
            {services.map((service) => (
              <div key={service._id} className="service-card">
                <div>
                <img
                  src="https://via.placeholder.com/150"
                  alt={service.provider.user.username}
                  className="service-image"
                />
                <p><strong>Rating:</strong> {service.provider.ratings} / 5</p>
                </div>

                <div className="service-details">
                  <h3>{service.service_name}</h3>
                  <p>{service.description}</p>
                  <p><strong>City:</strong> {service.provider.user.address.city}</p>
                  <button className="profile-button">View Profile</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ServicePage;
