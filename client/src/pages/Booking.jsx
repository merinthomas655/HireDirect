import React, { useState, useEffect, useRef } from "react";
import Layout from "../components/Layout";
import "../css/booking.css";
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate(); // Initialize navigate

  const handleState = useLocation();
  const services = handleState.state?.services || []; // Retrieve services from state
  const providername = handleState.state?.providername;
  const providerId = handleState.state?.providerId;
  let slot_id = null;

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]); // Store selected services as objects
  const [location, setLocation] = useState(null);
  const [searchInput, setSearchInput] = useState('');
  const [availableSlot, setAvailableSlot] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [message, setMessage] = useState('');
  const [bookingServices, setBookingServices] = useState([]); // Make bookingServices stateful



  const dropdownRef = useRef(null);

  // const bookingServices = [
  //   {
  //     service_id: "66fc9e6cfb1f4513f03b13e0",
  //     slot_id: slot_id,
  //     price: 200,
  //   },
  //   {
  //     service_id: "66fc9e6cfb1f4513f03b13e0",
  //     slot_id: "66fc9e6cfb1f4513f03b13e0",
  //     price: 300,
  //   },
  // ];

  // Fetch available slots in useEffect
  useEffect(() => {
    const fetchAvailableSlots = async () => {
      const query = `
          mutation {
            availableslot(provider_id: "${providerId}") {
              availableSlot {
                _id
                start_time
                end_time
              }
              message
              success
            }
          }
        `;

      try {
        const response = await fetch('http://localhost:5000/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query }),
        });
        const result = await response.json();
        if (result.data.availableslot.success) {
          const availableSlot = result.data.availableslot.availableSlot;
          slot_id = availableSlot._id;
          setAvailableSlot(availableSlot);
        } else {
          console.log(result.data.login.message || "Not found provider ID")
        }
      } catch (error) {
        console.log("Not found provider ID");
      }
    };

    fetchAvailableSlots();
  }, [providerId]);

  // Create options from services data
  const options = services.map((service, index) => ({
    id: index + 1,
    label: service.service_name,
    value: service, // Store the entire service object
  }));

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleConfirmBooking = async () => {

    const gstRate = 0.10; // 10% GST
    const gstAmount = totalAmount * gstRate;
    const finalAmount = totalAmount + gstAmount;

    if (totalAmount<= 0) {
      setMessage("Please select provider from list");
      return
    }

    const userSession = sessionStorage.getItem('usersession');
    let userID = null;

    if (userSession) {
      const userData = JSON.parse(userSession);
      userID = userData._id;
    } else {
      setMessage("No user session found.");
      return
    }

 const query = `
  mutation {
    createPaymentIntent(
      amount: ${99},
      booking: {
        user_id: "${userID}",
        provider_id: "${providerId}",
        total_price: ${finalAmount},
        status: "pending",
        booking_services: [
          ${bookingServices.map(service => `{
            service_id: "${service.service_id}",
            slot_id: "${service.slot_id}",
            price: ${service.price}
          }`).join(",")}
        ]
      }
    ) {
      payment {
        clientSecret
      }
      message
      success
    }
  }
`;


    try {
      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      if (result.data.createPaymentIntent.success) {
        navigate(`/bookingconfirmation`, { state: { totalAmount: totalAmount, profilename: providername, gstAmount: gstAmount,finalAmount: finalAmount } });

      } else {
        setMessage(result.data.createPaymentIntent.message);
      }
    } catch (error) {
      setMessage("Payment failed, please try again."+error);
    }
  };

  const updateTotalAmount = (selectedServices) => {
    const amount = selectedServices.reduce((total, service) => total + (service.pricing || 0), 0);
    setTotalAmount(amount);
  };

  // Update selected options by adding/removing the full service object
  const handleOptionChange = (service) => {
  setSelectedOptions((prev) => {
    // Check if the service is already selected
    const isSelected = prev.some((s) => s.service_name === service.service_name);

    // Update the bookingServices array
    setBookingServices((prevBookingServices) => {
      if (isSelected) {
        // Remove the service from bookingServices
        return prevBookingServices.filter((s) => s.service_id !== service._id);
      } else {
        // Add the service to bookingServices only if it doesn't already exist
        const isAlreadyAdded = prevBookingServices.some((s) => s.service_id === service._id);
        if (!isAlreadyAdded) {
          return [
            ...prevBookingServices,
            {
              service_id: service._id,
              slot_id: availableSlot?._id || null, // Use available slot ID if available
              price: service.pricing || 0, // Add price of the service
            },
          ];
        }
        return prevBookingServices; // Return unchanged if already exists
      }
    });

    // Update selected options
    const updatedSelection = isSelected
      ? prev.filter((s) => s.service_name !== service.service_name) // Remove if selected
      : [...prev, service]; // Add if not selected

    updateTotalAmount(updatedSelection); // Update the total amount
    return updatedSelection;
  });
};

  
  // const handleOptionChange = (service) => {
  //   setSelectedOptions((prev) => {
  //     const updatedSelection = prev.some((s) => s.service_name === service.service_name)
  //       ? prev.filter((s) => s.service_name !== service.service_name)
  //       : [...prev, service];

  //     updateTotalAmount(updatedSelection);
  //     return updatedSelection;
  //   });
  // };

  const handleOutsideClick = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  const renderSelectedLabels = () => {
    if (selectedOptions.length === 0) return "Select Service";
    if (selectedOptions.length === 1) return selectedOptions[0].service_name;
    if (selectedOptions.length === 2) return selectedOptions.map(s => s.service_name).join(", ");
    return `${selectedOptions.slice(0, 2).map(s => s.service_name).join(", ")} (+${selectedOptions.length - 2
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
          <button className="confirm-booking-btn" onClick={handleConfirmBooking}>Confirm Booking</button>
        </div>
        {message && <p className="message-text" style={{ color: 'red' }}>{message}</p>}

      </div>
    </Layout>
  );
}

export default Booking;
