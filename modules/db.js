const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'dmil',
    password : 'yuvalofek!',
    database : 'deathmatch',
});

connection.connect(function(e) {
    if(e) {
        console.log('Database didn\'t connect');
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = connection;