const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bio: { type: String },
  location: { latitude: Number, longitude: Number, address: String },
  ratings: { type: Number, default: 0 },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// Ensure you are checking if the model is already compiled
const Provider = mongoose.models.Provider || mongoose.model('Provider', ProviderSchema);
module.exports = Provider;
