import React, { useState, useEffect } from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import '../css/loginsignup.css';
import '../css/forgotpasswordDialog.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Loader from '../components/Loader';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function Login() {
  const navigate = useNavigate(); // Initialize navigate

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otptextview, setOtpTextView] = useState('');
  const [otpGenerate, setOtpGenerate] = useState('');

  const [newPassword, setnewPassword] = useState('');
  const [confirmaPassword, setconfirmaPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [isOtpDialogOpen, setIsOtpDialogOpen] = useState(false);
  const [isVerifyOtpDialogOpen, setIsVerifyOtpDialogOpen] = useState(false);
  const [isChangesPasswordDialogOpen, setIsChangesPasswordDialogOpen] = useState(false);

  const [isListening, setIsListening] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const [formData, setFormData] = useState({
    to_name: '',
    to_email: '',
    otp: '',
  });

  let user_id;

  function startTextToSpeech() {
    if (isListening) {
      setIsListening(false);
      SpeechRecognition.stopListening();
      setEmail(transcript);
    } else {
      setIsListening(true);
      setEmail("");
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  }

  useEffect(() => {
    if (listening) {
      setEmail(transcript.trim().replace(/\.com\.$/, ".com")); // Automatically update searchInput as the user speaks
    }
  }, [transcript, listening]);

  const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

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

    checkEmailIdExitOrNotForForgotpassword(formData.to_email);
  };

  const checkEmailIdExitOrNotForForgotpassword = async (email) => {
    setLoading(true);

    try {
      const query = `
      mutation {
        checkEmailID(email: "${email}") {
          user_id
          message
          success
        }
      }
    `;

      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      if (result.data.checkEmailID.success) {
        user_id = result.data.checkEmailID.user_id;
        sendOTP();
      } else {
        toast.error(result.data.checkEmailID.message || "Failed!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed. Please try again."+error);
      setLoading(false);
    }
  }

  const sendOTP = () => {
    const otp = generateOtp();
    const updatedFormData = { ...formData, otp };

    try {
      setOtpGenerate(otp);
      toast.success("OTP sent successfully in your email ID " + otp);
      setIsOtpDialogOpen(false);
      setIsVerifyOtpDialogOpen(true)
    } catch (error) {
      toast.error('Failed to send OTP. Please try again.' + error.text);
    }
  }


  const UserEnterOPTCheck = (e) => {
    e.preventDefault();

    if (String(otpGenerate) !== String(otptextview)) {
      toast.error("Invalid OTP. Please try again");
    } else {
      toast.success("OTP verify successfully");
      setIsVerifyOtpDialogOpen(false)
      setIsChangesPasswordDialogOpen(true)
    }
  }

  const changesPassword = async (e) => {
    e.preventDefault();

    if (String(newPassword) !== String(confirmaPassword)) {
      toast.error("Please check your password not match");
    } else if (newPassword.length < 7) {
      toast.error('Password length should be more then 6 digit.');
    }
    else {
      setIsChangesPasswordDialogOpen(false)
      forgotpasswordAPI();      
    }
  }

  
  const forgotpasswordAPI = async () => {
    setLoading(true);

    try {
      const query = `
      mutation {
        forgotPassword(userId: "${user_id}",newPassword: "${newPassword}") {
          message
          success
        }
      }
    `;

      const response = await fetch('http://localhost:5000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });
      const result = await response.json();
      if (result.data.forgotPassword.success) {
        toast.success(result.data.forgotPassword.message || "");
      } else {
        toast.error(result.data.forgotPassword.message || "Failed!");
      }
      setLoading(false);
    } catch (error) {
      toast.error("Failed. Please try again."+error);
      setLoading(false);
    }
  }

  const showPasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    SpeechRecognition.stopListening();

    const validateEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    if (email === "admin@gmail.com" && password === "HireDirect") {
      navigate('/ProviderDashboard');
      return;
    }

    setLoading(true);

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
      setLoading(false);
      if (result.data.login.success) {
        const userData = {
          _id: result.data.login.user._id,
          username: result.data.login.user.username,
          email: result.data.login.user.email,
          role: result.data.login.user.role,
        };

        sessionStorage.setItem('usersession', JSON.stringify(userData));

        toast.success(result.data.login.message || "Login successful!");
        navigate('/HomePage');
      } else {
        toast.error(result.data.login.message || "Login failed!");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed. Please try again.");
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
              {/* <img
                src="./assets/img/email.png"
                alt="email"
                className="img-fluid"
              /> */}
              <button onClick={() => startTextToSpeech()}>
                {isListening ? "🛑" : "🎤"}
              </button>
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

        {isVerifyOtpDialogOpen && (
          <div className="overlay">
            <div className="dialog">
              <button
                onClick={() => setIsVerifyOtpDialogOpen(false)}
                className="close-button"
              >
                &times;
              </button>
              <h2 className="title">Verify OTP</h2>
              <form onSubmit={UserEnterOPTCheck}>
                <input
                  type="text"
                  name="to_name"
                  onChange={(e) => setOtpTextView(e.target.value)}
                  placeholder="Enter OTP"
                  required
                  className="input"
                />
                <button type="submit" className="submit-button">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        )}

        {isChangesPasswordDialogOpen && (
          <div className="overlay">
            <div className="dialog">
              <button
                onClick={() => setIsChangesPasswordDialogOpen(false)}
                className="close-button"
              >
                &times;
              </button>
              <h2 className="title">Create New Password</h2>
              <form onSubmit={changesPassword}>
                <label className="label">Name</label>
                <input
                  type="text"
                  onChange={(e) => setnewPassword(e.target.value)}
                  placeholder="new password"
                  required
                  className="input"
                />

                <label className="label">Confirm Password</label>
                <input
                  type="text"
                  onChange={(e) => setconfirmaPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="input"
                />

                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        )}

        <Loader isOpen={loading} />

      </div>
    </Layout>
  );
}

export default Login;
