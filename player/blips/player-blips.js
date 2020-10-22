var blips = {};

const BlipIcon = 1;

const BlipColor = 4;

mp.events.add('server:playerBlips:addBlip', (player) => {
	blips[player.name] = mp.blips.new(BlipIcon, player.position);
	blips[player.name].name = player.name;
	blips[player.name].dimension = player.dimension;
	blips[player.name].colour = BlipColor;
});

mp.events.add('playerSpawn', (player) =>
{
    if(player.isLogin) {
        blips[player.name] = mp.blips.new(BlipIcon, player.position);
        blips[player.name].name = player.name;
        blips[player.name].dimension = player.dimension;
        blips[player.name].colour = BlipColor;
    }
});

mp.events.add('playerDeath', (player, reason, killer) => {
	if (blips[player.name] && player.isLogin) {
		blips[player.name].destroy();
	}
});

mp.events.add('playerQuit', (player, exitType, reason) => {
	if (blips[player.name] && player.isLogin) {
		blips[player.name].destroy();
	}
});

function UpdateBlipPositions()
{
	mp.players.forEach( (player, id) => {
		if (blips[player.name] && player.health > 0 && player.isLogin) {
			blips[player.name].position = player.position;
		}
	});
}

//Calls the update function every second
setInterval(function(){
	UpdateBlipPositions();
}, 1000);