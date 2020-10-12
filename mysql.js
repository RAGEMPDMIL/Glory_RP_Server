// Connection to the sql database.

var mysql = require('mysql');

var connection =  mysql.createConnection({
	host		:	"localhost",
	user		: 	"dmil",
	password	: 	"yuvalofek!",
	database	:	"deathmatch"
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