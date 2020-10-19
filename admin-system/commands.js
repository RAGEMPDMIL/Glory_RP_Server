const db = require('../modules/db');

// Admins Command
mp.events.addCommand("setadmin", async(player,fullText,playerid,level) => {

    var adminlevel = await GetAdminLevel(player);

    if(adminlevel < 20) return player.outputChatBox("!{#ff0000}you cannot use this command")
    if(!playerid) return player.outputChatBox("/setadmin [playerid] [level]");
    if(!isNumeric(playerid)) return player.outputChatBox("playerid must be id");


    SetAdminLevel(mp.players.at(playerid).name, level);
    player.outputChatBox(`${level} אדמין ברמה ${mp.players.at(playerid).name} שמת את השחקן`);

    mp.players.at(playerid).outputChatBox(`${level} שם אותך אדמין ברמה ${player.name} האדמין`);

});
function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
           !isNaN(parseFloat(str))
}
function GetAdminLevel(player){
    return new Promise(function (resolve) {
        try{
            db.query('SELECT `admin` FROM `accounts` WHERE `username`=?',[player.name],function(error,res,fields){
                if(res[0].length!=0)
                {
                    resolve(res[0].admin);
                    console.log(res[0].admin)
                }
                else
                {
                    resolve('no admin level found');
                }
            });
        }catch(e){console.log(e);}
    });
}
function SetAdminLevel(player,level){

    db.query('UPDATE `accounts` SET admin=? WHERE username=?',[level,player],function(error,result,fields){
        if(error) { console.log(error)}
        else if(result)
        {
            console.log(`${player} admin level changed to ${level}`);
        }
        }); 
}
