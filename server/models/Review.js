const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' },
  service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
  rating: { type: Number, required: true },
  comment: { type: String },
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
