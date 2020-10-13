const bcrypt = require('bcryptjs');
const db = require('../modules/db');

// Handles user attempt to login
mp.events.add('server:login:userLogin', async (player ,username, password) => {
    let loggedAccount = mp.players.toArray().find(p => p.name === username);
    if(!loggedAccount) {
        try {
            const res = attemptLogin(username, password);
            if(res){
                console.log(`${username} has successfully logged in`);
                mp.events.call('server:login:loadAccount', username); // TODO
                player.call('client:auth:loginHandler', ['success']);
            } else {
                player.call('client:auth:loginHandler', ['incorrectInfo']);
            }
        } catch(e) { console.log(e) }
    } else {
        player.call('client:auth:loginHandler', ['logged']);
    }
});

function attemptLogin(username, password) {
    return new Promise(function(resolve){
        try {
            db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?', [username], function(error, result, fields) {
                console.log(result[0], result[0][0], result[0][0].password);
                if(result[0].lenght != 0) {
                    password === result[0][0].password ? resolve(true) : resolve(false);
                } else {
                    resolve(false);
                }
            })
        } catch(e) { console.log(e); }
    })
}