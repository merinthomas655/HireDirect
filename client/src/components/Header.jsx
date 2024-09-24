import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../css/header.css'; 

function Header() {
  const [showSidebar, setShowSidebar] = useState(false);
  return (
    <>
      <header>
        <div className="logo">
          <img
            className="img-fluid"
            src="./assets/img/logo.png"
            alt="logo.png"
          />
        </div>
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/">Service</Link>
          <Link to="/">Contact Us</Link>
        </nav>
        <div className="login">Log In</div>
        <div className="hamburger" onClick={() => setShowSidebar(true)}>
          &#9776;
        </div>
      </header>
      <div
        className={`mobile-menu ${showSidebar ? "show-overlay" : ""} `}
        id="mobileMenu"
      >
        <div className={`sidebar-wrapper ${showSidebar ? "open" : ""}`}>
          <div className="close-icon" onClick={() => setShowSidebar(false)}>
            &#10006;
          </div>
          <div className="sidebar-nav-link">
            <Link to="/" onClick={() => setShowSidebar(false)}>
              Home
            </Link>
            <Link to="/" onClick={() => setShowSidebar(false)}>
              Service
            </Link>
            <Link to="/" onClick={() => setShowSidebar(false)}>
              Contact Us
            </Link>
          </div>
          <div className="sidebar-login" onClick={() => setShowSidebar(false)}>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
