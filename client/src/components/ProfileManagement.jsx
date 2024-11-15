import React from 'react';
import "../css/userdashboard.css"; 

const ProfileManagement = ({profile}) => {
  const [username, setUsername] = useState(profile.username);
  const [email, setEmail] = useState(profile.email);
  const [phoneNumber, setPhoneNumber] = useState(profile.phone_number);
  const [street, setStreet] = useState(profile.address?.street || '');
  const [city, setCity] = useState(profile.address?.city || '');
  const [state, setState] = useState(profile.address?.state || '');
  const [zipCode, setZipCode] = useState(profile.address?.zip_code || '');
  const [password, setPassword] = useState('');
  return (
    <div className="profile-section">
      <h2>Profile Management</h2>
      <div className="profile-details">
        <div className="profile-avatar"></div>
        <div className="profile-fields">
          <input type="text" placeholder="Name" className="input-name" />
          <input type="email" placeholder="Email" className="input-email" />
          <input type="tel" placeholder="Phone" className="input-phone" />
          <input type="text" placeholder="Address" className="input-address" />
        </div>
        <button className="profile-save-button">Save Changes</button>
      </div>
    </div>
  );
};

export default ProfileManagement;
