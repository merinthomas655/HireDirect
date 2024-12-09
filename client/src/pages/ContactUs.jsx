import React from "react";
import Layout from "../components/Layout.jsx";
import "../css/contactus.css";

const ContactUs = () => {
  return (
    <Layout>
      <div className="contact-page">
        {/* Hero Section */}
        <section className="contact-hero">
          <div className="hero-content">
            <h1>Get in Touch</h1>
            <p>
              Need assistance? We're here to help. Reach out to us, and we'll ensure your concerns are addressed promptly.
            </p>
          </div>
        </section>

        {/* Contact Info Section */}
        <section className="contact-info">
          <h2>Contact Information</h2>
          <div className="info-cards">
            <div className="info-card">
              <h3>Email Us</h3>
              <p>Drop us an email for queries or support:</p>
              <p className="highlight">support@hiredirect.com</p>
              <p className="highlight">careers@hiredirect.com</p>
            </div>
            <div className="info-card">
              <h3>Call Us</h3>
              <p>Reach our support team via phone:</p>
              <p className="highlight">+1 800-555-1234</p>
              <p className="highlight">+1 800-555-5678</p>
            </div>
            <div className="info-card">
              <h3>Visit Us</h3>
              <p>Our office is located at:</p>
              <p className="highlight">123 Business Street, Vancouver, BC, Canada</p>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="contact-form-section">
          <h2>Send Us a Message</h2>
          <form className="contact-form">
            <div className="form-row">
              <input type="text" placeholder="First Name" className="form-input" />
              <input type="text" placeholder="Last Name" className="form-input" />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" className="form-input" />
              <input type="tel" placeholder="Phone Number" className="form-input" />
            </div>
            <textarea placeholder="Your Message" className="form-textarea"></textarea>
            <button type="submit" className="form-submit">Submit</button>
          </form>
        </section>

        {/* Map Section */}
        <section className="contact-map-section">
          <h2>Our Location</h2>
          <div className="map-container">
            <iframe
              title="HireDirect Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082615!2d144.96305791566108!3d-37.81410797975157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d5df1f47d0b%3A0xb1fa982356eb62e0!2sYour%20Company!5e0!3m2!1sen!2sus!4v1624002141093!5m2!1sen!2sus"
              className="map-iframe"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default ContactUs;
