const db = require('../../modules/db');

mp.events.add('playerQuit', function (player, exitType, reason) {
    mp.events.call('server:auth:onPlayerLogout', player.name);
});

// Loads player data when login
mp.events.add('server:player:loadPlayerData', async (player ,username) => {
    const loggedPlayer = mp.players.toArray().find((p) => {
        return p.name === username;
    });

    console.log('in session', username);
    const playerData = await getPlayerData(username);
    loggedPlayer.wallet = Number(playerData[0]);
    loggedPlayer.bank = Number(playerData[1]);
    console.log('data session ' + playerData);
    console.log('session ' + loggedPlayer.bank);
    player.call('client:playerHud:getHudData', [playerData]);
    player.notify(`<C>~g~[Glory:DM]</C>~w~ Welcome Back ${username}`);
    loggedPlayer.isLogin = true;
});

// mp.events.add("playerSpawn", playerSpawn => {

//     if (player.isLogin) {
//         player.call('client:player:playericon');
//     }

// });

async function getPlayerData(username) {
    console.log('session ' + username);
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `money`, `bank` FROM `accounts` WHERE `username` = ?', [username], function (err, result, fields) {
                if (err) {
                    console.log(err);
                } else {
                    resolve([
                        result[0].money,
                        result[0].bank
                    ]);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
}