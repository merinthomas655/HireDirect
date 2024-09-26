const express = require('express');
const router = express.Router();
const { newUserCreate, getUserDetails } = require('../controllers/singupController');

router.post('/singup', newUserCreate);

router.get('/:id', getUserDetails);

module.exports = router;