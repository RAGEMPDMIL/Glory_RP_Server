/* jshint -W104 */
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const connection = require('../modules/db');
const db = require('../modules/db');



// Handles user attempt to login
mp.events.add('server:login:userLogin', async (player, username, password) => {
    let loggedAccount = await isOnline(username);
    if (loggedAccount === 'offline') {
        console.log('offline');
        try {
            const res = await attemptLogin(username, password);
            console.log(res);
            if (res === 'success') {
                console.log(`${username} has successfully logged in`);
                //mp.events.call('server:login:loadAccount', username); // TODO
                player.name = username;
                player.call('client:auth:loginHandler', ['success'], username);
            } else {
                console.log('info');
                player.call('client:auth:loginHandler', ['incorrectInfo'], username);
            }
        } catch (e) {
            console.log(e);
        }
    } else if (loggedAccount === 'logged') {
        player.call('client:auth:loginHandler', ['logged'], username);
    } else {
        player.call('client:auth:loginHandler', ['doesntExist'], username);
    }
});


// Handles user attempt to register.
mp.events.add('server:register:userRegister', async (player, username, password, email) => {
    try {
        const res = await attempRegistration(username, password, email);
        if (res === "success") {
            console.log(`${username} account has successfully created`);
            player.call('client:auth:registerHandler', ['success']);
        } else {
            player.call('client:auth:registerHandler', ['userExists']);
        }
    } catch (e) {
        console.log(e);
    }
});

function isOnline(username) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `online` FROM `accounts` WHERE `username` = ?', [username], function (error, result, fields) {
                if (!result.length) {
                    resolve('doesntExist');
                } else if (result[0].online === 1) {
                    resolve('logged');
                } else {
                    resolve('offline');
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function attemptLogin(username, password) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?', [username], function (error, result, fields) {
                if (result[0].username.length != 0) {
                    bcrypt.compare(password, result[0].password, function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        result ? resolve('success') : resolve('incorrectInfo');
                    });
                } else {
                    resolve('incorrectInfo');
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function attempRegistration(username, password, email) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT * FROM `accounts` WHERE `username`=? OR `email`=?', [username, email], function (error, result, fields) {
                if (result.length != 0) {
                    resolve("userExists");
                } else {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        db.query('INSERT INTO `accounts` SET username = ?, password = ?, email = ?', [username, hash, email], function (error, result, fields) {
                            if (error) console.log(error);
                            resolve("success");
                        });
                    });
                }
            });
        } catch (e) {
            console.log(e);
        }

    });
}