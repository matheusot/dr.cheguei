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


  
module.exports = {
  getAppointmentsByHC,
}