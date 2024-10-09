const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User
  provider: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true }, // Reference to Provider
  rating: { type: Number, required: true }, // Assuming rating is a number
  comment: { type: String },
  created_at: { type: Date, default: Date.now }, // Auto-set created date
});

// Define a pre-save hook to update the created_at field
reviewSchema.pre('save', function (next) {
  this.created_at = Date.now();
  next();
});

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
