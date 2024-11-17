import React from 'react';

const ViewDetails = ({ onClose }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <h2>Booking Details</h2>
        <p><strong>Service:</strong> Haircut</p>
        <p><strong>Date:</strong> 2024-11-15</p>
        <p><strong>Status:</strong> Completed</p>
        <p><strong>Total Price:</strong> $50.00</p>
      </div>
      {booking.status === 'completed' && (
        <div className="review-section">
            <h3>Review</h3>
            <p><strong>Rating:</strong> 5/5</p>
            <p><strong>Comment:</strong> Excellent service!</p>
        </div>
      )}

    </div>
  );
};

export default ViewDetails;
