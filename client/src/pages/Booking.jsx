import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import "../css/booking.css";

function Booking() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const dropdownRef = useRef(null);

  const options = [
    { id: 1, label: "Option 1" },
    { id: 2, label: "Option 2" },
    { id: 3, label: "Option 3" },
  ];
  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOptionChange = (option) => {
    setSelectedOptions((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const renderSelectedLabels = () => {
    if (selectedOptions.length === 0) return "Select Name";
    if (selectedOptions.length === 1) return selectedOptions[0];
    if (selectedOptions.length === 2) return selectedOptions.join(", ");
    return `${selectedOptions.slice(0, 2).join(", ")} (+${
      selectedOptions.length - 2
    })`;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <Layout>
      <div className="booking-wrapper">
        <h2 className="booking-title">Booking</h2>
        <div className="booking-container">
          <h3 className="booking-details-title">Booking details</h3>
          <div className="form-box">
            <div className="two-form-filed">
              <div
                ref={dropdownRef}
                className="dropdown grow-box desktop-margin"
              >
                <div className="dropdown-header" onClick={handleToggle}>
                  {renderSelectedLabels()}
                </div>
                {isOpen && (
                  <div className="dropdown-menu">
                    {options.map((option, index) => (
                      <div key={option.id} className="dropdown-option">
                        <div className="form-group">
                          <input
                            type="checkbox"
                            id={"opt" + index}
                            checked={selectedOptions.includes(option.label)}
                            onChange={() => handleOptionChange(option.label)}
                          />
                          <label htmlFor={"opt" + index}>{option.label}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="booking-form-field grow-box desktop-margin">
                <input type="date" id="date" placeholder="Available Date" />
              </div>
            </div>
            <div className="mobile-shown-box">
              <div className="booking-form-field">
                <input type="time" placeholder="Available Slots" />
              </div>
              <div className="booking-form-field currency-input">
                <input type="number" placeholder="Price" />
              </div>
            </div>
            <div className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10221171.22506629!2d-115.01853681319143!3d58.268952913515065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4b0d03d337cc6ad9%3A0x9968b72aa2438fa5!2sCanada!5e0!3m2!1sen!2sin!4v1728115201743!5m2!1sen!2sin"
                width="100%"
                height="350"
                style={{ border: 0, borderRadius: "4px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="address-box">
                <div className="booking-form-field address-input">
                  <input type="text" placeholder="Address" />
                </div>
              </div>
            </div>
            <div className="selected-service-box-desktop">
              <h3 className="selected-service-title">Selected Service:</h3>
              <div className="selected-slote-price-wrapper">
                <div className="selected-slote-price">
                  <div className="selected-slote-price-title">
                    Service 1 (Description , Price)
                  </div>
                  <div className="selected-slote-price-filed">
                    <div className="booking-form-field">
                      <input type="time" placeholder="Available Slots" />
                    </div>
                  </div>
                </div>
                <div className="selected-slote-price">
                  <div className="selected-slote-price-title">
                    Service 1 (Description , Price)
                  </div>
                  <div className="selected-slote-price-filed">
                    <div className="booking-form-field">
                      <input type="time" placeholder="Available Slots" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="payment-box">
          <h3 className="payment-title">Payment</h3>
          <div className="booking-form-field select-filed">
            <select name="paymet-type" id="" defaultValue="Payment opt">
              <option value="Payment opt" disabled hidden>
                Payment Options
              </option>
              <option value="online">Online</option>
              <option value="test">test</option>
            </select>
          </div>
        </div>
        <div className="confirm-booking-btn-wrapper">
          <button className="confirm-booking-btn">Confirm Booking</button>
        </div>
      </div>
    </Layout>
  );
}

export default Booking;
