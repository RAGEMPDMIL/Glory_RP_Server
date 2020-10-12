// Connection to the sql database.

var mysql = require('mysql');

var connection =  mysql.createConnection({
	host		: 	'127.0.0.1',
	user		: 	'dmil',
	password	: 	'yuvalofek!',
	database	:	'deathmatch'
});

connection.connect(function(e) {
	if (e)
	{
		console.log("DATABASE: connection failed");
		throw e;
	}
	else
	{
		console.log("DATABASE: connected to database");
	}
});