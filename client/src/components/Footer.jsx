import React from "react";
import { Link } from "react-router-dom";
import '../css/footer.css'; 

function Footer() {
  return (
    <>
      <footer>
        <section className="footer-wrapper">
          <div className="social-wrapper">
            <Link to="/">
              <img
                src="./assets/img/youtube.png"
                alt="youtube"
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="./assets/img/twitter.png"
                alt="twitter"
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="./assets/img/instagram.png"
                alt="instagram"
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="./assets/img/facebook.png"
                alt="facebook"
                className="img-fluid"
              />
            </Link>
            <Link to="/">
              <img
                src="./assets/img/linkedin.png"
                alt="linkedin"
                className="img-fluid"
              />
            </Link>
          </div>
          <div className="footer-logo">
            <img src="./assets/img/logo.png" alt="logo" className="img-fluid" />
          </div>
          <div className="footer-navigation">
            <Link>Home</Link>
            <Link>Contact Us</Link>
            <Link>Services</Link>
          </div>
          <p className="fall-text">© Fall 2024 HireDirect</p>
        </section>
      </footer>
    </>
  );
}

export default Footer;
