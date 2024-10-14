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
          <div className="payment-summary-wrapper">
            <h2 className="payment-s-title">Payment Summary</h2>
            <div className="payment-details-wrapper">
              <div className="payment-details-single-date">
                <div className="title">Total</div>
                <div className="cad-amount">CAD 500</div>
              </div>

              <div className="payment-details-single-date">
                <div className="title">GST (10%)</div>
                <div className="cad-amount">CAD 90</div>
              </div>

              <div className="payment-details-single-date">
                <div className="title">
                  US Credit <br />
                  (Balance Rs.0)
                </div>
                <div className="cad-amount">CAD 20</div>
              </div>

              <div className="payment-details-single-date">
                <div className="title">Total Amount</div>
                <div className="cad-amount total">CAD 570</div>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-confirmation-bottom-btn">
          <button>View Dashboard</button>
          <button>Continue Browsing</button>
        </div>
      </div>
    </Layout>
  );
}

export default BookingConfirmation;
