const db = require('../../Modules/db');
let spawnPoints = require('../../spawn_points.json').SpawnPoints;

//player death handler
function playerDeathHandler(player,reson,killer) {
    const deathName = player.name;
    //const killerName=killer.name;
    let deathcounter,killscounter;
   /* db.query("SELECT `kills` FROM `accounts` WHERE `username`=?",[killerName],function(error,result,fields){
        if(error){console.log(error);}
        if(result[0].kills===null)
        {
            killscounter=1;
            db.query("UPDATE `accounts` SET kills=? WHERE username=?",[killscounter,killerName],function(error,result,fields){
                if(error){console.log(error);}
            })
        }
        else
        {
            killscounter=result[0].kills+1;
            db.query("UPDATE `accounts` SET kills=? WHERE username=?",[killscounter,killerName],function(error,result,fields){
                if(error){console.log(error);}
            })
        }
    })*/
    db.query("SELECT  `death` FROM `accounts` WHERE `username`=?",[deathName],function(error,result,fields){
        if(error){console.log(error);}
        if(result[0].death===null)
        {
            deathcounter=1;
            db.query('UPDATE `accounts` SET death=? WHERE username=?',[deathcounter,deathName],function(error,result,fields){
                if(error){console.log(error);}
            })
        }
        else
        {
            deathcounter=result[0].death+1;
            db.query('UPDATE `accounts` SET death=? WHERE username=?',[deathcounter,deathName],function(error,result,fields){
                if(error){console.log(error);}
            })
        }

        
    })
    player.health = 100;
    player.armour = 70;
    player.model = mp.joaat('g_m_y_mexgang_01');
    player.spawn(spawnPoints[Math.floor(Math.random() * spawnPoints.length)]);
    
  }
  
  mp.events.add("playerDeath", playerDeathHandler);