const bcrypt = require('bcryptjs');

mp.events.add('server:login:userLogin', async (player ,username, password) => {
    console.log(username, password);
    let loggedAccount = mp.players.toArray().find(p => p.name === login);
    if(!loggedAccount) {
        try {
            const res = await attemptLogin(username, password);
            if(res){
                console.log(`${username} has successfully logged in`);
                if(player.idleKick) {
                    clearTimeout(player.idleKick);
                    player.idleKick = null;
                }
                mp.events.call('server:login:loadAccount', player, username); // TODO
                player.call('client:auth:loginHandler', ['success']);
            } else {
                player.call('client:auth:loginHandler', ['incorrectInfo']);
                resetTimeout(player);
            }
        } catch(e) { console.log(e) }
    } else {
        player.call('client:auth:loginHandler', ['logged']);
    }
});

function attemptLogin(username, password) {
    return new Promise(async function(reslove, reject) {
        try {
            console.log(username, password);
            await mp.db.query('SELECT `username`, `password` FROM `accounts` WHERE `username` = ?', [username]).then(([rows]) => {
                return rows;
            }).then(function(result) {
                if(result[0].length != 0) { //Account found
                    result[0][0].password === password ? reslove(true) : reslove(false);
                    // bcrypt.compare(password, result[0][0].password).then(function(res){
                    //     res ? reslove(true) : reslove(false);
                    // })
                } else {
                    reslove(false);
                }
            });
        } catch(e) { console.log(e) }
    });
}

function resetTimeout(user){
    if (user.idleKick) {
        clearTimeout(user.idleKick);
        user.idleKick = null;
    }
    timeoutKick(user);
}