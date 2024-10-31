import React from 'react'; 

import Layout from '../components/Layout';
import "../css/userdashboard.css";
const UserDashboard = () => {
  return (
    <Layout>
      <div className="dashboard-container">
        <div className="dashboard-stats">
          <div className="stat-item">
            <h2>Total Bookings</h2>
            <p>35</p>
          </div>
          <div className="stat-item">
            <h2>Upcoming Bookings</h2>
            <p>20</p>
          </div>
        </div>
        <div className="profile-section">
          <h2>Profile Management</h2>
          <div className="profile-details">
            <div className="profile-avatar"></div>
            <div className="profile-fields">
              <input type="text" placeholder="Name" className="input-name" />
              <input type="email" placeholder="Email" className="input-email" />
              <input type="tel" placeholder="Phone" className="input-phone" />
              <input type="text" placeholder="Address" className="input-address" />
            </div>
            <button className="profile-save-button">Save Changes</button>
          </div>
        </div>
        <div className="history-section">
          <h2>Booking History</h2>
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
    </Layout>
  );
};

export default UserDashboard;
