const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Changed from user to user_id
  bio: { type: String },
  ratings: { type: Number },
  location: {
    latitude: { type: Number },
    longitude: { type: Number },
    address: { type: String }, // This is your full address
  },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }], // Assuming you have a Service model
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Provider', ProviderSchema);
