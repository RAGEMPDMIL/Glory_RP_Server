
const db = require('../../modules/db');
let spawnPoints = require('../../spawn_points.json').SpawnPoints;

//player death handler
function playerDeathHandler(player,reson,killer) {
    console.log('(in Server)');
    const deathName = player.name;
    let deathcounter;
    db.query("SELECT  `death` FROM `accounts` WHERE `username`=?",[deathName],function(error,result,fields){
        if(error){console.log(error);}
        console.log(result.length);
        console.log(result);
        if(result[0].death===null)
        {
            console.log("im nullll");
            console.log(deathName);
            deathcounter=1;
            db.query('UPDATE `accounts` SET death=? WHERE username=?',[deathcounter,deathName],function(error,result,fields){
                console.log(error);
                console.log(result.affectedRows);
                //console.log(`death added to ${deathname} youre death counter is now ${deathcounter}`);
            })
        }
        else
        {
            console.log("im not nullllllllllaskdjhasdjkh");
            deathcounter=result[0].death+1;
            db.query('UPDATE `accounts` SET death=? WHERE username=?',[deathcounter,deathName],function(error,result,fields){
                console.log(`death added to ${deathname} youre death counter is now ${deathcounter}`);
            })
        }

        
    })
    player.health = 100;
    player.armour = 70;
    player.model = mp.joaat('g_m_y_mexgang_01');
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
  }
  
  mp.events.add("playerDeath", playerDeathHandler);