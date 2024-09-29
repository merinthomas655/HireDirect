import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import '../css/loginsignup.css';

function Signup() {
  const navigate = useNavigate(); // Initialize navigate

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usertype, setUsertype] = useState('User');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setConfirmShowPassword] = useState(false);


  const showPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const showConfirmPasswordVisibility = () => {
    setConfirmShowPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //Check here email validation formate
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      return setMessage('Please enter a valid email address.');
    }

    if (password.length < 7) {
      return setMessage('Password length shoude be more then 6 digit.');
    }

    if (password !== confirmPassword) {
      return setMessage("Please check your Passwords do not match.");
    }

    const query = `
      mutation {
        signup(name: "${name}", email: "${email}", password: "${password}", usertype: "${usertype}") {
          user {
            id
            name
            email
            usertype
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
      if (result.data.signup.success) {
        setMessage(result.data.signup.message || "Signup successful!");
        navigate('/login');
      } else {
        setMessage(result.data.signup.message || "Signup failed!");
      }
    } catch (error) {
      setMessage("Signup fail please try again.");
    }
  };

  return (
    <Layout>
      <div className="login-signup-container">
        <h2 className="login-text">Sign Up</h2>

        <form onSubmit={handleSubmit}>

          <div className="input-group-box">
            <input type="text" placeholder="User Name" required value={name} onChange={(e) => setName(e.target.value)} />
            <span className="icon">
              <img
                src="./assets/img/user.png"
                alt="user.png"
                className="img-fluid"
              />
            </span>
          </div>

          <div className="input-group-box">
            <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <span className="icon">
              <img
                src="./assets/img/email.png"
                alt="email.png"
                className="img-fluid"
              />
            </span>
          </div>

          <div className="input-group-box password-box">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required value={password} onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon" onClick={showPasswordVisibility}>
              <img
                src="./assets/img/eye.png"
                alt="eye.png"
                className="img-fluid"
              />
            </span>
          </div>

          <div className="input-group-box password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confimPassowrd"
              placeholder="Confirm Password"
              required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span className="icon" onClick={showConfirmPasswordVisibility}>
            <img
                src="./assets/img/eye.png"
                alt="eye.png"
                className="img-fluid"
              />
            </span>
          </div>

          <div className="input-group-box select-box">
            <select name="" id="" placeholder="Select user"
              value={usertype}
              onChange={(e) => setUsertype(e.target.value)}>
              <option value="sasa">User</option>
              <option value="sasa">User1</option>
              <option value="sasa">User2</option>
            </select>
            <span className="icon">
              <img
                src="./assets/img/dropdown.png"
                alt="dropdown.png"
                className="img-fluid"
              />
            </span>
          </div>
          <button className="signup-login-button" type="submit">
            Sign Up
          </button>
        </form>

        {message && <p className="message-text" style={{ color: 'red' }}>{message}</p>}

        <Link to="/login" className="signup-text">
          Already have an account? Login
        </Link>
      </div>
    </Layout>
  );
}
export default Signup;
