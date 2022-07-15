const express = require('express');
const router = express.Router();

const appointmentController = require('../controllers/appointment.controller');
const checkJWT = require('../middlewares/jwt.middleware').checkJWT;

/* Appointment Routes */
router.post('/', checkJWT, appointmentController.addAppointment);
router.get('/', checkJWT, appointmentController.getAppointments);
router.delete('/:appointmentId', checkJWT, appointmentController.deleteAppointment);
router.put('/:appointmentId/status/:statusId', checkJWT, appointmentController.updateAppointmentStatus);
/* Check or remove later */
// router.get('/new', checkJWT, appointmentController.getNewAppointments);

module.exports = router;