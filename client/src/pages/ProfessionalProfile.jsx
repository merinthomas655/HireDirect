import React from "react";
import Layout from "../components/Layout";

function ProfessionalProfile() {
  return (
    <Layout>
      <div className="professional-profile">
        <h1>Professional Profile</h1>
        <div className="profile-header">
            <img/>
            <div className="profile-details">
                <h2>Provider Name</h2>
                <p>Provider Bio</p>
                <p>Rating</p>
            </div>
            <div className="services-section">
                <h3>Services Offered</h3>
            </div>
            <div className="reviews-section">
                <h3>Reviews</h3>
            </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfessionalProfile;