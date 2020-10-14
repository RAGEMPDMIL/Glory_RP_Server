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



mp.events.add('client:register:SubmitRegistration', async(player,username,password,email)=>{
    console.log("server got it and start work");
    try{
        const res= attempRegistration(username,password,email);
        if(res==="new account successfully created"){
            console.log(`${username} has successfully created`);
            mp.events.call('client:auth:showLoginPage',['success']);
        }
        else{
            player.call('client:auth:showRegisterPage', ['username or email already exist']);
        }
       
    }catch{

    }
})


function attempRegistration(username,password,email){
    return new Promise(function(resolve){
        try{
            db.query('SELECT `username`,`password`,`email` FROM `accounts` WHERE `username`=? OR `email`=? ',[username,email],function(error,result,fields){
                if(result[0].lenght!=0){
                    resolve("The account is already exist");
                }
                else{
                    resolve("new account successfully created");
                    db.query('INSERT INTO `accounts` SET (`username`=?, `password`=?, `email`=?) VALUES' ([username],[password],[email]));
                }

            })
        }catch(e){console.log(e);}

    }
)}

function attemptLogin(username, password) {
    return new Promise(function(resolve){
        try {
            db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?', [username], function(error, result, fields) {
                if(result[0].lenght != 0) {
                    password === result[0][0].password ? resolve(true) : resolve(false);
                } else {
                    resolve(false);
                }
            })
        } catch(e) { console.log(e); }
    })
}