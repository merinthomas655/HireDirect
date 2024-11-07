import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import "../css/booking.css";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { useLocation } from "react-router-dom";

// Highlight location icon
const customIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function LocationSearch({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 13); 
    }
  }, [location, map]);
  return null;
}

function Booking() {
  const routerdom = useLocation();
  const services = routerdom.state?.services || []; // Retrieve services from state

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // Store selected services as objects
  const [location, setLocation] = useState(null);
  const [searchInput, setSearchInput] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 
  const dropdownRef = useRef(null);

  // Create options from services data
  const options = services.map((service, index) => ({
    id: index + 1,
    label: service.service_name,
    value: service, // Store the entire service object
  }));

  const handleToggle = () => setIsOpen((prev) => !prev);

  // Update selected options by adding/removing the full service object
  const handleOptionChange = (service) => {
    setSelectedOptions((prev) =>
      prev.some((s) => s.service_name === service.service_name)
        ? prev.filter((s) => s.service_name !== service.service_name)
        : [...prev, service]
    );
  };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const renderSelectedLabels = () => {
    if (selectedOptions.length === 0) return "Select Service";
    if (selectedOptions.length === 1) return selectedOptions[0].service_name;
    if (selectedOptions.length === 2) return selectedOptions.map(s => s.service_name).join(", ");
    return `${selectedOptions.slice(0, 2).map(s => s.service_name).join(", ")} (+${
      selectedOptions.length - 2
    })`;
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSearch = async () => {
    const nominatimURL = `https://nominatim.openstreetmap.org/search?q=${searchInput}&format=json&addressdetails=1`;

    try {
      const response = await axios.get(nominatimURL);
      if (response.data && response.data.length > 0) {
        const lat = response.data[0].lat;
        const lon = response.data[0].lon;
        setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
        setErrorMessage('');
      } else {
        setErrorMessage('Location not found. Please try another search.');
      }
    } catch (error) {
      console.error('Error fetching location data:', error);
      setErrorMessage('Error fetching location data.');
    }
  };

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
                            id={`opt${index}`}
                            checked={selectedOptions.some(s => s.service_name === option.value.service_name)}
                            onChange={() => handleOptionChange(option.value)}
                          />
                          <label htmlFor={`opt${index}`}>{option.label}</label>
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

            {/* Map with search bar */}
            <div className="map-container" style={{ padding: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="Search for a location"
                  style={{ padding: '10px', width: '300px', marginRight: '10px' }}
                />
                <button onClick={handleSearch} style={{ padding: '10px 20px' }}>
                  Search
                </button>
              </div>

              {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

              <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '350px', width: '100%' }}>
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {location && <Marker position={[location.lat, location.lng]} icon={customIcon} />}
                <LocationSearch location={location} />
              </MapContainer>
            </div>

            <div className="selected-service-box-desktop">
              <h3 className="selected-service-title">Selected Services:</h3>
              <div className="selected-slote-price-wrapper">
                {selectedOptions.map((service, index) => (
                  <div key={index} className="selected-slote-price">
                    <div className="selected-slote-price-title">
                      {service.service_name} ({service.description}, ${service.pricing})
                    </div>
                    <div className="selected-slote-price-filed">
                      <div className="booking-form-field">
                        <input type="time" placeholder="Available Slots" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="payment-box">
          <h3 className="payment-title">Payment</h3>
          <div className="booking-form-field select-filed">
            <select name="payment-type" id="" defaultValue="Payment opt">
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
