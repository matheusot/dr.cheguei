/* 
 * Return all appointments for a given HC
 * @param {string} HC
 * @return {rows} query result
*/
async function getAppointmentsByHC(hc){    
  const db = await require('../configs/db.config').getConnection();
  let [rows, fields] = await db.execute(
    'SELECT * FROM appointments WHERE hc = ?', 
    [hc]
  );
  return rows[0].appointment_count;
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
  getAppointmentsByHC,
  NewAppointment,
}