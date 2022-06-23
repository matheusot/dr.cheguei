const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment.controller');
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

/* Appointment Routes */
router.post('/', checkJWT, appointmentController.addAppointment);
router.get('/', checkJWT, appointmentController.getAllAppointments);
router.get('/:hc', checkJWT, appointmentController.getNextAppointmentsByHC);

module.exports = router;