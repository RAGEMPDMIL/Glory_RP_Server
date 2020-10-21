const db = require('../../modules/db');

module.exports.depositMoney = async function depositMoney(player, cash) {
    return new Promise(function(resolve) {
        try {
            db.query('UPDATE `accounts` SET `money` = ?, `bank` = ? WHERE `username` = ?', [player.wallet - cash, player.bank + cash, player.name], (err, result, fields) => {
                if(err) {
                    console.log(e);
                    resolve(false);
                }
                resolve(true);
            });
        } catch(e) { console.log(e); }
    });
};

module.exports.withdrawMoney = async function withdrawMoney(player, cash) {
    return new Promise(function(resolve) {
        try {
            db.query('UPDATE `accounts` SET `money` = ?, `bank` = ? WHERE `username` = ?', [player.wallet + cash, player.bank - cash, player.name], (err, result, fields) => {
                if(err) {
                    console.log(e);
                    resolve(false);
                }
                resolve(true);
            });
        } catch(e) { console.log(e); }
    });
};