import React, { useState, useEffect } from "react"; // Make sure to import useState and useEffect
import { Link } from "react-router-dom";
import '../css/footer.css'; 
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate(); // Initialize navigate

  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    const user = sessionStorage.getItem('usersession');
    if (user) {
        setIsLoggedIn(true);  // User is already logged in
    }
  }, []);

  return (
    <>
      <footer>
        <section className="footer-wrapper">
          <div className="social-wrapper">
            <Link to="https://www.youtube.com/">
              <img
                src="/assets/img/youtube.png"
                alt="youtube"
                className="img-fluid"
              />
            </Link>
            <Link to="https://x.com/?lang=en">
              <img
                src="/assets/img/twitter.png"
                alt="twitter"
                className="img-fluid"
              />
            </Link>
            <Link to="https://www.instagram.com/">
              <img
                src="/assets/img/instagram.png"
                alt="instagram"
                className="img-fluid"
              />
            </Link>
            <Link to="https://www.facebook.com/">
              <img
                src="/assets/img/facebook.png"
                alt="facebook"
                className="img-fluid"
              />
            </Link>
            <Link to="https://www.linkedin.com">
              <img
                src="/assets/img/linkedin.png"
                alt="linkedin"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="footer-logo">
            <img src="/assets/img/logo.png" alt="logo" className="img-fluid" />
          </div>
          <div className="footer-navigation">
            {isLoggedIn ? ( 
              <Link to="/HomePage">Home</Link>
            ) : (
              <div> </div> 
            )}
            <Link to="/contact">Contact Us</Link>
            <Link to="/services">Services</Link>
          </div>
          <p className="fall-text">© Fall 2024 HireDirect</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;
