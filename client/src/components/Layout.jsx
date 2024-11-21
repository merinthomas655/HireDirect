import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import "../css/layout.css";


function Layout({ children }) {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <>
      <Header toggleTheme={toggleTheme} currentTheme={theme} />
      <div className="main-container">
        {children}
      </div>
      <Footer />
    </>
  );
}

export default Layout;
