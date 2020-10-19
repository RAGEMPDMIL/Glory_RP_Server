const db = require('../../modules/db');

mp.events.add('server:moneyBankSystem:getPlayerMoney', async (player) => {
    const playerMoney = await getMoneyInfo(player.name);
    player.call('client:moneyBankSystem:getPlayerMoney', playerMoney);
});

async function getMoneyInfo(username) {
    return new Promise(function (resolve){
        try {
            db.query('SELECT `bank`, `money` FROM `accounts` WHERE `username` = ?', [username], function(err, result, rows){
                if(err) {
                    console.log(err);
                }
                resolve([result[0].bank, result[0].money]);
            });
        } catch(e) {console.log(e);}
    });
}