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
  const sector_id = req.body.sector_id;
  const doctor_id = req.body.doctor_id;
  const hc = req.body.hc;
  const status = 1; //aguardando a chegada do paciente
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
*/
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
  
module.exports = {
  addAppointment,
  getAppointments,
  getNewAppointments
};