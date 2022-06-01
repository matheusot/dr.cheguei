const mysql = require('mysql2/promise');
let conn = null;

module.exports = {
  /* 
  * Creates a DB connection if it not exists
  * @return {connection}
  */
  getConnection: async function () {
    if (conn) return conn;
    conn = await mysql.createConnection({
      host: '152.70.125.116',
      port: '3306',
      user: 'drcheguei',
      password: 'WN?h%3ety$E89HME',
      database: 'drcheguei',
    });
    return conn;
  }
};