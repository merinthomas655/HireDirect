import React from "react";
import Layout from "../components/Layout";
import "../css/booking-confirmation.css";
import { useLocation } from "react-router-dom";
  import { useNavigate } from 'react-router-dom';

function BookingConfirmation() {
  const navigate = useNavigate(); // Initialize navigate

  const provider_id = useLocation();
  const providername = provider_id.state?.profilename;
  const amount = provider_id.state?.totalAmount;
  const gstAmount = provider_id.state?.gstAmount;
  const totalAmount = provider_id.state?.finalAmount;

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
                Your booking with {providername} has been confirmed
                </h2>
                {/* <span className="time-date">15-09-2024 / 11:18 PM</span> */}
              </div>
            </div>
          </div>
          <div className="payment-summary-wrapper">
            <h2 className="payment-s-title">Payment Summary</h2>
            <div className="payment-details-wrapper">
              <div className="payment-details-single-date">
                <div className="title">Total</div>
                <div className="cad-amount">CAD {amount}</div>
              </div>

              <div className="payment-details-single-date">
                <div className="title">GST (10%)</div>
                <div className="cad-amount">CAD {gstAmount}</div>
              </div>

              {/* <div className="payment-details-single-date">
                <div className="title">
                  US Credit <br />
                  (Balance Rs.0)
                </div>
                <div className="cad-amount">CAD 20</div>
              </div> */}

              <div className="payment-details-single-date">
                <div className="title">Total Amount</div>
                <div className="cad-amount total">CAD {totalAmount}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="booking-confirmation-bottom-btn">
        <button onClick={() => navigate("/userdashboard")}>View Dashboard</button>
        <button onClick={() => navigate("/HomePage")}>Continue Browsing</button>
        </div>
      </div>
    </Layout>
  );
}

export default BookingConfirmation;
