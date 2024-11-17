// availableSlotRoutes.js
const express = require('express');
const router = express.Router();
const AvailableSlot = require('../models/AvailableSlot');

// Get available slots for a provider (or all)
router.get('/', async (req, res) => {
    try {
        const slots = await AvailableSlot.find(); // Modify this if you need to filter by provider
        res.json(slots);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching slots', error });
    }
});

module.exports = router;
