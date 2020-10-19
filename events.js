
// - - - - - Spawns - - - - - //
let spawnPoints = require('./spawn_points.json').SpawnPoints;

mp.events.add('playerSpawn', player => {

  player.notify(`~r~You have been spawned`);
  });
// - - - - - Death - - - - - //

/*mp.events.add("playerDeath", (player) => {
    player.health = 100;
    player.armour = 70;
    player.model = mp.joaat('g_m_y_mexgang_01');
    mp.game.graphics.startScreenEffect("DeathFailNeutralIn", 5000, false);
    //setTimeout(respawntime, 5000);
});*/
// - - - - - Join - - - - - //
// - - - - - Vehicles - - - - - //
// - - - - - SQL Events - - - - - //

function respawntime() {
  player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
}


//----------------------------------------------------------------//
