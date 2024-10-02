const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  service_name: { type: String, required: true },
  description: { type: String },
  pricing: { type: Number, required: true },
  category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Service', ServiceSchema,'Service');
