//-------------------- Player Commands -------------------- //
mp.events.addCommand('cmds', (player) => {
    player.outputChatBox('!{#61FA68}Player Commands: ');
    player.outputChatBox('/sethealth, /setarmour, /setskin, /id');
    player.outputChatBox('/kill, /weapon, /vehicle');
});

mp.events.addCommand('id', (player) => {
   player.outputChatBox(`Name:${player.name} ID:${player.id}`);
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

