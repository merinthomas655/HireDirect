const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }, 
  bio: { type: String },
  location: { latitude: Number, longitude: Number, address: String },
  ratings: { type: Number, default: 0 },
  services: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Provider', ProviderSchema, 'Provider');
