import React from "react";
import Layout from '../components/Layout.jsx';
import { useQuery } from '@apollo/client';
import { GET_PROVIDER_PROFILE } from '../graphql/queries';
import { useNavigate,useParams } from 'react-router-dom';
import ReviewsSection from '../components/ReviewsSection';
import ServicesTable from '../components/ServicesTable';

import "../css/professionalprofile.css";
import "../css/servicestable.css";
import "../css/reviewssection.css";

function ProfessionalProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_PROVIDER_PROFILE, { variables: { id: providerId } });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { provider } = data;

  const handleBookNow = () => {
    navigate(`/booking?providerId=${providerId}`, { state: { services: provider.services } });
  };
  return (
    <Layout>
      <div className="professional-profile">
        <h1>Professional Profile</h1>
        <div className="profile-header">
          <div className="profile-avatar">
            <img src="../assets/img/user.png" alt="Profile Avatar" />
          </div>
         
          <div className="profile-info">
            <h1>{provider.user.username}</h1>
            <p className="bio">{provider.bio}</p>
            <p className="rating">Rating: {provider.ratings}</p>
            <p className="location">Location: {provider.location.address}</p>
            <button className="book-now-button" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
        <div className="services-section">
          <h3>Pricing and Available Services</h3>
          <ServicesTable services={provider.services} />
        </div>
        <div className="reviews-section">
          <h3>Customer Reviews</h3>
          <ReviewsSection reviews={provider.reviews} />
        </div>
      </div>
    </Layout>
  );
}

export default ProfessionalProfile;