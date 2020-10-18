const db = require('../../modules/db');

let inBank = false;
const availableColshapes = [];
const moneySystemColshapes = {
    Bank: {
        x: 246.64202880859375,
        y: 221.6378631591797,
        z: 105.28675079345703,
        range: 2.0
    }
};

Object.keys(moneySystemColshapes).forEach((value) => {
    const colshape = mp.colshapes.newSphere(moneySystemColshapes[value].x, moneySystemColshapes[value].y, moneySystemColshapes[value].z, moneySystemColshapes[value].range);
    availableColshapes.push(colshape);
});

mp.events.add("playerEnterColshape", async (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.inBank = true;
        player.outputChatBox(`!{#74FF33}וברוך שובך לבנק !{#ffffff}${player.name}!{#74FF33} שלום`);
        player.notify('Press <font color="#00ff00">E</font> for bank actions');
        const playerMoneyInfo = await getMoneyInfo(player.name);
        console.log(playerMoneyInfo);
        player.call('client:moneySystem:moneyUIAvailable', [String(mp.world.time.hour), String(mp.world.time.minute), playerMoneyInfo[0], playerMoneyInfo[1]]);
    }
});

mp.events.add("playerExitColshape", (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.call('client:moneySystem:moneyUIUnavailable');
        player.inBank = false;
        player.outputChatBox(`!{#ffffff}${player.name}!{#74FF33} יצאת מתפריט הבנק, המשך משחק מהנה`);
    }
});

function getMoneyInfo(username) {
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