const gunSystemColshapes = require('./colshapes-data.json');
const availableColshapes = [];

Object.keys(gunSystemColshapes).forEach((value) => {
    const colshape = mp.colshapes.newSphere(gunSystemColshapes[value].x, gunSystemColshapes[value].y, gunSystemColshapes[value].z, gunSystemColshapes[value].range);
    availableColshapes.push(colshape);
});

mp.events.add("playerEnterColshape", async (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.notify('Press <font color="#3399FF">E</font> for gun actions');
        player.call('client:gunSystem:gunUIAvailable',[player]);
    }
});

mp.events.add("playerExitColshape", (player, colshape) => {
    if (availableColshapes.includes(colshape)) {
        player.call('client:gunSystem:gunUIUnavailable');
        player.notify('you went out from the gun store');
    }
});