import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../css/providerdashboard.css";

const ProviderDashboard = () => {
    const [isSlotFormVisible, setSlotFormVisible] = useState(false);
    const [slots, setSlots] = useState([]); // State to store available slots
    const [loading, setLoading] = useState(true);
    const [services, setServices] = useState([]);      
    const [loadingServices, setLoadingServices] = useState(true);
    const [error, setError] = useState(null);
    
    const handleAddSlotClick = () => {
        setSlotFormVisible(!isSlotFormVisible);
    };

    // Fetch slots data from the backend
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/slots');
                const data = await response.json();
                setSlots(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching slots:', error);
                setLoading(false);
            }
        };
        fetchSlots();
    }, []);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/services');
                console.log("response", response);
                if (!response.ok) throw new Error('Failed to fetch services');
                const data = await response.json();
                setServices(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoadingServices(false);
            }
        };
        fetchServices();
    }, []);

    return (
        <div className="provider-dashboard">
            <Header />

            {/* Stats Section */}
            <div className="stats-container">
                <div className="stat-box">
                    <h2>Total Bookings</h2>
                    <p>35</p>
                </div>
                <div className="stat-box">
                    <h2>Upcoming Bookings</h2>
                    <p>20</p>
                </div>
                <div className="stat-box">
                    <h2>Earnings This Month</h2>
                    <p>$200</p>
                </div>
                <div className="stat-box">
                    <h2>Total Earnings</h2>
                    <p>$2035</p>
                </div>
            </div>

            {/* Profile Management Section */}
            <div className="profile-management">
                <h2>Profile Management</h2>
                <div className="profile-form">
                    <div className="profile-picture"></div>
                    <div className="profile-inputs">
                        <input type="text" placeholder="Name" />
                        <input type="email" placeholder="Email" />
                        <input type="tel" placeholder="Phone" />
                        <input type="text" placeholder="Address" />
                    </div>
                    <button className="save-button">Save Changes</button>
                </div>
            </div>



            {/* Availability Management Section */}
            <div className="availability-management">
                <div className="availability-button">
                    <h2>Availability Management</h2>
                    <button
                        className="add-slot-button"
                        onClick={handleAddSlotClick}
                    >
                        Add New Slot
                    </button>
                </div>

                {isSlotFormVisible && (
                    <form className="slot-form">
                        <input type="date" name="date" />
                        <input type="time" name="startTime" />
                        <input type="time" name="endTime" />
                        <button type="submit" className="submit-slot-button">
                            Save Slot
                        </button>
                    </form>
                )}

                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : slots.length > 0 ? (
                            slots.map((slot) => (
                                <tr key={slot._id}>
                                    <td>{new Date(slot.date).toLocaleDateString()}</td>
                                    <td>{new Date(slot.start_time).toLocaleTimeString()}</td>
                                    <td>{new Date(slot.end_time).toLocaleTimeString()}</td>
                                    <td>
                                        <button className="delete-button">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No slots available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

     
            {/* Services Management Section */}
            <div className="services-management">
                <div className="services-button">
                    <h2>Services Management</h2>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Service Name</th>
                            <th>Description</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loadingServices ? (
                            <tr>
                                <td colSpan="4">Loading...</td>
                            </tr>
                        ) : error ? (
                            <tr>
                                <td colSpan="4">{error}</td>
                            </tr>
                        ) : services.length > 0 ? (
                            services.map((service) => (
                                <tr key={service._id}>
                                    <td>{service.service_name}</td>
                                    <td>{service.description}</td>
                                    <td>${service.pricing}</td>
                                    <td>
                                        <button className="edit-button">Edit</button>
                                        <button className="delete-button">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4">No services available</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Booking History Section */}
            <div className="booking-history">
                <h2>Booking History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>#B0310</td>
                            <td>Pipe Repair</td>
                            <td>Sep 14, 2024 01:40 pm</td>
                            <td>Pending</td>
                            <td>
                                <button className="view-details-button">
                                    View Details
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Footer />
        </div>
    );
};

export default ProviderDashboard;

