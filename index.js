const express = require('express');
const app = express();
const port = 3000;

const db = require('./database');

app.get('/', (req, res) => {
    let resp = 'Dr. Cheguei: '
    db.query('SELECT "MariaDB conectado" AS resp', function(err, rows, fields) {
        if (err) throw err;
        resp += rows[0].resp;
        res.send(resp)
    })
});

app.listen(process.env.PORT || port, 
    () => console.log(`App listening at http://localhost:${port}`)
);