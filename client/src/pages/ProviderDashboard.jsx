import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import "../css/providerdashboard.css";

const ProviderDashboard = () => {
    const [isSlotFormVisible, setSlotFormVisible] = useState(false);
    const [slotData, setSlotData] = useState({
        date: "",
        startTime: "",
        endTime: "",
    });

    const handleAddSlotClick = () => {
        setSlotFormVisible(!isSlotFormVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSlotData({ ...slotData, [name]: value });
    };
    const handleSlotSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/add-slot", {
                //provider_id: 'YOUR_PROVIDER_ID', //
                date: slotData.date,
                startTime: slotData.startTime,
                endTime: slotData.endTime,
            });
            console.log("Response:", response.data);

            setSlotData({ date: "", startTime: "", endTime: "" });
            setSlotFormVisible(false);
        } catch (error) {
            console.error("Error saving slot:", error);
        }
    };

    return (
        <div className="provider-dashboard">
            <Header />
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
                    <p>20</p>
                </div>
                <div className="stat-box">
                    <h2>Total Earnings</h2>
                    <p>2035</p>
                </div>
            </div>

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
                    <form className="slot-form" onSubmit={handleSlotSubmit}>
                        <input
                            type="date"
                            name="date"
                            value={slotData.date}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="time"
                            name="startTime"
                            value={slotData.startTime}
                            onChange={handleInputChange}
                            required
                        />
                        <input
                            type="time"
                            name="endTime"
                            value={slotData.endTime}
                            onChange={handleInputChange}
                            required
                        />
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
                        <tr>
                            <td>Sep 14, 2024</td>
                            <td>09:00 am</td>
                            <td>10:00 am</td>
                            <td>
                                <button className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="services-management">
                <div className="services-button">
                    <h2>Services Management</h2>
                    <button className="add-service-button">
                        Add New Service
                    </button>
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
                        <tr>
                            <td>Pipe Repair</td>
                            <td>Fix damaged or leaking pipes</td>
                            <td>$100</td>
                            <td>
                                <button className="edit-button">Edit</button>
                                <button className="delete-button">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

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
