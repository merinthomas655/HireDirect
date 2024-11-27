import React, { useState, useEffect } from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 
  const [showPassword, setShowPassword] = useState(false);
  const { transcript,listening, resetTranscript } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  function startTextToSpeech() {
    if(isListening){
      setIsListening(false);
      SpeechRecognition.stopListening();
      setEmail(transcript);
    }else{
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
      toast.error('Please enter a valid email address.');
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

        toast.success(result.data.login.message || "Login successful!");

        setTimeout(() => {
          navigate('/HomePage');
        }, 2000);
      } else {
        toast.error(result.data.login.message || "Login failed!");
      }
    } catch (error) {
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
      </div>
    </Layout>
  );
}

export default Login;
