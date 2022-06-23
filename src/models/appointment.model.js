/* 
 * Return all appointments for a given HC
 * @param {string} HC
 * @return {rows} query result
*/
async function getAllAppointments(){    
  const db = await require('../configs/db.config').getConnection();
  let [rows, fields] = await db.execute(`
    SELECT
      appointments.id AS 'appointment_id',
      appointments.hc AS 'appointment_HC',
      appointments.status AS 'appointment_status',
      appointment_statuses.name AS 'appointment_status_name',
      appointments.schedule AS 'appointment_schedule',
      appointments.last_update AS 'appointment_last_update',
      appointments.creation_date AS 'appointment_creation_date',
      
      users.doc AS 'doctor_doc',
      users.name AS 'doctor_name',
      users.type AS 'doctor_usertype',
      user_types.name AS 'doctor_usertype_name',
      
      appointments.sector_id AS 'doctor_sector',
      sectors.name AS 'doctor_sector_name',
      
      users.username AS 'doctor_username',
      users.email AS 'doctor_email',
      users.phone AS 'doctor_phone',
      users.last_login AS 'doctor_last_login',
      users.creation_date AS 'doctor_creation_date'
      
    FROM appointments

      INNER JOIN appointment_statuses ON appointments.status = appointment_statuses.id
      INNER JOIN users ON appointments.doctor_id = users.id
      INNER JOIN user_types ON users.type = user_types.id
      INNER JOIN sectors ON appointments.sector_id = sectors.id
  `);
  return rows;
}


async function getNextAppointmentsByHC(hc){    
  const db = await require('../configs/db.config').getConnection();
  let [rows, fields] = await db.execute(`
    SELECT
      appointments.id AS 'appointment_id',
      appointments.hc AS 'appointment_HC',
      appointments.status AS 'appointment_status',
      appointment_statuses.name AS 'appointment_status_name',
      appointments.schedule AS 'appointment_schedule',
      appointments.last_update AS 'appointment_last_update',
      appointments.creation_date AS 'appointment_creation_date',
      
      users.doc AS 'doctor_doc',
      users.name AS 'doctor_name',
      users.type AS 'doctor_usertype',
      user_types.name AS 'doctor_usertype_name',
      
      appointments.sector_id AS 'doctor_sector',
      sectors.name AS 'doctor_sector_name',
      
      users.username AS 'doctor_username',
      users.email AS 'doctor_email',
      users.phone AS 'doctor_phone',
      users.last_login AS 'doctor_last_login',
      users.creation_date AS 'doctor_creation_date'
      
    FROM appointments

      INNER JOIN appointment_statuses ON appointments.status = appointment_statuses.id
      INNER JOIN users ON appointments.doctor_id = users.id
      INNER JOIN user_types ON users.type = user_types.id
      INNER JOIN sectors ON appointments.sector_id = sectors.id
      
    WHERE 
      
      DATE(appointments.schedule) >= DATE(NOW()) AND
      appointments.status = 1 AND
      appointments.hc = 12345
      
    ORDER BY

      appointments.schedule
  `, 
    [hc]
  );
  return rows[0];
}


async function NewAppointment(sector_id, doctor_id, hc, status, schedule, last_update, creation_date){
  const db = await require('../configs/db.config').getConnection();
  const sql = "INSERT INTO appointments (sector_id, doctor_id, hc, status, schedule, last_update, creation_date) \
  VALUES ("+sector_id+", "+doctor_id+", "+hc+", "+ status+", '"+ schedule+"', '"+ last_update+"', '"+creation_date+"')";

  try{
    await db.execute(sql);
    return false;
  }
  catch (e) {
    return e["sqlMessage"];
  }
  
}


module.exports = {
  getAllAppointments,
  getNextAppointmentsByHC,
  NewAppointment,
}