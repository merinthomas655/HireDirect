import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/header.css";
import { useNavigate } from 'react-router-dom';


function Header() {
    const navigate = useNavigate(); // Initialize navigate

    const [showSidebar, setShowSidebar] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        const userSession = sessionStorage.getItem("usersession");
        if (userSession) {
            const user = JSON.parse(userSession);
            setIsLoggedIn(true);
            setUserRole(user.role);
        }   
    }, []);

    //When user logout then sesstion remove
    const handleLogout = () => {
        sessionStorage.removeItem('usersession');  // Clear ession
        setIsLoggedIn(false);  // Set login current status to false
        navigate('/login');  // Open login page 
    };

    const openLoginPage = () => {
        navigate('/login');  // Open login page 
    };

    return (
        <>
            <header>
                <div className="logo">
                    <img
                        className="img-fluid"
                        src="/assets/img/logo.png"
                        alt="logo.png"
                    />
                </div>
                <nav className="nav-links">
                    <Link to="/HomePage" onClick={() => setShowSidebar(false)}>
                        Home
                    </Link>
                    {isLoggedIn &&  (
                        <Link to="/services" onClick={() => setShowSidebar(false)}>
                        Services
                    </Link>
                    )}
                    <Link to="/contact" onClick={() => setShowSidebar(false)}>
                        Contact Us
                    </Link>
                    {/* Conditionally render dashboard link based on user role */}
                    {isLoggedIn && userRole === "user" && (
                        <Link to="/userdashboard" onClick={() => setShowSidebar(false)}>
                        User Dashboard
                        </Link>
                    )}
                    {isLoggedIn && userRole === "provider" && (
                        <Link to="/providerdashboard" onClick={() => setShowSidebar(false)}>
                        Provider Dashboard
                        </Link>
                    )}
                    {isLoggedIn && userRole === "admin" && (
                        <Link to="/admin-dashboard" onClick={() => setShowSidebar(false)}>
                        Admin Dashboard
                        </Link>
                    )}
                </nav>

                <div className="login">
                    {isLoggedIn ? (
                        <span onClick={handleLogout}>Log Out</span>
                    ) : (
                        <span onClick={openLoginPage}>Log In</span>

                    )}
                </div>

                <div className="hamburger" onClick={() => setShowSidebar(true)}>
                    &#9776;
                </div>
            </header>
            <div
                className={`mobile-menu ${showSidebar ? "show-overlay" : ""} `}
                id="mobileMenu">
                <div className={`sidebar-wrapper ${showSidebar ? "open" : ""}`}>
                    <div
                        className="close-icon"
                        onClick={() => setShowSidebar(false)}
                    >
                        &#10006;
                    </div>
                    <div className="sidebar-nav-link">
                        <Link to="/" onClick={() => setShowSidebar(false)}>
                            Home
                        </Link>
                        <Link
                            to="/services"
                            onClick={() => setShowSidebar(false)}
                        >
                            Services
                        </Link>
                        <Link
                            to="/contact"
                            onClick={() => setShowSidebar(false)}
                        >
                            Contact Us
                        </Link>
                        {/* Conditionally render dashboard link based on user role */}
                        {isLoggedIn && userRole === "user" && (
                        <Link to="/userdashboard" onClick={() => setShowSidebar(false)}>
                            User Dashboard
                        </Link>
                        )}
                        {isLoggedIn && userRole === "provider" && (
                        <Link to="/providerdashboard" onClick={() => setShowSidebar(false)}>
                            Provider Dashboard
                        </Link>
                        )}
                        {isLoggedIn && userRole === "admin" && (
                        <Link to="/admin-dashboard" onClick={() => setShowSidebar(false)}>
                            Admin Dashboard
                        </Link>
                        )}
                        
                    </div>
                    <div className="sidebar-login">
                        {isLoggedIn ? (
                        <span onClick={handleLogout}>Log Out</span>
                        ) : (
                        <Link to="/login" onClick={() => setShowSidebar(false)}>
                            Log In
                        </Link>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
