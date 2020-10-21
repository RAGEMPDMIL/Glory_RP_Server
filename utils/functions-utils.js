const db = require('../modules/db');

module.exports.isNumeric = function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) &&
        !isNaN(parseFloat(str));
};

module.exports.showErrorChat = function showErrorChat(player,error) {
    return player.outputChatBox(`!{#FB4E4E}[Server-Error] ${error}`);
};

module.exports.showServerMessage = function showServerMessage(player, message) {
    return player.outputChatBox(`[Server-Message] ${message}`);
};

module.exports.isUserExists = async function isUserExists(username) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `username` FROM `accounts` WHERE `username` = ?', [username], (err, result, fields) => {
                console.log(result);
                if(err) {
                    console.log(err);
                    resolve(false);
                }

                if(result.length === 0) {
                    resolve(false);
                } else {
                    resolve(true);
                }

            });
        } catch (e) {
            console.log(e);
        }
    });
};
