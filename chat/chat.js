mp.events.add("playerChat", (player, text) =>
{
	mp.players.broadcast(`!{#3CFF33}(Global Chat) !{#ffffff}${player.name}: ${text}`);
});