const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '127.0.0.1',
    user     : 'root',
    password : '',
    database : 'deathmatch'
});

connection.connect(function(e) {
    if(e) {
        console.log('Database didn\'t connect');
    } else {
        console.log('Database connected successfully');
    }
});

module.exports = connection;