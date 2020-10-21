const db = require('../../modules/db');

const moneySystemColshapes = require('./colshapes-data.json');
const availableColshapes = [];

Object.keys(moneySystemColshapes).forEach((value) => {
    const colshape = mp.colshapes.newSphere(moneySystemColshapes[value].x, moneySystemColshapes[value].y, moneySystemColshapes[value].z, moneySystemColshapes[value].range);
    availableColshapes.push(colshape);
});

mp.events.add("playerEnterColshape", async (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.inBank = true;
        player.outputChatBox(`!{#74FF33}וברוך שובך לבנק !{#ffffff}${player.name}!{#74FF33} שלום`);
        player.notify('Press <font color="#00ff00">E</font> for bank actions');
        player.call('client:moneySystem:moneyUIAvailable');
    }
});

mp.events.add("playerExitColshape", (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.call('client:moneySystem:moneyUIUnavailable');
        player.inBank = false;
        player.outputChatBox(`!{#ffffff}${player.name}!{#74FF33} יצאת מתפריט הבנק, המשך משחק מהנה`);
    }
});