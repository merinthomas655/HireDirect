const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  provider_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider', required: true },
  total_price: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  booking_services: [ 
    {
      service_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
      slot_id: { type: mongoose.Schema.Types.ObjectId, ref: 'AvailableSlot' },
      price: { type: Number, required: true }
    }
  ],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema,'Booking');
