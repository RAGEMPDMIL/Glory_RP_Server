const db = require('../../modules/db');

mp.events.add('playerQuit', function (player, exitType, reason) {
    mp.events.call('server:auth:onPlayerLogout', player.name);
});

// Loads player data when login
mp.events.add('server:player:loadPlayerData', async (player) => {
    const playerData = await getPlayerData(player.name);
    player.wallet = Number(playerData[0]);
    player.bank = Number(playerData[1]);
    player.call('client:playerHud:getHudData', [playerData]);
    player.notify(`<C>~g~[Glory:DM]</C>~w~ Welcome Back ${player.name}`);
    player.isLogin = true;
});

mp.events.add("playerSpawn", playerSpawn => {

    if (player.isLogin) {
        player.call('client:player:playericon');
    }

});

function getPlayerData(username) {
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