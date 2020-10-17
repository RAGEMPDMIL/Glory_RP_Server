//-------------------- Admin Commands -------------------- //
mp.events.addCommand('acmds', (player) => {
    player.outputChatBox('!{#FF7D3C}Admin Commands: ');
    player.outputChatBox('!{#FFFFFF}/gotopos (X Y Z)');
});

mp.events.addCommand('gotopos', (player, fullText ,x,y,z) => {
    player.position = new mp.Vector3(parseInt(x), parseInt(y),parseInt(z));
    player.outputChatBox(`!{#FF7D3C}(${x}${y}${z})!{#FFFFFF} :השתגרת למיקום`);

});
mp.events.addCommand('getpos', (player) => {
    player.outputChatBox(`!{#FF7D3C}(${player.position})!{#FFFFFF} :המיקום שלך הוא`);
    console.log(player.position);
});