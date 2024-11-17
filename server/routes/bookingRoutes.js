const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Import the Booking model

// Get all bookings for the provider
router.get('/', async (req, res) => {
  try {
    // Fetch bookings and populate service and slot details
    const bookings = await Booking.find()
      .populate('booking_services.service_id','service_name')
        .populate('booking_services.slot_id')
      .populate('user_id', 'name')
      .populate('provider_id', 'name'); 

    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

module.exports = router;
