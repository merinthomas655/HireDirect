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
           
            
          </div>
        </div>
     
      </div>
    </Layout>
  );
}

export default Booking;
