import React from "react";
import ReviewsSection from '../components/ReviewsSection';
import ServicesTable from '../components/ServicesTable';
import Layout from '../components/Layout';
import "../css/professionalprofile.css";
import "../css/servicestable.css";
import "../css/reviewssection.css";

function ProfessionalProfile() {
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
            <button className="book-now-button">Book Now</button>
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