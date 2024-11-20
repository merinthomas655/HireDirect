import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_USER_BOOKING_HISTORY, GET_BOOKING_WITH_REVIEW } from '../graphql/queries';
import ViewDetails from './ViewDetails';
import "../css/bookingtable.css";

const BookingTable = () => {
    const userId = JSON.parse(sessionStorage.getItem('usersession'))._id;
    const { loading, error, data } = useQuery(FETCH_USER_BOOKING_HISTORY, {
        variables: { userId },
      });
    const [bookings, setBookings] = useState([]);
    const [selectedBookingId, setSelectedBookingId] = useState(null);
    useEffect(() => {
        if (data && data.fetchUserBookingHistory) {
          setBookings(data.fetchUserBookingHistory);
        }
    }, [data]);
    const handleViewDetails = (bookingId) => {
      setSelectedBookingId(bookingId);
    };
  
    const handleCloseModal = () => {
      setSelectedBookingId(null);
    };
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    return (
    <div className="history-section">
      <h2>Booking History</h2>
      <div className="table-responsive">
        <table className="history-table">
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
                {bookings.length > 0 ? (
                bookings.map((booking) => (
                    <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.booking_services[0]?.service_id?.service_name || 'N/A'}</td>
                    <td>{new Date(parseInt(booking.created_at)).toLocaleString()}</td>
                    <td>{booking.status}</td>
                    <td><button
                      className="details-button"
                      onClick={() => handleViewDetails(booking._id)}
                    >
                      View Details
                    </button></td>
                    </tr>
                ))
                ) : (
                <tr>
                    <td colSpan="5">No booking history available</td>
                </tr>
                )}
            </tbody>
          </table>
        </div>
        {selectedBookingId && (
        <ViewDetails
          bookingId={selectedBookingId}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default BookingTable;
