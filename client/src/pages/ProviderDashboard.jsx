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
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [editedService, setEditedService] = useState({
        service_name: "",
        description: "",
        pricing: "",
    });

    const handleAddSlotClick = () => {
        setSlotFormVisible(!isSlotFormVisible);
    };

    // Fetch slots data from the backend
    useEffect(() => {
        const fetchSlots = async () => {
            try {
                const response = await fetch("http://localhost:8000/api/slots");
                const data = await response.json();
                setSlots(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching slots:", error);
                setLoading(false);
            }
        };
        fetchSlots();
    }, []);
    useEffect(() => {
        const fetchServices = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/services"
                );
                console.log("response", response);
                if (!response.ok) throw new Error("Failed to fetch services");
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
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/api/bookings"
                );
                if (!response.ok) throw new Error("Failed to fetch bookings");
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error("Error fetching bookings:", error);
            } finally {
                setLoadingBookings(false);
            }
        };
        fetchBookings();
    }, []);
    const handleEditService = (serviceId) => {
        const serviceToEdit = services.find(
            (service) => service._id === serviceId
        );
        setEditedService({
            service_name: serviceToEdit.service_name,
            description: serviceToEdit.description,
            pricing: serviceToEdit.pricing,
        });
        setEditingServiceId(serviceId); // Set the service ID to indicate it's being edited
    };

    const handleCancelEdit = () => {
        setEditingServiceId(null); // Close the edit mode
    };

    const handleSaveEdit = async (serviceId) => {
        try {
            const updatedService = {
                service_name: editedService.service_name,
                description: editedService.description,
                pricing: editedService.pricing,
            };

            // Send the updated service to the backend
            const response = await fetch(
                `http://localhost:8000/api/services/${serviceId}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedService),
                }
            );
            console.log("serviceID", serviceId);

            if (!response.ok) throw new Error("Failed to update service");

            // Update the service list locally after successful update
            setServices(
                services.map((service) =>
                    service._id === serviceId
                        ? { ...service, ...updatedService }
                        : service
                )
            );
            setEditingServiceId(null); // Exit edit mode after saving
        } catch (error) {
            console.error("Error saving service:", error);
        }
    };
    const handleViewBooking = (bookingId) => {
    const bookingToView = bookings.find(booking => booking._id === bookingId);
    setSelectedBooking(bookingToView);
    };

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
                    <div className="profile-picture">
                        <img
                            src="/assets/img/person-profile-icon.png"
                            alt="Profile"
                        />
                    </div>
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
                                    <td>
                                        {new Date(
                                            slot.date
                                        ).toLocaleDateString()}
                                    </td>
                                    <td>
                                        {new Date(
                                            slot.start_time
                                        ).toLocaleTimeString()}
                                    </td>
                                    <td>
                                        {new Date(
                                            slot.end_time
                                        ).toLocaleTimeString()}
                                    </td>
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
                                    {editingServiceId === service._id ? (
                                        <>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={
                                                        editedService.service_name
                                                    }
                                                    onChange={(e) =>
                                                        setEditedService({
                                                            ...editedService,
                                                            service_name:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={
                                                        editedService.description
                                                    }
                                                    onChange={(e) =>
                                                        setEditedService({
                                                            ...editedService,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={
                                                        editedService.pricing
                                                    }
                                                    onChange={(e) =>
                                                        setEditedService({
                                                            ...editedService,
                                                            pricing:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleSaveEdit(
                                                            service._id
                                                        )
                                                    }
                                                    className="save-button"
                                                >
                                                    Save
                                                </button>
                                                <button
                                                    onClick={handleCancelEdit}
                                                    className="cancel-button"
                                                >
                                                    Cancel
                                                </button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <td>{service.service_name}</td>
                                            <td>{service.description}</td>
                                            <td>${service.pricing}</td>
                                            <td>
                                                <button
                                                    onClick={() =>
                                                        handleEditService(
                                                            service._id
                                                        )
                                                    }
                                                    className="edit-button"
                                                >
                                                    Edit
                                                </button>
                                                <button className="delete-button">
                                                    Delete
                                                </button>
                                            </td>
                                        </>
                                    )}
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
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
          <tbody>
    {loadingBookings ? (
        <tr>
            <td colSpan="5">Loading...</td>
        </tr>
    ) : bookings.length > 0 ? (
        bookings.map((booking, index) => (
            <tr key={booking._id}>
                <td>{index + 1}</td>
                {/* Iterate over the booking_services array to display service names */}
                <td>
                    {booking.booking_services.length > 0
                        ? booking.booking_services.map((service, idx) => (
                              <div key={service.service_id?._id || idx}>
                                  {service.service_id?.service_name || "Service Not Available"}
                              </div>
                          ))
                        : "No Services Available"}
                </td>
                <td>${booking.total_price}</td>
                <td>{booking.status}</td>
                <td>
                    <button
                        className="view-button"
                        onClick={() => handleViewBooking(booking._id)}
                    >
                        View
                    </button>
                </td>
            </tr>
        ))
    ) : (
        <tr>
            <td colSpan="5">No bookings available</td>
        </tr>
    )}
</tbody>
{/* Booking Details Section */}
{selectedBooking && (
    <div className="booking-details">
        <h3>Booking Details</h3>
        <p><strong>Booking ID:</strong> {selectedBooking._id}</p>
        <p><strong>Status:</strong> {selectedBooking.status}</p>
        <p><strong>Total Price:</strong> ${selectedBooking.total_price}</p>
        <h2>Services</h2>
        <ul>
            {selectedBooking.booking_services.map((service, idx) => (
                <li key={idx}>
                    {service.service_id?.service_name || "Service Not Available"}
                </li>
            ))}
                            </ul>
                              <button className="close-button" onClick={() => setSelectedBooking(null)}>Close</button>
        {/* You can add more details as per your requirements */}
    </div>
)}
                </table>
            </div>

            <Footer />
        </div>
    );
};

export default ProviderDashboard;
