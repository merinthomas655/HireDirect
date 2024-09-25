import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import { Link } from "react-router-dom";
import Layout from "../components/Layout";

import "../css/home.css";

const Home = () => {
    return (
        <div className="home-container">
            {/* Header */}
            <Header />

            {/* Hero Section */}
            <section className="hero">
                <img
                    src="/assets/img/banner.jpeg"
                    alt="Image for Home-service"
                    className="hero-image"
                />
                <div className="hero-text">
                    <h1>Connecting You to Top Local Professionals</h1>
                    <input
                        type="text"
                        className="search-bar"
                        placeholder="Search for services or professionals..."
                    />
                    <button className="search-btn">Search</button>
                </div>
            </section>

            {/* Popular Services */}
            <section className="popular-services">
                <h2>Popular Services</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <img src="/assets/img/plumbing.jpeg" alt="Plumbing" />
                        <p>Plumbing</p>
                    </div>
                    <div className="service-card">
                        <img
                            src="/assets/img/electrical.jpeg"
                            alt="Electrical"
                        />
                        <p>Electrical</p>
                    </div>
                    <div className="service-card">
                        <img src="/assets/img/cleaning.jpeg" alt="Cleaning" />
                        <p>Cleaning Services</p>
                    </div>
                    <div className="service-card">
                        <img src="/assets/img/painting.jpeg" alt="Painting" />
                        <p>Painting</p>
                    </div>
                </div>
            </section>

            {/* How it Works Section */}
            <section className="how-it-works">
                <h2>How it Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Search for a Service</h3>
                        <p>
                            Find what you need by searching or browsing
                            categories.
                        </p>
                    </div>
                    <div className="step">
                        <h3>2. Compare Professionals</h3>
                        <p>
                            Check ratings, reviews, pricing, and availability.
                        </p>
                    </div>
                    <div className="step">
                        <h3>3. Book a Service</h3>
                        <p>Choose a date, time, and book instantly.</p>
                    </div>
                    <div className="step">
                        <h3>4. Pay Securely</h3>
                        <p>
                            Pay with confidence using our secure payment
                            gateway.
                        </p>
                    </div>
                    <div className="step">
                        <h3>5. Get the Job Done</h3>
                        <p>
                            The professional arrives and completes the service.
                        </p>
                    </div>
                    <div className="step">
                        <h3>6. Rate and Review</h3>
                        <p>Leave feedback and manage future bookings easily.</p>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="cta-section">
                <div className="cta">
                    <h2>Become a Service Provider!</h2>
                    <button className="cta-btn">Join HireDirect</button>
                </div>
            </section>

            {/* Customer Reviews */}
            <section className="customer-reviews">
                <div className="review">
                    <img src="/assets/img/customer.jpg" alt="Customer" />
                    <h3>Customer Reviews</h3>
                    <p>
                        John Doe was quick, professional, and fixed my leak
                        perfectly. Great service at a fair price. Highly
                        recommend!
                    </p>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
