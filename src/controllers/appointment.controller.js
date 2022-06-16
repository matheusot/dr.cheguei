const appointmentModel = require('../models/appointments.model');

/* 
 ** Insert a new appointment
 ** params: .json file 
 *          {'sector id' = int,
 *           'doctor id' = int,
 *           'hc' = int,
 *           'status' = int,
 *           'schedule' = date}
 ** return: status {404: error, 200: new appointment insert}
*/
async function appointment(req, res){    
    
    const sector_id = req.body.sector_id;
    const doctor_id = req.body.doctor_id;
    const hc = req.body.hc;
    const status = req.body.status;
    const schedule = req.body.schedule;
  
    const creation_date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    const last_update = creation_date;
    const error =  await appointmentModel.NewAppointment(sector_id, doctor_id, hc, status, schedule, last_update, creation_date)
    if (!error){
        res.status(200).json({"msg": "Appointment Scheduled"});
    }
    else{
        res.status(404).json({"msg": error});
    }
  }
  
  module.exports = {
    appointment
  };