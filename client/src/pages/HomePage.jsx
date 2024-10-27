import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer"; 
import { useNavigate } from "react-router-dom";
import ReviewsSection from "../components/ReviewsSection";
import "../css/home.css";

const Home = () => {
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate('/services');
    };

    const reviews = [
        {
            _id: "1",
            user: { username: "Michelle", profileImage: null },
            rating: 5,
            comment: "Emily was outstanding! She quickly diagnosed the electrical issue and had it fixed within an hour. Very polite and professional. The service exceeded my expectations."
        },
        {
            _id: "2",
            user: { username: "Canel", profileImage: null },
            rating: 3,
            comment: "Amazing service! Jane arrived on time, was incredibly knowledgeable, and solved the issue with my AC unit in no time. Super friendly and efficient. I will definitely use this service again!"
        },
        {
            _id: "3",
            user: { username: "Olivia", profileImage: null },
            rating: 4,
            comment: "Michael did a fantastic job replacing my water heater. He explained the process clearly, worked fast, and left everything spotless. The pricing was transparent, and I’m really happy with the results."
        }
    ];

    return (
        <div className="home-container">
            <Header />

            <section className="hero">
                <img
                    src="/assets/img/banner.jpeg"
                    alt="Image for Home-service"
                    className="hero-image"
                />
                <div className="hero-text">
                    <h1>Connecting You to Top Local Professionals</h1>
                    <select className="search-bar">
                        <option value="" disabled selected>Select a service...</option>
                        <option value="plumbing">Plumbing</option>
                        <option value="electrical">Electrical</option>
                        <option value="cleaning">Cleaning Service</option>
                        <option value="painting">Painting</option>
                    </select>
                    <button className="search-btn" onClick={handleSearch}>
                        Search
                    </button>
                </div>
            </section>

            <section className="popular-services">
                <h2>Popular Services</h2>
                <div className="service-cards">
                    <div className="service-card">
                        <img src="/assets/img/plumbing.jpeg" alt="Plumbing" />
                        <p>Plumbing</p>
                    </div>
                    <div className="service-card">
                        <img src="/assets/img/electrical.jpeg" alt="Electrical" />
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

            <section className="how-it-works">
                <h2>How it Works</h2>
                <div className="steps">
                    <div className="step">
                        <h3>1. Search for a Service</h3>
                        <p>Find what you need by searching or browsing categories.</p>
                    </div>
                    <div className="step">
                        <h3>2. Compare Professionals</h3>
                        <p>Check ratings, reviews, pricing, and availability.</p>
                    </div>
                    <div className="step">
                        <h3>3. Book a Service</h3>
                        <p>Choose a date, time, and book instantly.</p>
                    </div>
                    <div className="step">
                        <h3>4. Pay Securely</h3>
                        <p>Pay with confidence using our secure payment gateway.</p>
                    </div>
                    <div className="step">
                        <h3>5. Get the Job Done</h3>
                        <p>The professional arrives and completes the service.</p>
                    </div>
                    <div className="step">
                        <h3>6. Rate and Review</h3>
                        <p>Leave feedback and manage future bookings easily.</p>
                    </div>
                </div>
            </section>

            <section className="cta-section">
                <div className="cta">
                    <h2>Become a Service Provider!</h2>
                    <button className="cta-btn">Join HireDirect</button>
                </div>
            </section>

            <section className="customer-reviews">
                <h2>Customer Reviews</h2>
                <ReviewsSection reviews={reviews} /> 
            </section>

            <Footer />
        </div>
    );
};

export default Home;
