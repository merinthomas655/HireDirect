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

    const { booking, review } = data.getBookingWithReview;

    return (
      <div className="modal">
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>&times;</button>
          <h2 className="modal-title">Booking Details</h2>
          <div className="modal-body">
            <div className="booking-info">
              <p><strong>Service:</strong> {booking.booking_services[0]?.service_id?.service_name || 'N/A'}</p>
              <p><strong>Date:</strong> {new Date(parseInt(booking.created_at)).toLocaleString()}</p>
              <p><strong>Status:</strong> {booking.status}</p>
              <p><strong>Total Price:</strong> ${booking.total_price.toFixed(2)}</p>
            </div>
            {booking.status === 'completed' && (
              <div className="review-section">
                <h3>Review</h3>
                {review ? (
                  <div className="review-display">
                    <p><strong>Rating:</strong> {review.rating}/5</p>
                    <p><strong>Comment:</strong> {review.comment}</p>
                  </div>
                ) : (
                  <div className="review-form">
                    <label>
                      Rating:
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="review-input"
                      />
                    </label>
                    <label>
                      Comment:
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="review-textarea"
                      ></textarea>
                    </label>
                    <button
                      onClick={handleReviewSubmit}
                      disabled={reviewLoading}
                      className="submit-review-button"
                    >
                      {reviewLoading ? 'Submitting...' : 'Submit Review'}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  
export default ViewDetails;
