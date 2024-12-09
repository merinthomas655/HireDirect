import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout.jsx";
import "../css/aboutus.css";

const AboutUs = () => {
  return (
    <Layout>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>About Us | HireDirect</title>
        <meta
          name="description"
          content="Discover the story of HireDirect. Learn about our mission, vision, values, and the incredible team that drives us forward."
        />
        <meta
          name="keywords"
          content="HireDirect, About Us, Professional Services, Trusted Professionals, Our Mission, Our Values, Our Team"
        />
        <meta name="author" content="HireDirect Inc." />
        <meta property="og:title" content="About Us | HireDirect" />
        <meta
          property="og:description"
          content="Discover the story of HireDirect. Learn about our mission, vision, values, and the incredible team that drives us forward."
        />
        <meta property="og:url" content="https://www.hiredirect.com/about-us" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="about-us-page">
        {/* Hero Section */}
        <section className="hero-section">
          <img
            src="../assets/img/about-hero.jpg"
            alt="HireDirect - Connecting Professionals"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h1>Our Story</h1>
            <p>
              Revolutionizing how people connect with trusted professionals for
              their needs. Discover the HireDirect journey.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
            <div className="content">
                <h2>Our Mission</h2>
                <p>
                At HireDirect, we are dedicated to transforming service hiring by bridging
                the gap between professionals and clients. Our goal is to provide a seamless,
                trusted, and technology-driven experience for everyone.
                </p>
                <p>
                We believe in empowering individuals and businesses to achieve their goals 
                by providing quick and reliable access to the right professionals. Whether 
                you're a homeowner looking for repair services or a business in need of skilled 
                contractors, our mission is to simplify the process and ensure the highest quality 
                of service.
                </p>
                <p>
                By leveraging cutting-edge technology, rigorous vetting processes, and a commitment
                to excellence, we aim to create a marketplace where trust and professionalism are
                paramount. Our mission extends beyond transactions – we’re building lasting 
                relationships between service providers and clients.
                </p>
                <p>
                With sustainability and inclusivity at the core of our operations, we are also 
                focused on giving back to the community by supporting local professionals and 
                fostering economic growth.
                </p>
            </div>
            <img
                src="../assets/img/mission.jpg"
                alt="Our Mission at HireDirect"
                className="image"
            />
        </section>


        {/* Vision Section */}
        <section className="vision-section">
          <div className="content">
            <h2>Our Vision</h2>
            <p>
              Empower every individual and business to achieve their goals by
              providing easy access to trusted professionals worldwide.
            </p>
          </div>
        </section>

        {/* Values Section */}
        <section className="values-section">
          <h2>Our Core Values</h2>
          <p>Our guiding principles that shape everything we do:</p>
          <div className="values-grid">
            <div className="value-card">
              <img
                src="../assets/img/innovation.jpg"
                alt="Innovation"
                className="value-image"
              />
              <h3>Innovation</h3>
              <p>
                Continuously improving and adapting to meet modern challenges.
              </p>
            </div>
            <div className="value-card">
              <img
                src="../assets/img/trust.png"
                alt="Trust"
                className="value-image"
              />
              <h3>Trust</h3>
              <p>Fostering trust through transparency and accountability.</p>
            </div>
            <div className="value-card">
              <img
                src="../assets/img/community.jpg"
                alt="Community"
                className="value-image"
              />
              <h3>Community</h3>
              <p>Building a supportive and empowering network.</p>
            </div>
            <div className="value-card">
              <img
                src="../assets/img/excellence.jpg"
                alt="Excellence"
                className="value-image"
              />
              <h3>Excellence</h3>
              <p>Setting the highest standards for service quality.</p>
            </div>
          </div>
        </section>

        {/* Journey Section */}
        <section className="journey-section">
          <h2>Our Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">2018</div>
              <div className="timeline-content">
                <p>
                  HireDirect was born with a bold vision to simplify service
                  hiring worldwide.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <p>
                  Expanded services across multiple cities and introduced
                  advanced matching algorithms.
                </p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2023</div>
              <div className="timeline-content">
                <p>
                  Reached over 10 million users globally and launched AI-driven
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <p>The people driving the innovation and excellence at HireDirect:</p>
          <div className="team-grid">
            <div className="team-member">
              <img
                src="../assets/img/user.png"
                alt="John Doe - Founder & CEO"
              />
              <h3>John Doe</h3>
              <p>Founder & CEO</p>
            </div>
            <div className="team-member">
              <img
                src="../assets/img/user.png"
                alt="Jane Smith - CTO"
              />
              <h3>Jane Smith</h3>
              <p>Chief Technology Officer</p>
            </div>
            <div className="team-member">
              <img
                src="../assets/img/user.png"
                alt="Emily Johnson - Head of Marketing"
              />
              <h3>Emily Johnson</h3>
              <p>Head of Marketing</p>
            </div>
            <div className="team-member">
              <img
                src="../assets/img/user.png"
                alt="Michael Lee - Lead Developer"
              />
              <h3>Michael Lee</h3>
              <p>Lead Developer</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default AboutUs;
