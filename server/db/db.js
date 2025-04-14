const mysql = require('mysql2');

const db = mysql.createPool({
    host: 'localhost',
    database: 'hackathon',
    user: 'D2_89484_PRATHAMESH',
    password: 'manager',
    
})

module.exports = db;