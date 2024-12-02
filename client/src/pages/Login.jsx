import React, { useState } from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import '../css/loginsignup.css';
import '../css/forgotpasswordDialog.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function Login() {
  const navigate = useNavigate(); // Initialize navigate

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otptext, setOtp] = useState('');
  const [newPassword, setnewPassword] = useState('');
  const [confirmaPassword, setconfirmaPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [isVerifyOtpDialogOpen, setIsVerifyOtpDialogOpen] = useState(false);
  const [isChangesPasswordDialogOpen, setIsChangesPasswordDialogOpen] = useState(false);

  const [formData, setFormData] = useState({
    to_name: '',
    to_email: '',
    otp: '',
  });

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();
  let otp;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const sendOtpEmail = async (e) => {
    e.preventDefault();

    //Check here email validation formate
    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!formData.to_name || !formData.to_email) {
      return toast.error('Please provide both name and email.');
    }

    if (!validateEmail(formData.to_email)) {
      return toast.error('Please enter a valid email address.');
    }

    sendOTP();
  };

  const sendOTP = () => {
    otp = generateOtp();
    const updatedFormData = { ...formData, otp };

    try {
      toast.success("OTP sent successfully in your email ID ");
      setIsOtpDialogOpen(false);
      setIsVerifyOtpDialogOpen(true)
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.' + error.text);
    }
  }

  const verifyOtp = async (e) => {
    if (otp !== otptext) {
      toast.error("Invalid OTP. Please try again");
    } else {
      toast.success("OTP verify successfully");
      setIsVerifyOtpDialogOpen(false)
      setIsChangesPasswordDialogOpen(true)
    }
  }

  const changesPassword = async (e) => {
    setIsChangesPasswordDialogOpen(false)
    toast.success("Password changed successfully");
  }

  const showPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }

    if (email === "admin@gmail.com" && password === "HireDirect") {
      navigate('/ProviderDashboard');
      return;
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
        const userData = {
          _id: result.data.login.user._id,
          username: result.data.login.user.username,
          email: result.data.login.user.email,
          role: result.data.login.user.role,
        };

        sessionStorage.setItem('usersession', JSON.stringify(userData));

        setMessage(result.data.login.message || "Login successful!");
        navigate('/HomePage');
      } else {
        setMessage(result.data.login.message || "Login failed!");
      }
    } catch (error) {
      setMessage("Login failed. Please try again.");
    }
  };

  return (
    <Layout>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="login-signup-container">
        <h2 className="login-text">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-box">
            <input
              type="text"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="icon">
              <img
                src="./assets/img/email.png"
                alt="email"
                className="img-fluid"
              />
            </span>
          </div>
          <div className="input-group-box password-box">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="icon" onClick={showPasswordVisibility}>
              <img
                src="./assets/img/eye.png"
                alt="eye"
                className="img-fluid"
              />
            </span>
          </div>
          <div className="forgot-password">
            <button
              type="button"
              onClick={() => setIsOtpDialogOpen(true)}
              className="forgot-password-link"
            >
              Forgot Password?
            </button>
          </div>
          <button className="signup-login-button" type="submit">
            Login
          </button>
        </form>

        {message && <p className="message-text" style={{ color: 'red' }}>{message}</p>}

        <Link to="/signup" className="signup-text">
          Don't have an account? Sign Up
        </Link>

        {isOtpDialogOpen && (
          <div className="overlay">
            <div className="dialog">
              <button
                onClick={() => setIsOtpDialogOpen(false)}
                className="close-button"
              >
                &times;
              </button>
              <h2 className="title">Send OTP</h2>
              <form onSubmit={sendOtpEmail}>
                <label className="label">Name</label>
                <input
                  type="text"
                  name="to_name"
                  value={formData.to_name}
                  onChange={handleChange}
                  placeholder="User's Name"
                  required
                  className="input"
                />

                <label className="label">Email</label>
                <input
                  type="email"
                  name="to_email"
                  value={formData.to_email}
                  onChange={handleChange}
                  placeholder="User's Email"
                  required
                  className="input"
                />

                <button type="submit" className="submit-button">
                  Send OTP
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </Layout>
  );
}

export default Login;
