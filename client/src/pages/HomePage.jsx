import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom"; 
import { useLazyQuery } from "@apollo/client"; 
import gql from "graphql-tag";
import "../css/home.css";

// Define the GraphQL query for searching users or services
const SEARCH_USERS = gql`
    query searchUsers($search: String, $page: Int, $limit: Int) {
        users(search: $search, page: $page, limit: $limit) {
            users {
                id
                username
                email
            }
            totalPages
            currentPage
            totalUsers
        }
    }
`;

const services = [
    "Plumbing",
    "Electrical",
    "Cleaning Services",
    "Painting",
];

const Home = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredServices, setFilteredServices] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    const [searchUsers, { data, loading, error }] = useLazyQuery(SEARCH_USERS);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        // Filter services based on search term
        if (value.trim() !== "") {
            const filtered = services.filter((service) =>
                service.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredServices(filtered);
            setShowDropdown(true); // Show the dropdown when there are filtered results
        } else {
            setShowDropdown(false); // Hide the dropdown when the input is cleared
        }
    };

    const handleServiceSelect = (service) => {
        setSearchTerm(service); // Update search bar with selected service
        setShowDropdown(false); // Hide dropdown after selection
        navigate(`/services/${service.toLowerCase()}`); // Navigate to service page
    };

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
                        {/*https://prenticeplumbingandheating.ca/wp-content/uploads/elementor/thumbs/Depositphotos_9312342_XL-scaled-q52fosp0050fzbeofxknu6qsgwyebscgm1fbbg5n08.jpg */}
                        <p>Plumbing</p>
                    </div>
                    <div className="service-card">
                        <img
                            src="/assets/img/electrical.jpeg"
                            alt="Electrical"
                        />
                        {/*https://www.shutterstock.com/image-photo/electrician-installing-electric-cable-wires-fuse-1659836386 */}
                        <p>Electrical</p>
                    </div>
                    <div className="service-card">
                        <img src="/assets/img/cleaning.jpeg" alt="Cleaning" />
                        {/* https://cleaningservices365.com/wp-content/uploads/2024/06/3.jpg */}
                        <p>Cleaning Services</p>
                    </div>
                    <div className="service-card">
                        <img src="/assets/img/painting.jpeg" alt="Painting" />
                        {/* https://huddlemarkets.ca/wp-content/uploads/2024/04/AF1QipM_nHDLJOjSmTn-qBH9hdKCChiKbmilsAtBNxgdw260-h175-n-k-no.jpeg */}
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
                    <img src="/assets/img/user.png" alt="Customer" />
                    {/* https://www.seekpng.com/png/detail/17-176376_person-free-download-and-person-icon-png.png */}
                    <h3>Michelle </h3>
                    <p>
                        Emily was outstanding! She quickly diagnosed the electrical issue and had it fixed within an hour. Very polite and professional. The service exceeded my expectations.
                    </p>
                    <div className="rating">⭐⭐⭐⭐⭐</div>
                </div>
                <div className="review">
                    <img src="/assets/img/user.png" alt="Customer" />
                    {/* https://www.seekpng.com/png/detail/17-176376_person-free-download-and-person-icon-png.png */}
                    <h3>Canel</h3>
                    <p>
                        Amazing service! Jane arrived on time, was incredibly knowledgeable, and solved the issue with my AC unit in no time. Super friendly and efficient. I will definitely use this service again!
                    </p>
                    <div className="rating">⭐⭐⭐</div>
                </div>
                <div className="review">
                    <img src="/assets/img/user.png" alt="Customer" />
                    {/* https://www.seekpng.com/png/detail/17-176376_person-free-download-and-person-icon-png.png */}
                    <h3>Olivia</h3>
                    <p>
                        Michael did a fantastic job replacing my water heater. He explained the process clearly, worked fast, and left everything spotless. The pricing was transparent, and I’m really happy with the results.
                    </p>
                    <div className="rating">⭐⭐⭐⭐</div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Home;
