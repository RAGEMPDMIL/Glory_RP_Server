const dealershipBlips = require('./dealership-blips.json');

Object.keys(dealershipBlips).forEach((blip) => {
    mp.blips.new(dealershipBlips[blip].sprite, new mp.Vector3(dealershipBlips[blip].position.x, dealershipBlips[blip].position.y, dealershipBlips[blip].position.z), {...dealershipBlips[blip].options});
});