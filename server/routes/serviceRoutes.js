// routes/servicesRoutes.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Route to get all services
router.get('/', async (req, res) => {
    try {
        const services = await Service.find(); // Fetch all services from the database
        res.json(services); // Send services data as JSON response
    } catch (err) {
        res.status(500).json({ message: 'Error fetching services', error: err });
    }
});

module.exports = router;
