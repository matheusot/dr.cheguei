/* 
 * Return the number of appointments for a given HC
 * @param {string} HC
 * @return {rows} query result
*/
async function HCAppointmentCount(hc){    
  const db = await require('../configs/db.config').getConnection();
  let [rows, fields] = await db.execute(
    'SELECT COUNT(1) as appointment_count FROM appointments WHERE hc = ?', 
    [hc]
  );
  return rows[0].appointment_count;
}



/* 
 * Get user with username and password
 * @param {string} username
 * @param {string} password
 * @return {rows} query result
*/
async function loginWithUsernameAndPassword(username, password){
  const db = await require('../configs/db.config').getConnection();

  // Get user info
  let [rows, fields] = await db.execute(
    'SELECT id, type, doc, name, username, email, phone, last_login, creation_date FROM users WHERE username = ? AND password = MD5(?)', 
    [username, password]
  );
  if (rows.length == 0) {
    return null;
  }

  // Update last_login date
  await db.execute(
    'UPDATE users SET last_login = current_timestamp() WHERE id = ?', 
    [rows[0].id]
  );

  return rows[0];
}



module.exports = {
  HCAppointmentCount,
  loginWithUsernameAndPassword
}