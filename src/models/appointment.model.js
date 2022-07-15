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
  let date_now = new Date();
  const timezone = (new Date()).getTimezoneOffset() * 60000;
  date_now = new Date(date_now.getTime() - timezone).toISOString().replace(/T/, ' ').replace(/\..+/, '');
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
      
      DATE(appointments.schedule) >= DATE(?) AND
      appointments.status = 1 AND
      appointments.hc = ?
      
    ORDER BY

      appointments.schedule
  `, 
    [date_now, hc]
  );
  return rows[0];
}


/* 
 * Return all appointments for a given Doctor and date
 * @param {string} doctor
 * @param {date} date
 * @return {rows} query result
*/
async function getAppointmentsByDoctor(doc, appointment_date){    
  const db = await require('../configs/db.config').getConnection();

  let query = ` SELECT
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
  `;

  if (doc || appointment_date) {
    query += ` WHERE `;
  }

  if (doc) {
    query += `appointments.doctor_id = ? `;
  }

  if (doc && appointment_date) {
    query += ` AND `;
  }

  if (appointment_date) {
    query += `CAST(appointments.schedule AS DATE) = CAST(? AS DATE) `;
  }

  query += `ORDER BY
    appointments.status ASC,
    appointments.schedule ASC
  `;

  const params = [];
  if (doc) {
    params.push(doc);
  }
  if (appointment_date) {
    params.push(appointment_date);
  }

  let [rows, fields] = await db.execute(query, params);
  return rows;
}


async function checkInAppointment(appointmentId) {
  const db = await require('../configs/db.config').getConnection();
  let date_now = new Date();
  const timezone = (new Date()).getTimezoneOffset() * 60000;
  date_now = new Date(date_now.getTime() - timezone).toISOString().replace(/T/, ' ').replace(/\..+/, '');
  let [rows, fields] = await db.execute(`UPDATE appointments SET status=2, last_update=? WHERE id=?`, 
    [date_now, appointmentId]
  );
  return rows;
}


async function newAppointment(sector_id, doctor_id, hc, status, schedule, last_update, creation_date){
  const db = await require('../configs/db.config').getConnection();
  const query = "INSERT INTO appointments (sector_id, doctor_id, hc, status, schedule) VALUES (?, ?, ?, ?, ?)";
  try {
    await db.execute(query, [sector_id, doctor_id, hc, status, schedule]);
    return false;
  } catch (e) {
    return e["sqlMessage"];
  }
}

/* TODO: not needed for now */
// async function News(doc_id=false){
//   const db = await require('../configs/db.config').getConnection();
//   const date_now = new Date();
//   const timezone = (new Date()).getTimezoneOffset() * 60000;
//   const date_begin = new Date(date_now.getTime() - 5*60000 - timezone).toISOString().replace(/T/, ' ').replace(/\..+/, ''); //ultimos 5 minutos
//   const date_end = new Date(date_now.getTime() + 1*60000 - timezone).toISOString().replace(/T/, ' ').replace(/\..+/, '');
//   let sql = `
//   SELECT 
//     appointments.id AS 'appointment_id',
//     appointments.hc AS 'appointment_HC',
//     appointments.status AS 'appointment_status',
//     appointment_statuses.name AS 'appointment_status_name',
//     appointments.schedule AS 'appointment_schedule',
//     appointments.last_update AS 'appointment_last_update',
//     appointments.creation_date AS 'appointment_creation_date',
  
//     users.doc AS 'doctor_doc',
//     users.name AS 'doctor_name',
//     users.type AS 'doctor_usertype',
//     user_types.name AS 'doctor_usertype_name',
  
//     appointments.sector_id AS 'doctor_sector',
//     sectors.name AS 'doctor_sector_name',
  
//     users.username AS 'doctor_username',
//     users.email AS 'doctor_email',
//     users.phone AS 'doctor_phone',
//     users.last_login AS 'doctor_last_login',
//     users.creation_date AS 'doctor_creation_date'
  
//   FROM appointments

//     INNER JOIN appointment_statuses ON appointments.status = appointment_statuses.id
//     INNER JOIN users ON appointments.doctor_id = users.id
//     INNER JOIN user_types ON users.type = user_types.id
//     INNER JOIN sectors ON appointments.sector_id = sectors.id

//   WHERE 
//   appointments.status = 2 AND 
//   `;
//   if (doc_id){
//     sql=sql+`users.id = `+doc_id+` AND `;
//   }
//   sql = sql +`appointments.last_update BETWEEN '`+date_begin+`' AND '`+date_end+`'`;
//   let [rows, fields] = await db.execute(sql);

//   return rows;
  
// }


module.exports = {
  getAllAppointments,
  getNextAppointmentsByHC,
  newAppointment,
  checkInAppointment,
  getAppointmentsByDoctor,
  /* TODO: edit or remove later
  News
  */
}