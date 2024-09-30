import React from 'react';

const ReviewsSection = ({ reviews }) => {
  const reviewCards = [];
  for (let i = 0; i < reviews.length; i++) {
    reviewCards.push(
      <div className="review-card" key={reviews[i].id}>
        <p>Rating: {reviews[i].rating} stars</p>
        <p>{reviews[i].comment}</p>
      </div>
    );
  }
  return (
    <div>
      {reviewCards.length > 0 ? reviewCards : <p>No reviews available.</p>}
    </div>
  );
};

export default ReviewsSection;
