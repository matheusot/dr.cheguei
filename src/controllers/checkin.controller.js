const appointmentModel = require('../models/appointment.model');

/* 
 * Checkin appointments by hc
 * params: hc
*/
async function checkinHC(req, res) {
    const ap = await appointmentModel.getNextAppointmentsByHC(req.query.hc);
    if(ap){
        await appointmentModel.checkInAppointment(ap.appointment_id);
        return res.status(200).json({"msg": "Checkin done"});}
    else{
        return res.status(404).json({"msg": "Not found appointments for this hc"});
    }
}

module.exports = {
    checkinHC
  };