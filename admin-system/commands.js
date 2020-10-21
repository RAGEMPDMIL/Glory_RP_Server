const db = require('../modules/db');

// ------------------ Admin Commands: Level 20 ------------------ //
mp.events.addCommand("setadmin", async (player,fullText,playerid,adminLevel) => {

    var aLevel = await this.getAdminLevel(player.name);

    if(aLevel < 20) return player.outputChatBox("!{#ff0000}you cannot use this command");
    if(!playerid) return player.outputChatBox("!{#ff0000}/setadmin [playerid] [level]");
    if(adminLevel < 0 | adminLevel > 20) return player.outputChatBox("!{#ff0000}level 0-20");
    if(!isNumeric(playerid)) return player.outputChatBox("!{#ff0000}playerid must be id");
    if(player.name == mp.players.at(playerid).name) return player.outputChatBox("!{#ff0000}you cannot use this command on yourself");
    if(!mp.players.exists(Number(playerid))) return player.outputChatBox(`id ${playerid} is not online`);
    setAdminLevel(mp.players.at(playerid).name, adminLevel);
    player.outputChatBox(`!{#ff0000}${adminLevel} אדמין ברמה ${mp.players.at(playerid).name} שמת את השחקן`);

    if(adminLevel == 0)  mp.players.at(playerid).outputChatBox(`!{#ff0000}הוריד אותך מאדמין ${player.name} האדמין`);
    else mp.players.at(playerid).outputChatBox(`!{#ff0000}${adminLevel} שם אותך אדמין ברמה ${player.name} האדמין`);

});
// ------------------ Admin Commands : Level 1 ------------------ // 
mp.events.addCommand('acmds', async (player) => {

    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");

    player.outputChatBox('!{#FF7D3C}Admin Commands: ');
    player.outputChatBox('!{#FFFFFF}/setadmin,/getpos,/gotopos,/asay');
    player.outputChatBox('!{#FFFFFF}/vehicle,/vcall,/vcolor,/vmod');
    player.outputChatBox('!{#FFFFFF}/sethealth ,/setarmour ,/vcolor,/vmod');
});
mp.events.addCommand('asay', async ( player, fullText) => {
    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");
    if(!fullText) return player.outputChatBox("!{ff0000}ERROR: /asay [text]");
    mp.players.broadcast(`!{#ff0000}Admin ${player.name}(${player.id}):${fullText}`);
});
mp.events.addCommand('gotopos',  async (player, fullText ,x,y,z) => {

    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");

    player.position = new mp.Vector3(parseInt(x), parseInt(y),parseInt(z));
    player.outputChatBox(`!{#FF7D3C}(${x}${y}${z})!{#FFFFFF} :השתגרת למיקום`);

});
mp.events.addCommand('getpos', async (player) => {

    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");

    player.outputChatBox(`!{#FF7D3C}(${player.position})!{#FFFFFF} :המיקום שלך הוא`);
    console.log(player.position);
});

mp.events.addCommand('sethealth', async(player,fullText,playerid,health) => {

    var aLevel = await this.getAdminLevel(player.name);

    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");
    if(!health) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /sethealth [id] [health]');
    if(!isNumeric(playerid)) return player.outputChatBox("!{#ff0000}playerid must be id");
    if(!mp.players.exists(Number(playerid))) return player.outputChatBox(`id ${playerid} is not online`);

    player.health = Number(health);
    player.outputChatBox(`!{#ff0000}(HP: ${health})!{#ffffff}שינית את החיים שלך`);
 });
 
 mp.events.addCommand('setarmour', async(player,fullText,playerid,armour) => {

    var aLevel = await this.getAdminLevel(player.name);

    if(aLevel < 1) return player.outputChatBox("!{#ff0000}you cannot use this command");
    if(!armour) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /setarmour [id] [armour]');
    if(!isNumeric(playerid)) return player.outputChatBox("!{#ff0000}playerid must be id");
    if(!mp.players.exists(Number(playerid))) return player.outputChatBox(`id ${playerid} is not online`);

    player.armour = Number(armour);
    player.outputChatBox(`!{#ff0000}(HP: ${armour})!{#ffffff}שינית את המגן שלך`);
 });
// ------------------ Functions ------------------ //
function isNumeric(str) {
    if (typeof str != "string") return false 
    return !isNaN(str) && 
           !isNaN(parseFloat(str))
}
module.exports.getAdminLevel = async function getAdminLevel(username){
    return new Promise(function (resolve) {
        try{
            db.query('SELECT `admin` FROM `accounts` WHERE `username`=?',[username],function(error,res,fields){
                if(error){console.log(error);}
                if(!res[0]){
                    resolve(-1);
                }
                else if(res[0].length!=0)
                {
                    resolve(res[0].admin);
                    //console.log(res[0].admin);
                }
                else
                {
                    console.log("no admin found");
                    resolve(-1);
                }
            });
        }catch(e){console.log(e);}
    });
    console.log("four");
}
function setAdminLevel(player,level){

    db.query('UPDATE `accounts` SET admin=? WHERE username=?',[level,player],function(error,result,fields){
        if(error) { console.log(error)}
        else if(result)
        {
            console.log(`${player} admin level changed to ${level}`);
        }
        }); 
}