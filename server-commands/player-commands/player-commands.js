//-------------------- Player Commands -------------------- //
mp.events.addCommand('cmds', (player) => {
    player.outputChatBox('!{#61FA68}Player Commands: ');
    player.outputChatBox('/sethealth, /setarmour, /setskin, /id');
    player.outputChatBox('/kill, /weapon, /vehicle');
});

mp.events.addCommand('id', (player) => {
   player.outputChatBox(`Name:${player.name} ID:${player.id}`);
});
mp.events.addCommand('sethealth', (player,health) => {
   if(!health) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /sethealth [1-1000]');
   player.health = health;
   player.outputChatBox(`!{#ff0000}(HP: ${health})!{#ffffff}שינית את החיים שלך`);
});

mp.events.addCommand('setarmour', (player,armour) => {
   if(!armour) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /setarmour [1-1000]');
   player.armour = armour;
   player.outputChatBox(`!{#ff0000}(HP: ${armour})!{#ffffff}שינית את המגן שלך`);
});

mp.events.addCommand('setskin', (player, skin) => {
   if(!skin) return player.outputChatBox('!{#ff0000}Error!{#ffffff} /setskin [model]');
   let model = player.model
   player.model = mp.joaat(skin);
   player.outputChatBox(`!{#ff0000}${model}!{#ffffff}: שינית את הסקין שלך`);

})
mp.events.addCommand('kill', (player) => {
   player.health = 0;
   player.outputChatBox(`!{#ff0000}: הרגת את עצמך`);
});

//-------------------- Vehicle & Weapons Commands -------------------- //

mp.events.addCommand('weapon', (player, fullText) => {
   player.call('client:gunSystem:openUi');
});

