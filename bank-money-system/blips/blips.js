const bankBlips = require('./blips-data.json');

Object.keys(bankBlips).forEach((blip) => {
    mp.blips.new(bankBlips[blip].sprite, new mp.Vector3(bankBlips[blip].position.x, bankBlips[blip].position.y, bankBlips[blip].position.z), {...bankBlips[blip].options});
});