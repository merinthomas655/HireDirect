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

// Route to update a service by ID
router.put('/:id', async (req, res) => {
    const serviceId = req.params.id; // Get the service ID from the request params
    try {
        // Find the service by ID and update it with the request body
        const updatedService = await Service.findByIdAndUpdate(serviceId, req.body, { new: true });

        if (!updatedService) {
            return res.status(404).json({ message: 'Service not found' });
        }

        res.json(updatedService); // Send the updated service as a response
    } catch (err) {
        res.status(400).json({ message: 'Error updating service', error: err });
    }
});

module.exports = router;
