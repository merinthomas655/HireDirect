import React, { useState } from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import '../css/loginsignup.css'; 

function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const showPasswordVisibility = () => {
    setShowPassword(!showPassword);
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

  const query = `
    mutation {
      login(email: "${email}", password: "${password}") {
        user {
          _id
          username
          email
          role
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
      if (result.data.login.success) {
        setMessage(result.data.login.message || "Login successful!");
      } else {
        setMessage(result.data.login.message || "Login failed!");
      }
    } catch (error) {
      setMessage("Login fail please try again.");
    }
  };

  return (
    <Layout>
      <div className="login-signup-container">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit}>

        <div className="input-group-box">
        <input type="text" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <span className="icon">
            <img
              src="./assets/img/email.png"
              alt="user.png"
              className="img-fluid"
            />
          </span>
        </div>
        <div className="input-group-box password-box">
          <input
            type="password"
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
        <div className="forgot-password">
          <Link to="/">Forgot Password?</Link>
        </div>
        <button className="signup-login-button" type="submit">
          Login
        </button>
        </form>

        {message && <p className="message-text" style={{ color: 'red' }}>{message}</p>}

        <Link to="/signup" className="signup-text">
          Don't have an account? Sign Up
        </Link>
      </div>
    </Layout>
  );
}
export default Login;
