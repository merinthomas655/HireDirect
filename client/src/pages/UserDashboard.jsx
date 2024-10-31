import React from 'react'; 

import Layout from '../components/Layout';
import ProfileManagement from '../components/ProfileManagement';
import BookingTable from '../components/BookingTable';
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
        <ProfileManagement/>
        <BookingTable/>
      </div>
    </Layout>
  );
};

export default UserDashboard;
