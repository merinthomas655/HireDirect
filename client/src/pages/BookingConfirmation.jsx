import React from "react";
import Layout from "../components/Layout";
import "../css/booking-confirmation.css";

function BookingConfirmation() {
  return (
    <Layout>
      <div className="booking-confirmation-main">
        <div className="booking-confirmation-wrapper">
          <div className="booking-c-box">
            <div className="booking-c-image-box">
              <img
                src="/assets/img/booking-confirmed.png"
                alt="booking-confirmed.png"
              />
            </div>
            <div className="booking-c-info">
              <div className="booking-c-user-icon-box">
                <img
                  src="/assets/img/person-profile-icon.png"
                  alt="person-profile-icon.png"
                />
              </div>
              <div className="booking-c-details">
                <h2>
                  Your booking with [Professional Name] has been confirmed
                </h2>
                <span className="time-date">15-09-2024 / 11:18 PM</span>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </Layout>
  );
}

export default BookingConfirmation;
