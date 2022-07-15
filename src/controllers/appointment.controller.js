const appointmentModel = require('../models/appointment.model');

/* 
 * Insert a new appointment
 * params: .json file 
 *          {'sector id' = int,
 *           'doctor id' = int,
 *           'hc' = int,
 *           'schedule' = date}
 * return: status {404: error, 200: new appointment insert}
*/
async function addAppointment(req, res) {
  const sector_id = 1 /* TODO: get from req.body */;
  const doctor_id = req.userInfo.id;
  const hc = req.body.hc;
  const status = 1; //aguardando a chegada do paciente
  const schedule = req.body.schedule;
  const error = await appointmentModel.newAppointment(sector_id, doctor_id, hc, status, schedule);
  if (error == false) {
    return res.status(200).json({"msg": "Appointment Scheduled"});
  } else {
    return res.status(401).json({"msg": error});
  }
}


/* 
 * Gets all appointments
 * return: appointments found in DB
*/
async function getAppointments(req, res) {
  if ("hc" in req.userInfo) {
    const row = await appointmentModel.getNextAppointmentsByHC(req.userInfo.hc);
    if (req.query.checkin == 'true' && row) {
      await appointmentModel.checkInAppointment(row.appointment_id);
    }
    return res.status(200).json(row)
  }
  if ("doc" in req.userInfo) {
    const id = "all" in req.query ? null : req.userInfo.id;
    const row = await appointmentModel.getAppointmentsByDoctor(id, req.query.date); // Date format {string} YYYY-MM-DD
    return res.status(200).json(row);
  }
}


/* 
 * Gets all appointments update to state 2 in the last 5 minutes
 * return: appointments found in DB
 * TODO: not needed for now
async function getNewAppointments(req, res) {
  let row;
  if("doc" in req.userInfo){
    row = await appointmentModel.News(doc_id=req.userInfo.id);
  }
  else{
    row = await appointmentModel.News();
  }
  
  return res.status(200).json(row)
}
*/
  
module.exports = {
  addAppointment,
  getAppointments,
  /* TODO: not needed for now
  getNewAppointments
  */
};