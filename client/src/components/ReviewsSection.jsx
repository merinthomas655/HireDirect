import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../css/reviewssection.css";

const ReviewsSection = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p>No reviews available.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <div className="user-reviews-carousel">
      <Slider {...settings}>
        {reviews.map((review) => (
          <div className="user-review-card" key={review._id}>
            <div className="user-review-image">
              <img
                src={review.user?.profileImage || "../assets/img/user.png"}
                alt={review.user ? review.user.username : "Anonymous"}
              />
            </div>
            <div className="user-review-content">
              <div className="user-stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p className="user-review-comment">{review.comment}</p>
              <p className="user-review-author">
                Reviewed by: {review.user ? review.user.username : "Anonymous"}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ReviewsSection;
