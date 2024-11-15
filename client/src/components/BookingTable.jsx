import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { FETCH_USER_BOOKING_HISTORY } from '../graphql/queries';
import "../css/userdashboard.css";

const BookingTable = () => {
    const [bookings, setBookings] = useState([]);
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
            <tr>
                <td>#B10000</td>
                <td>Pipe Repair</td>
                <td>Sep 14, 2024 01:40 pm</td>
                <td>Pending</td>
                <td><button className="details-button">View Details</button></td>
            </tr>
            <tr>
                <td>#B10001</td>
                <td>Drain Cleaning</td>
                <td>Sep 14, 2024 01:40 pm</td>
                <td>Completed</td>
                <td><button className="details-button">View Details</button></td>
            </tr>
            <tr>
                <td>#B10002</td>
                <td>Toilet Installation</td>
                <td>Sep 14, 2024 01:40 pm</td>
                <td>Pending</td>
                <td><button className="details-button">View Details</button></td>
            </tr>
            <tr>
                <td>#B10003</td>
                <td>Leak Detection</td>
                <td>Sep 14, 2024 01:40 pm</td>
                <td>Completed</td>
                <td><button className="details-button">View Details</button></td>
            </tr>
            </tbody>
        </table>
        </div>
    </div>
  );
};

export default BookingTable;
