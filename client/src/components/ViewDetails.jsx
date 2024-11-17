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
        <h2 className="modal-header">Booking Details</h2>
        <div className="modal-body">
            <div className="details-section">
                <p><strong>Service:</strong> Plumbing Service</p>
                <p><strong>Date:</strong> November 5, 2024, 3:30 PM</p>
                <p><strong>Status:</strong> completed</p>
                <p><strong>Total Price:</strong> $150.50</p>
            </div>
        </div>
        <div className="review-section">
            <h3>Review</h3>
            <div className="review-display">
                <p><strong>Rating:</strong> 4/5</p>
                <p><strong>Comment:</strong> Great service! The provider was very professional.</p>
            </div>
        </div>



    </div>
  );
};

export default ViewDetails;
