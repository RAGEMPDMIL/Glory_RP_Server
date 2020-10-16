//-------------------- Admin Commands -------------------- //
mp.events.addCommand('acmds', (player) => {
    player.outputChatBox('!{#FF7D3C}Admin Commands: ');
    player.outputChatBox('!{#FFFFFF}/gotopos (X Y Z)');
});

mp.events.addCommand('gotopos', (player, _,x,y,z) => {
    player.position = new mp.Vector3(parseInt(x), parseInt(y),parseInt(z));
    player.outputChatBox(`!{#FF7D3C}(${x}${y}${z})!{#FFFFFF} :השתגרת למיקום`);

});