import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import "../css/servicestable.css";

function ServicesTable({ services }) {
  const [filteredServices, setFilteredServices] = useState(services);
  const { transcript, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p>Your browser does not support voice recognition.</p>;
  }

  const handlePriceFilter = () => {
    const searchQuery = transcript.toLowerCase().trim();
    const priceMatch = searchQuery.match(/\d+/);

    if (priceMatch) {
      const maxPrice = parseInt(priceMatch[0], 10);
      const results = services.filter((service) => service.pricing <= maxPrice);
      setFilteredServices(results);
    } else {
      alert("No valid price detected. Please try again.");
    }

    resetTranscript();
  };

  const handleReset = () => {
    setFilteredServices(services);
    resetTranscript();
  };

  return (
    <div className="user-services-section">
      <h2>Available Services</h2>
      <div className="services-controls">
        <button className="start-voice-button" onClick={() => SpeechRecognition.startListening({ continuous: true })}>
          🎤 Start Voice Input
        </button>
        <button className="stop-voice-button" onClick={SpeechRecognition.stopListening}>
          🛑 Stop Voice Input
        </button>
        <button className="filter-price-button" onClick={handlePriceFilter}>
          🔍 Filter by Price
        </button>
        <button className="reset-button" onClick={handleReset}>
          🔄 Reset
        </button>
      </div>
      <p className="transcript-feedback">
        {transcript && `You said: "${transcript}"`}
      </p>
      <div className="user-table-responsive">
        <table className="user-services-table">
          <thead>
            <tr>
              <th>Service Name</th>
              <th>Description</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.service_name}</td>
                  <td>{service.description}</td>
                  <td>${service.pricing}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="no-results">No services match your search.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServicesTable;
