const express = require('express');
const router = express.Router();

const checkinController = require('../controllers/checkin.controller');

/* Appointment Routes */
router.put('/', checkinController.checkinHC);

module.exports = router;