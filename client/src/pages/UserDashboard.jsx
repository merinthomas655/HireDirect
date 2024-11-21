import React, { useContext, useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER_PROFILE, GET_BOOKING_COUNTS } from "../graphql/queries";
import Layout from "../components/Layout";
import ProfileManagement from "../components/ProfileManagement";
import BookingTable from "../components/BookingTable";
import ThemeContext from "../context/ThemeContext"; // Import ThemeContext
import "../css/profilemanagement.css";
import "../css/userdashboard.css";

const UserDashboard = () => {
  const userId = JSON.parse(sessionStorage.getItem("usersession"))._id;
  const [profile, setProfile] = useState(null);
  const [bookingCounts, setBookingCounts] = useState({ totalBookings: 0, upcomingBookings: 0 });
  
  const { theme, toggleTheme } = useContext(ThemeContext); // Access theme and toggle function

  const { loading: profileLoading, error: profileError, data: profileData } = useQuery(FETCH_USER_PROFILE, {
    variables: { id: userId },
  });
  const { loading: countsLoading, error: countsError, data: countsData } = useQuery(GET_BOOKING_COUNTS, {
    variables: { userId },
  });

  useEffect(() => {
    if (profileData && profileData.fetchUserProfile) {
      setProfile(profileData.fetchUserProfile);
    }
    if (countsData && countsData.getBookingCounts) {
      setBookingCounts(countsData.getBookingCounts);
    }
  }, [profileData, countsData]);

  if (profileLoading || countsLoading) return <p>Loading...</p>;
  if (profileError) return <p>Error: {profileError.message}</p>;
  if (countsError) return <p>Error: {countsError.message}</p>;

  return (
    <Layout>
      <div className={`dashboard-container ${theme}`}>
        <header className="dashboard-header">
          <h1>{profile?.username}'s Dashboard</h1>
          <button onClick={toggleTheme} className="theme-toggle-button">
            Switch to {theme === "light" ? "Dark" : "Light"} Mode
          </button>
        </header>
        <div className="dashboard-stats">
          <div className="stat-item">
            <h2>Total Bookings</h2>
            <p>{bookingCounts.totalBookings}</p>
          </div>
          <div className="stat-item">
            <h2>Upcoming Bookings</h2>
            <p>{bookingCounts.upcomingBookings}</p>
          </div>
        </div>
        <div>
          {profile && <ProfileManagement profile={profile} />}
        </div>
        <BookingTable />
      </div>
    </Layout>
  );
};

export default UserDashboard;
