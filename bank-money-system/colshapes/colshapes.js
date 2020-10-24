const moneySystemColshapes = require('./colshapes-data.json');
const availableColshapes = [];

Object.keys(moneySystemColshapes).forEach((value) => {
    const colshape = mp.colshapes.newSphere(moneySystemColshapes[value].x, moneySystemColshapes[value].y, moneySystemColshapes[value].z, moneySystemColshapes[value].range);
    availableColshapes.push(colshape);
});

mp.events.add("playerEnterColshape", async (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.inBank = true;
        player.call('client:moneySystem:moneyUIAvailable');
        player.notify('Press <font color="#00ff00">E</font> to interace with your bank account');
    }
});

mp.events.add("playerExitColshape", (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.call('client:moneySystem:moneyUIUnavailable');
        player.inBank = false;
    }
});