const express = require('express');
const router = express.Router();
const tamponController = require('../controllers/tamponController');

// GET endpoint to show remaining quantities
router.get('/quantities', tamponController.getQuantities);

// POST endpoint to make tampons
router.post('/make-tampons', tamponController.makeTampons);

module.exports = router;
