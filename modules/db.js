const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : '159.89.109.12/',
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