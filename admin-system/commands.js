const db = require('../modules/db');
const projectFunctions = require('../utils/functions-utils');

// ------------------ Admin Commands: Level 20 ------------------ //
mp.events.addCommand("setadmin", async (player,fullText,playerid,adminLevel) => {

    var aLevel = await this.getAdminLevel(player.name);

    if(aLevel < 20) {
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }
    if(!playerid) {
        return projectFunctions.showErrorChat(player,'הינך צריך להכניס איידי של שחקן');
    }
    if(adminLevel < 0 | adminLevel > 20) {
        return projectFunctions.showErrorChat(player,'רמת האדמין צריכה להיות בין 0 ל 20');
    }
    if(!projectFunctions.isNumeric(playerid)) {
        return projectFunctions.showErrorChat(player,'הינך צריך להכניס איידי של השחקן');
    }
    if(player.name == mp.players.at(playerid).name) {
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו על עצמך');
    }
    if(!mp.players.exists(Number(playerid))) {
        return projectFunctions.showErrorChat(player,'האיידי שהזנת אינו מחובר לשרת');
    }
    setAdminLevel(mp.players.at(playerid).name, adminLevel);
    player.outputChatBox(`!{#ff0000}${adminLevel} אדמין ברמה ${mp.players.at(playerid).name} שמת את השחקן`);
    if (adminLevel == 0){
         mp.players.at(playerid).outputChatBox(`!{#ff0000}הוריד אותך מאדמין ${player.name} האדמין`);
        }
        else{
             mp.players.at(playerid).outputChatBox(`!{#ff0000}${adminLevel} שם אותך אדמין ברמה ${player.name} האדמין`);
        }

});
// ------------------ Admin Commands : Level 1 ------------------ // 
mp.events.addCommand('acmds', async (player) => {

    var aLevel = await this.getAdminLevel(player.name);
    if (aLevel < 1) {
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }
    player.outputChatBox('!{#FF7D3C}Admin Commands: ');
    player.outputChatBox('!{#FFFFFF}/setadmin,/getpos,/gotopos,/asay');
    player.outputChatBox('!{#FFFFFF}/vehicle,/vcall,/vcolor,/vmod');
    player.outputChatBox('!{#FFFFFF}/sethealth ,/setarmour ,/vcolor,/vmod');
});
mp.events.addCommand('asay', async ( player, fullText) => {
    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) {
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }
    if(!fullText){
        return player.outputChatBox("!{ff0000}ERROR: /asay [text]");
    }
    mp.players.broadcast(`!{#ff0000}Admin ${player.name}(${player.id}):${fullText}`);
});

mp.events.addCommand('gotopos', async (player, fullText, x, y, z) => {

    var aLevel = await this.getAdminLevel(player.name);
    if(aLevel < 1) {
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }

    player.position = new mp.Vector3(parseInt(x), parseInt(y), parseInt(z));
    player.outputChatBox(`!{#FF7D3C}(${x}${y}${z})!{#FFFFFF} :השתגרת למיקום`);

});

mp.events.addCommand('getpos', async (player) => {

    var aLevel = await this.getAdminLevel(player.name);
    if (aLevel < 1){
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }
    player.outputChatBox(`!{#FF7D3C}(${player.position})!{#FFFFFF} :המיקום שלך הוא`);
    console.log(player.position);
    console.log(player.heading);
});

mp.events.addCommand('sethp' , async(player,fullText,playerid,health) => {

    var aLevel = await this.getAdminLevel(player.name);
    if (aLevel < 1){
        return projectFunctions.showErrorChat(player,'אינך יכול להשתמש בפקודה זו');
    }
    if(!health || !playerid) {
        return projectFunctions.showErrorChat(player,'/sethp [1-100]');
    }
    if(!mp.players.exists(Number(playerid))) {
        return projectFunctions.showErrorChat(player,'האיידי שהזנת אינו מחובר לשרת');
    }
    player.health = Number(health);
    player.outputChatBox(`${health} ערך לך את החיים ל ${player.name} האדמין`);
    player.outputChatBox(`!{#ff0000}${health} את החיים ${mp.players.at(playerid).name} ערכת לשחקן`);
});

// ------------- Functions ------------- //
module.exports.getAdminLevel = async function getAdminLevel(username) {
    return new Promise(function (resolve) {
        try {
            db.query('SELECT `admin` FROM `accounts` WHERE `username`=?', [username], function (error, res, fields) {
                if (error) {
                    console.log(error);
                }
                if (!res[0]) {
                    resolve(-1);
                } else if (res[0].length != 0) {
                    resolve(res[0].admin);
                    //console.log(res[0].admin);
                }
                else
                {
                    console.log("no admin found");
                    resolve(-1);
                }
            });
        } catch (e) {
            console.log(e);
        }
    });
}

function setAdminLevel(player, level) {

    db.query('UPDATE `accounts` SET admin=? WHERE username=?', [level, player], function (error, result, fields) {
        if (error) {
            console.log(error)
        } else if (result) {
            console.log(`${player} admin level changed to ${level}`);
        }
    });
}