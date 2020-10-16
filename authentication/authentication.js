const bcrypt = require('bcryptjs');
const saltRounds = 10;
const connection = require('../modules/db');
const db = require('../modules/db');



// Handles user attempt to login
mp.events.add('server:login:userLogin', async (player, username, password) => {
    let loggedAccount = mp.players.toArray().find(p => p.name === username);
    if (!loggedAccount) {
        try {
            const res = await attemptLogin(username, password)
            if (res) {
                console.log(`${username} has successfully logged in`);
                mp.events.call('server:login:loadAccount', username); // TODO
                player.call('client:auth:loginHandler', ['success'],player);
                player.name = `${username}`;
            } else {
                player.call('client:auth:loginHandler', ['incorrectInfo']);
            }
        } catch (e) {
            console.log(e)
        }
    } else {
        player.call('client:auth:loginHandler', ['logged']);
    }
});


//Handles user attemo to register.
mp.events.add('server:register:userRegister', async (player, username, password, email) => {
    try {
        const res = attempRegistration(username, password, email);
        res.then((value) => {
            if (value === "new account successfully created") {
                console.log(`${username} account has successfully created`);
                player.call('client:auth:showLoginPage');
            } else {
                console.log("the mail or username is already used");
            }
        })

    } catch (e) {
        console.log(e)
    }
})


function attempRegistration(username, password, email) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT * FROM `accounts` WHERE `username`=? OR `email`=?', [username, email], function (error, result, fields) {
                if (result.length != 0) {
                    resolve("The account is already exist");

                } else {
                    bcrypt.hash(password, saltRounds, (err, hash) => {
                        db.query('INSERT INTO `accounts` SET username = ?, password = ?, email = ?', [username, hash, email], function (error, result, fields) {
                            if (error) console.log(error);
                            resolve("new account successfully created");
                            /*var mailOptions = {
                                from: 'RageMPDMIL@gmail.com',//TODO
                                to: `${email}`,
                                subject: 'Sending Email using Node.js',
                                text: 'That was easy!'
                              };
                              
                              transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });*/
                        });
                    });



                }


            })
        } catch (e) {
            console.log(e);
        }

    })
}

function attemptLogin(username, password) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?', [username], function (error, result, fields) {
                if (result[0].username.lenght != 0) {
                    bcrypt.compare(password, result[0].password, function(err, result) {
                        if(error) {console.log(error);}
                         result ? resolve(true) : resolve(false);
                    })
                } else {
                    resolve(false);
                }
            })
        } catch (e) {
            console.log(e);
        }
    })
}