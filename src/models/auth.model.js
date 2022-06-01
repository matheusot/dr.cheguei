/* 
 * Return the number of appointments for a given HC
 * @param {string} HC
 * @return {rows} query result
*/
async function HCAppointmentCount(hc){    
  const db = await require('../configs/db.config').getConnection();
  let [rows, fields] = await db.execute(
    'SELECT COUNT(1) as appointment_count FROM appointments WHERE hc = ?', 
    [12345]
  );
  return rows[0].appointment_count;
}


module.exports = {
  HCAppointmentCount,
}