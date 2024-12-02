import React from 'react';
import '../css/loader.css'; 

const Loader = ({ isOpen }) => {
    if (!isOpen) return null; 

    return (
      <div className="loader-dialog-overlay">
        <div className="loader-dialog">
          <div className="animated-loader"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  };

export default Loader;
