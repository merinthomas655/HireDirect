import React from "react";
import Layout from '../components/Layout.jsx';
import { Link } from "react-router-dom";
import '../css/loginsignup.css'; 

function Signup() {
  return (
    <Layout>
      <div className="login-signup-container">
        <h2 className="login-text">Sign Up</h2>
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

        <div className="input-group-box">
          <input type="text" placeholder="Email" required />
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

        <div className="input-group-box password-box">
          <input
            type="password"
            id="confimPassowrd"
            placeholder="Confirm Password"
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

        <div className="input-group-box select-box">
          <select name="" id="" placeholder="User">
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
        <Link to="/login" className="signup-text">
          Already have an account? Login
        </Link>
      </div>
    </Layout>
  );
}
export default Signup;
