const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session.controller');

/* Authentication and Session Routes */
router.post('/', sessionController.auth);
router.delete('/', sessionController.logout);

module.exports = router;