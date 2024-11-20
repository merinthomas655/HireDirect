import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_BOOKING_WITH_REVIEW, ADD_REVIEW } from '../graphql/queries';
import "../css/viewdetails.css";

const ViewDetails = ({ bookingId, onClose }) => {
    const { loading, error, data } = useQuery(GET_BOOKING_WITH_REVIEW, {
      variables: { bookingId },
    });
  
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [addReview, { loading: reviewLoading }] = useMutation(ADD_REVIEW, {
      onCompleted: () => {
        alert('Review submitted successfully!');
        setRating(0);
        setComment('');
      },
      onError: (err) => {
        alert(`Error submitting review: ${err.message}`);
      },
    });
  
    const handleReviewSubmit = () => {
      addReview({
        variables: {
          bookingId,
          rating: parseInt(rating),
          comment,
        },
      });
    };
  
    if (loading) return <div className="modal"><p>Loading booking details...</p></div>;
    if (error) return <div className="modal"><p>Error: {error.message}</p></div>;

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
        <div className="review-form">
            <label>
                Rating:
                <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                />
            </label>
            <label>
                Comment:
                <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                ></textarea>
            </label>
            <button
                onClick={handleReviewSubmit}
                className="submit-review-button"
            >
                Submit Review
            </button>
        </div>
    </div>
  );
};

export default ViewDetails;
