import React from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";

function Login() {
  return (
    <Layout>
      <div className="login-signup-container">
        <h2 className="login-text">Login</h2>
        <div className="input-group-box">
          <input type="text" placeholder="User Name" required />
          <span className="icon">
            <img
              src="./assets/img/user.png"
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
            required
          />
          <span className="icon">
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

        <Link to="/signup" className="signup-text">
          Don't have an account? Sign Up
        </Link>
      </div>
    </Layout>
  );
}
export default Login;
