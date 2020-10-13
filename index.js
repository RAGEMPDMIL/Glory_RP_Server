mp.events.delayInitialization = true; //  Setting this to true won't allow players to connect until this is false again

// Load up gamemode assets
const mysql = require('mysql');
require('./authentication/authentication');

// Wait for everything to load, then allow connections once all is loaded
(async () => {
    await initializeDatabase();
    mp.events.delayInitialization = false; //  Players cannot join until this is false
})();

async function initializeDatabase() {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'deathmatch'
    });
    connection.connect(function(e) {
        if(e) {
            console.log('Database didn\'t connect');
        } else {
            mp.db = connection;
            console.log('Database connected successfully');
        }
    });
}