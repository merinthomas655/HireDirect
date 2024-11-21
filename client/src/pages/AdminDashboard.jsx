import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from '../components/Layout.jsx';
import "../css/adminDashboard.css";

// GraphQL query to fetch counts and booking history
const GET_DASHBOARD_DATA = gql`
  query {
    getCounts {
      totalUsers
      totalProviders
      totalServices
      totalBookings
    }
    getBookingHistory {
      _id
      booking_services {
        service_id {
          service_name
        }
      }
      created_at
      status
    }
  }
`;

// Function to format booking ID as B001, B002, etc.
const formatBookingId = (index) => {
  return `B${String(index + 1).padStart(3, '0')}`;
};

export default function AdminDashboard() {
  const { loading, error, data } = useQuery(GET_DASHBOARD_DATA);
  const [dashboardData, setDashboardData] = useState({
    totalUsers: 0,
    totalProviders: 0,
    totalServices: 0,
    totalBookings: 0,
    bookings: []
  });

  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (data) {
      setDashboardData({
        totalUsers: data.getCounts.totalUsers,
        totalProviders: data.getCounts.totalProviders,
        totalServices: data.getCounts.totalServices,
        totalBookings: data.getCounts.totalBookings,
        bookings: data.getBookingHistory.map((booking, index) => ({
          id: formatBookingId(index), // Use index to create sequential IDs
          service: booking.booking_services.map(service => service.service_id.service_name).join(", "),
          date: new Date(parseInt(booking.created_at)).toLocaleString(),
          status: booking.status === 'pending' ? 'Pending' : 'Completed'
        }))
      });
    }
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const stats = [
    { title: "Total Users", value: dashboardData.totalUsers },
    { title: "Total Providers", value: dashboardData.totalProviders },
    { title: "Total Services", value: dashboardData.totalServices },
    { title: "Total Booking", value: dashboardData.totalBookings },
  ];

  const managementButtons = [
    { title: "Manage Users", path: "/editusers" },
    { title: "Manage Providers", path: "/manageproviders" },
    { title: "Manage Services", path: "#" },
    { title: "Manage Categories", path: "#" }
  ];

  const handleButtonClick = (path) => {
    navigate(path); // Navigate to the given path
  };

  return (
    <Layout>
      <div className="ud-dashboard-container">
        <div className="ud-stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="ud-stat-box">
              <h3 className="ud-stat-title">{stat.title}</h3>
              <p className="ud-stat-value">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="ud-management-grid">
          {managementButtons.map((button, index) => (
            <button
              key={index}
              className="ud-management-button"
              onClick={() => handleButtonClick(button.path)}
            >
              {button.title}
            </button>
          ))}
        </div>

        <div className="ud-booking-history">
          <h2 className="ud-booking-header">Booking History</h2>
          <div className="overflow-x-auto">
            <table className="ud-booking-table">
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
                {dashboardData.bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.id}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`ud-status-badge ${booking.status === "Pending" ? "ud-status-pending" : "ud-status-completed"}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <button className="ud-view-details-btn">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
