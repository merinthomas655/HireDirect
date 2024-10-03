import React from 'react';

const ReviewsSection = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }
  const reviewCards = [];
  
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    reviewCards.push(
      <div className="review-card" key={review._id}>
        <div className="review-image">
          <img
            src={review.user?.profileImage || '../assets/img/user.png'}
            alt={review.user ? review.user.username : 'Anonymous'}
          />
        </div>
        <div className="review-content">
          <div className="stars">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)} {/* Display star rating */}
          </div>
          <p>{review.comment}</p>
          <p className="review-author">
            Reviewed by: {review.user ? review.user.username : 'Anonymous'}
          </p>
        </div>
      </div>
    );
  }

  return <div className="reviews-container">{reviewCards}</div>;
};

export default ReviewsSection;
