import React, { useContext } from "react";
import Layout from "../components/Layout.jsx";
import { useQuery } from "@apollo/client";
import { GET_PROVIDER_PROFILE } from "../graphql/queries";
import { useNavigate, useParams } from "react-router-dom";
import ReviewsSection from "../components/ReviewsSection";
import ServicesTable from "../components/ServicesTable";
import ThemeContext from "../context/ThemeContext";

import "../css/professionalprofile.css";

function ProfessionalProfile() {
  const { providerId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useContext(ThemeContext);

  const { loading, error, data } = useQuery(GET_PROVIDER_PROFILE, {
    variables: { id: providerId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { provider } = data;

  const handleBookNow = () => {
    navigate(`/booking?providerId=${providerId}`, {
      state: {
        services: provider.services,
        providername: provider.user.username,
        providerId: providerId,
      },
    });
  };

  return (
    <Layout>
      <header className={`professional-header ${theme}`}>
        <h1>Professional Profile</h1>
        <button className="theme-toggle-button" onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </header>
      <div className={`professional-profile-container ${theme}`}>
        <div className="professional-profile-content">
          <div className="professional-profile-avatar">
            <img src="../assets/img/user.png" alt="Profile Avatar" />
          </div>
          <div className="professional-profile-info">
            <h2>{provider.user.username}</h2>
            <p className="professional-profile-bio">{provider.bio}</p>
            <p className="professional-profile-rating">Rating: {provider.ratings}</p>
            <p className="professional-profile-location">Location: {provider.location.address}</p>
            <button className="professional-book-now-button" onClick={handleBookNow}>
              Book Now
            </button>
          </div>
        </div>
        <section className="professional-services-section">
          <ServicesTable services={provider.services} />
        </section>
        <section className="professional-reviews-section">
          <h3>Customer Reviews</h3>
          <ReviewsSection reviews={provider.reviews} />
        </section>
      </div>
    </Layout>
  );
}

export default ProfessionalProfile;
