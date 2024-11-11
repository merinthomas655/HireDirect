// server/routes/availableSlot.js
const express = require('express');
const router = express.Router();
const AvailableSlot = require('../models/AvailableSlot');

// Route to handle adding a new slot
router.post('/add-slot', async (req, res) => {
  try {
    const { provider_id, date, startTime, endTime } = req.body;

    // Combine date with start and end times
    const start_time = new Date(`${date}T${startTime}`);
    const end_time = new Date(`${date}T${endTime}`);

    const newSlot = new AvailableSlot({
      provider_id,  // This should come from the logged-in provider
      date,
      start_time,
      end_time
    });

    await newSlot.save();
    res.status(201).json({ message: 'Slot added successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error saving slot' });
  }
});

module.exports = router;
