import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { MODIFY_USER_PROFILE } from '../graphql/queries';
import "../css/profilemanagement.css";

const ProfileManagement = ({profile}) => {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.phone_number);
  const [street, setStreet] = useState(profile.address?.street || '');
  const [city, setCity] = useState(profile.address?.city || '');
  const [state, setState] = useState(profile.address?.state || '');
  const [zipCode, setZipCode] = useState(profile.address?.zip_code || '');
  const [password, setPassword] = useState('');
  const [modifyUserProfile, { loading, error }] = useMutation(MODIFY_USER_PROFILE, {
    onCompleted: () => alert('Profile updated successfully!'),
    onError: (err) => alert(`Error updating profile: ${err.message}`),
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    modifyUserProfile({
      variables: {
        id: profile._id,
        username,
        email,
        phone_number: phoneNumber,
        address: { street, city, state, zip_code: zipCode },
        password,
      },
    });
  };
  return (
    <div className="profile-section">
      <h2>Profile Management</h2>
      <div className="profile-avatar">
        <img src="../assets/img/user.png" alt="Profile Avatar" />
      </div>
      <form onSubmit={handleSubmit} className="profile-form">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input
          type="text"
          placeholder="Street"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          type="text"
          placeholder="Zip Code"
          value={zipCode}
          onChange={(e) => setZipCode(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={loading} className="profile-save-button">
          Save Changes
        </button>
      </form>
      {error && <p className="error-message">{error.message}</p>}
    </div>
  );
};

export default ProfileManagement;
