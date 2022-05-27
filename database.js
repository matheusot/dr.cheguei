const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '152.70.125.116',
  port: '3306',
  user: 'drcheguei',
  password: 'WN?h%3ety$E89HME',
  database: 'drcheguei',
});

connection.connect(function (err) {
    if (err) throw err;
    console.log('Connected to the DB!');
});

module.exports = connection