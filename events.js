// - - - - - Spawns - - - - - //
let spawnPoints = require('./spawn_points.json').SpawnPoints;

mp.events.add('playerSpawn', player => {

    player.outputChatBox(`!{#FB4E4E}You have been spawned, ${player.name}!`);
  });
// - - - - - Death - - - - - //

mp.events.add("playerDeath", (player) => {
    player.health = 100;
    player.armour = 70;
    let model = player.model
    player.model = mp.joaat('g_m_y_mexgang_01');
    mp.game.graphics.startScreenEffect("DeathFailNeutralIn", 5000, false);
    //setTimeout(respawntime, 5000);
});
// - - - - - Join - - - - - //
mp.events.add('playerJoin', (player) => {

    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    player.health = 100;
    player.armour = 70;

    player => {
		player.outputChatBox(`!{#FB4E4E}Welcome to Israel DeathMatch Server !, ${player.name}!`);
	}
});
// - - - - - Chat - - - - - //
mp.events.add("playerChat", (player, text) =>
{
	mp.players.broadcast(`!{#3CFF33}(Global Chat) !{#ffffff}${player.name}: ${text}`);
});
// - - - - - Vehicles - - - - - //
// - - - - - SQL Events - - - - - //

function respawntime() {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
}
