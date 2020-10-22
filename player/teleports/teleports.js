const teleports = require('./teleports-data.json');

mp.events.addCommand("tp", (player, fullText, location) => {
    if(teleports[location])
    {
        player.outputChatBox(`!{#3399ff}${location} השתגרת בהצלחה ל`);
        player.position = new mp.Vector3(teleports[location].x,teleports[location].y,teleports[location].z);
        if(teleports[location].ipl) player.call('client:player:loadInterior',[teleports[location].x,teleports[location].y,teleports[location].z,teleports[location].ipl]);
    }
    else{
        player.outputChatBox(`!{#ff0000}There is no location ${location} in the list`);
    }
  });