const mongoose = require('mongoose');

const AvailableSlotSchema = new mongoose.Schema({
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  date: { type: Date, required: true },
  start_time: { type: Date, required: true },
  end_time: { type: Date, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('AvailableSlot', AvailableSlotSchema,'AvailableSlot');
