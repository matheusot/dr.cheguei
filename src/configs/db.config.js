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
      host: process.env.DB_HOST || '152.70.125.116',
      port: process.env.DB_PORT || '3306',
      user: process.env.DB_USER || 'drcheguei',
      password: process.env.DB_PASSWORD || 'WN?h%3ety$E89HME',
      database: process.env.DB_NAME || 'drcheguei',
    });
    return conn;
  }
};
